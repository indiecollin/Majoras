import React, { useContext, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import AddHoverEffect from './helpers/AddHoverEffect.jsx';
import MenuContext from './MenuContext.jsx';
import { masks } from './data/masksData.jsx';
import { mod } from './helpers/index.js';
import { frame, itemHover } from './styles/colors.js';

const MasksContainer = styled.div`    
    display: flex;
    flex-direction: column;    

    h1{
        display: flex;
        justify-content: center;        
        text-transform: uppercase;        
        font-size: 50px;
        background-color: ${frame};
        &:before{
            position: absolute;
            z-index: -1;
            content: '';
            inset: 0;
            filter: url(#grainy);        
        }      
    }

    &>div{        
        display: flex;
    }    
`;

const MaskGrid = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`;

const MaskRow = styled.div`
    display: flex;
    justify-content: space-between;              
      padding: 8px;

    img{
        width: 148px;
        z-index: 200;
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

    &:before{
        position: absolute;
        z-index: 0;
        content: '';
        inset: 0;
        filter: url(#grainy);        
    }
`;

const Base = styled.div`
    background-color: ${frame};    
    height: 36px; 
    z-index: -1;

    &:before{
        position: absolute;
        z-index: 0;
        content: '';
        inset: 0;
        filter: url(#grainy);        
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
    const {isEquipped} = props;
    const { curMenu, description, setDescription } = useContext(MenuContext);  
    const parentWidth = 156;
    const isActive = mod(curMenu, 4) === 1;
    const AddHoverEffectWithRef = forwardRef(AddHoverEffect);
    return <MasksContainer>
        <h1>masks</h1>
        <div>
            <Frame/>
            <MaskGrid>{
                masks.map((row,i) => {
                    return <MaskRow key={`mask-row-${i}`}>{
                        row.map(mask => {
                            mask.equip = true;
                            return <MaskWrapper key = {mask.name} className ={isEquipped(mask.name) ? 'equipped' : ''} onClick = {() => setDescription(mask)} disablelite={description} disabled={!isActive || !mask.name}>                                
                                <AddHoverEffectWithRef ref={masksRefs.current[mask.name]} color={itemHover}>
                                    <Mask src = {mask.img} name={mask.name} parentWidth={parentWidth} disabled={!isActive || !mask.name || description} equip/>
                                </AddHoverEffectWithRef>
                            </MaskWrapper>
                        })
                    }
                    </MaskRow>
                })}               
            </MaskGrid>
            <Frame/>          
        </div>
        <Base/>
    </MasksContainer>
}

export default Masks;