import React, { useState, useEffect, useContext, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import AddHoverEffect from '../helpers/AddHoverEffect.jsx';
import MenuContext from '../MenuContext.jsx';
import { items } from '../data/itemsData.jsx';
import { mod } from '../helpers/index.js';
import { frame, itemHover } from '../styles/colors.js';

const ItemsContainer = styled.div`
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

const ItemGridWrapper = styled.div`
    height: 100%;
`;

const ItemGrid = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: space-evenly;
`;

const ItemRow = styled.div`
    display: flex;
    justify-content: space-between;              
    padding: 8px;      
    img{
        width: 148px;
        @media only screen and (max-width: 1600px) {
            width: 88px;
        } 
    }
`;

const ItemWrapper = styled.button`
    position: relative;
    background-color: unset;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: ${props => props.disabled || props.disablelite ? 'unset' : 'pointer'};
    pointer-events: ${props => props.disablelite ? 'none' : 'unset'};
    z-index: 1000;

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


const Item = styled.img`
    position: relative;
    top: 0;
    left: 0;
    ${props => props?.name?.includes('Arrow') ? 'opacity: 0.9;' : ''}    
`;

const Frame = styled.div`
    background-color: ${frame};
    position: relative;
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

const BowBar = styled.div`
    position: absolute;
    left: 19.5%;   
    top: 8.5%;
    height: 8%;
    width: 60%;
    background-color: ${frame};
    opacity: 0.5;
    z-index: -1;
    @media only screen and (max-width: 1600px) {
        left: 20%;
        height: 7%;
        top: 10.5%;       
    }
    
`;

const QuestBar = styled.div`
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

const BottleBar = styled.div`
    position: absolute;
    left: 2.5%;
    bottom: 8.5%;
    height: 8%;
    width: 95%;
    background-color: ${frame};
    opacity: 0.5; 
    z-index: -1;
    @media only screen and (max-width: 1600px) {
        bottom: 10.5%;
        height: 7%;
    }
`;

const Items = (props) => {
    const itemsRefs = items.reduce((acc, cur)=>{
        cur.forEach(item => {
            let refTag = item.name;
            if(refTag && item.bottle) refTag += item.bottle;
            acc[refTag] = useRef(null);
        })
        return acc;
    },{});
    const [isMobile, setIsMobile] = useState(false);
    const { curMenu, description, setDescription } = useContext(MenuContext);   
    const { isEquipped, setBowRef, setFireArrowRef, setIceArrowRef, setLightArrowRef } = props;        
    const fullWidth = 156;
    const mobileWidth = 88;
    const isActive = mod(curMenu, 4) === 0;
    const AddHoverEffectWithRef = forwardRef(AddHoverEffect);

    useEffect(()=>{
        setBowRef(itemsRefs["Hero's Bow"]);
        setFireArrowRef(itemsRefs["Fire Arrow"]);
        setIceArrowRef(itemsRefs["Ice Arrow"]);
        setLightArrowRef(itemsRefs["Light Arrow"]);
        if(window.outerWidth<1600){
            setIsMobile(true);
        }
    },[]);

    return <ItemsContainer>
        <h1 className='wendy-one-regular'>select item</h1>
        <ItemGridWrapper>
            <Frame/>
            <ItemGrid>{
                items.map((row,i) => {
                    return <ItemRow key={`item-row-${i}`}>{
                        row.map(item => {
                            item.equip = true;                                                                              
                            const selected = description?.name === item.name && description?.bottle === item.bottle;
                            return <ItemWrapper key={item.name + (item.bottle ?? '')} className ={isEquipped(item.name, item.bottle) ? 'equipped' : ''} onClick={() => setDescription(item)} disabled={!isActive || !item.name} disablelite={description}>
                                <AddHoverEffectWithRef ref={itemsRefs[item.name + (item.bottle ?? '')]} color={itemHover}>
                                    <Item src={item.img} name={item.name} parentWidth={isMobile ? mobileWidth: fullWidth } bottle={item.bottle} selected={selected} disabled={!isActive || !item.name || description} equip/>
                                </AddHoverEffectWithRef>                             
                            </ItemWrapper>
                        })
                    }
                    </ItemRow>
                })}
                <BowBar/>
                <QuestBar/>
                <BottleBar/>
            </ItemGrid>
            <Frame/>         
        </ItemGridWrapper>
        <Base/>
    </ItemsContainer>
};

export default Items;