import React, { useEffect, useContext, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import AddHoverEffect from '../helpers/AddHoverEffect.jsx';
import MenuContext from '../MenuContext.jsx';
import { items } from '../data/itemsData.jsx';
import { mod } from '../helpers/index.js';
import { frame, itemHover } from '../styles/colors.js';

const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    
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
        z-index: 200;
    }
`;

const ItemWrapper = styled.button`
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

const Items = (props) => {
    const itemsRefs = items.reduce((acc, cur)=>{
        cur.forEach(item => {
            let refTag = item.name;
            if(refTag && item.bottle) refTag += item.bottle;
            acc[refTag] = useRef(null);
        })
        return acc;
    },{});
    const { curMenu, description, setDescription } = useContext(MenuContext);   
    const { isEquipped, setBowRef, setFireArrowRef, setIceArrowRef, setLightArrowRef } = props;        
    const parentWidth = 156;
    const isActive = mod(curMenu, 4) === 0;
    const AddHoverEffectWithRef = forwardRef(AddHoverEffect);

    useEffect(()=>{
        setBowRef(itemsRefs["Hero's Bow"]);
        setFireArrowRef(itemsRefs["Fire Arrow"]);
        setIceArrowRef(itemsRefs["Ice Arrow"]);
        setLightArrowRef(itemsRefs["Light Arrow"]);
    },[]);

    return <ItemsContainer>
        <h1>select item</h1>
        <ItemGridWrapper>
            <Frame/>
            <ItemGrid>{
                items.map((row,i) => {
                    return <ItemRow key={`item-row-${i}`}>{
                        row.map(item => {
                            item.equip = true;                                                                                     
                            return <ItemWrapper key={item.name + (item.bottle ?? '')} className ={isEquipped(item.name, item.bottle) ? 'equipped' : ''} onClick={() => setDescription(item)} disabled={!isActive || !item.name} disablelite={description}>
                                <AddHoverEffectWithRef ref={itemsRefs[item.name + (item.bottle ?? '')]} color={itemHover}>
                                    <Item src={item.img} name={item.name} parentWidth={parentWidth} bottle={item.bottle} disabled={!isActive || !item.name || description} equip/>
                                </AddHoverEffectWithRef>                                
                            </ItemWrapper>
                        })
                    }
                    </ItemRow>
                })}
            </ItemGrid>
            <Frame/>         
        </ItemGridWrapper>
        <Base/>
    </ItemsContainer>
};

export default Items;