import React, { useState, useEffect, useContext, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import AddHoverEffect from '../helpers/AddHoverEffect.jsx';
import MenuContext from '../MenuContext.jsx';
import { masks } from '../data/masksData.jsx';
import { mod } from '../helpers/index.js';
import { frame, itemHover } from '../styles/colors.js';

const MasksContainer = styled.div`    
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0;

    @media only screen and (max-width: 720px) {            
        width: 125%;
        left: -12.5%;
    }

    h1{
        display: flex;
        justify-content: center;        
        text-transform: uppercase;        
        font-size: 50px;
        background-color: ${frame};
        transform: scaleX(-1);
    }

    &>div{        
        display: flex;
    }    
`;


const MaskGridWrapper = styled.div`
    height: 100%;
`;

const MaskGrid = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: space-evenly;
`;

const MaskRow = styled.div`
    display: flex;
    justify-content: space-between;              
      padding: 8px;

    img{
        width: 148px;
        z-index: 200;
        @media only screen and (max-width: 1600px) {
            width: 88px;
        } 
    }
`;

const MaskWrapper = styled.button`
    position: relative;
    background-color: unset;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: ${props => props.disabled || props.disablelite ? 'unset' : 'pointer'};
    pointer-events: ${props => props.disablelite ? 'none' : 'unset'};

    &.equipped{
        border: 1px solid black;
        &:before{
            position: absolute;
            display: block;
            content: '';
            border: 7px solid black;
            border-radius: 5px;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
         }

        &:after{
            position: absolute;
            display: block;
            content: '';
            border: 6px solid white;
            border-radius: 5px;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
        }
    } 
`;

const Mask = styled.img`
    position: relative;
    top: 0;
    left: 0;
`;

const Frame = styled.div`
    position: relative;
    background-color: ${frame};
    width: 72px;

    @media only screen and (max-width: 960px) {            
        width: 36px;
    }
`;

const Base = styled.div`
    background-color: ${frame};    
    height: 36px;
    z-index: -1;
`;

const TransfromBar = styled.div`
    position: absolute;
    right: 4%;
    top: 8.5%;
    height: 64%;
    width: 4%;
    min-width: 32px;
    background-color: ${frame};
    opacity: 0.5;    
    z-index: -1;
    @media only screen and (max-width: 1600px) {
        right: 2.5%;
        width: 3%;
    }
    @media only screen and (max-width: 1200px) {
        right: 4%;
    }
    @media only screen and (max-width: 720px) {
        right: 6%;
    }
`;

const FierceBar = styled.div`
    position: absolute;
    right: 4%;
    bottom: 8.5%;
    width: 4%;
    height: 8%;
    min-width: 32px;
    background-color: ${frame};
    opacity: 0.5;   
    z-index: -1;
    @media only screen and (max-width: 1600px) {
        right: 2.5%;
        bottom: 10.5%;
        width: 3%;
        height: 7%;
    }
    @media only screen and (max-width: 1200px) {
        right: 4%;
    }
    @media only screen and (max-width: 720px) {
        right: 6%;
    }
`;

const Masks = (props) => {
    const masksRefs = useRef({});
    masksRefs.current = masks.reduce((acc, cur)=>{
        cur.forEach(mask => {
            acc[mask.name] = useRef(null);
        })
        return acc;
    },{});
    const [isMobile, setIsMobile] = useState(false);
    const {isEquipped} = props;
    const { curMenu, description, setDescription } = useContext(MenuContext);  
    const fullWidth = 156;
    const mobileWidth = 88;
    const isActive = mod(curMenu, 4) === 1;
    const AddHoverEffectWithRef = forwardRef(AddHoverEffect);

    useEffect(()=>{
        if(window.outerWidth<1600){
            setIsMobile(true);
        }
    },[])

    return <MasksContainer>
        <h1 className='wendy-one-regular'>masks</h1>
        <MaskGridWrapper>
            <Frame/>
            <MaskGrid>{
                masks.map((row,i) => {
                    return <MaskRow key={`mask-row-${i}`}>{
                        row.map(mask => {
                            mask.equip = true;
                            const selected = description?.name === mask.name;
                            return <MaskWrapper key = {mask.name} className ={isEquipped(mask.name) ? 'equipped' : ''} onClick = {() => setDescription(mask)} disabled={!isActive || !mask.name} disablelite={!!description}>                                
                                <AddHoverEffectWithRef ref={masksRefs.current[mask.name]} color={itemHover}>
                                    <Mask src = {mask.img} name={mask.name} parentWidth={isMobile ? mobileWidth : fullWidth} selected={selected} disabled={!isActive || !mask.name || !!description} equip/>
                                </AddHoverEffectWithRef>
                            </MaskWrapper>
                        })
                    }
                    </MaskRow>
                })}    
                <TransfromBar/>
                <FierceBar/>           
            </MaskGrid>
            <Frame/>          
        </MaskGridWrapper>
        <Base/>
    </MasksContainer>
}

export default Masks;