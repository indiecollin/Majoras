import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import MenuContext from '../MenuContext.jsx';
import BombersNotebook from './BombersNotebook.jsx';
import GridCellHeartContainer from './HeartContainer.jsx';
import GridCellOcarinaSongs from './OcarinaSongs.jsx';
import AddHoverEffect from '../helpers/AddHoverEffect.jsx';
import Modal from '../Modal.jsx';
import { questItems as items } from '../data/questItemsData.jsx';
import { frame, darkFrame, questHover } from '../styles/colors.js';
import { mod } from '../helpers/index.js';

const QuestStatusContainer = styled.div`    
    display: flex;
    flex-direction: column;    
    position: relative;
    background-color: ${frame};
    width: 100%;
    padding: 0;

    @media (720px < width <= 1600px) {
        padding: 0 40px 40px;                
    }

    @media only screen and (max-width: 720px) {            
        width: 125%;
        left: -12.5%;        
    }

    h1{
        position: absolute;
        left: 50%;
        transform: translateX(-50%) scaleX(-1);
        text-transform: uppercase;        
        font-size: 50px;
        width: max-content;
    }

    button{
        background-color: unset;
        border: none;
    }
`;

const QuestStatusGrid = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 3fr 3fr 3fr 3fr;
    grid-template-rows: 1fr 1fr;
`;

const QuestItemWrapper = styled.button`
    position: relative;
    height: min-content;
    cursor: ${props => props.disabled || props.disablelite ? 'unset' : 'pointer'};
    pointer-events: ${props => props.disablelite ? 'none' : 'unset'};
    ${props => !props.remains && 
        `&:before{
            display: flex;
            position: absolute;
            content: '';
            z-index: 1000;
            width: 100%;
            height: 100%;        
            border: 5px inset ${darkFrame};
            background-color: ${darkFrame};      
        }`
    }
`;

const QuestItem = styled.img`
    position: relative;
    top: 0;
    left: 0;    
`;

const BossRemains = styled.img`
    position: relative;
    top: 0;
    left: 0;    
    animation: ${props => props.boss} 2.5s infinite alternate;    
`;

const GridCellNotebook = styled.div`    
    position: relative;
    grid-column: 1/2;
    grid-row: 1/4;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 54px auto 0;

    @media only screen and (max-width: 1600px) {
        grid-row: 1/2;
        justify-content: left;
        margin-left: 7.5%;
        position: relative;        
        img{
            width: 120px;
        }
    }

    @media only screen and (max-width: 720px) {            
        margin-left: 2.5%;
    }

`;

const GridCellBossMasks = styled.div`    
    grid-column: 3/5;
    grid-row: 1/5;
    display: flex;
    flex-direction: column;
    margin: auto 0;

    @media only screen and (max-width: 1600px) {
        position: relative;        
        grid-row: 1/2;
        top: 10%;

        div img{
            width: 100px;
            height: 100px;
        }  
    }    

    div{
        display: flex;
        justify-content: space-around;
    }

    button > div{
        border-radius: 50%;
        background-color: ${darkFrame};
        box-shadow: 2px 2px 4px 8px rgba(0,0,0,0.2),-2px -2px 4px 8px rgba(0,0,0,0.2);
    }

    img{ // likely to keep this synced with mask/item dimensions
        width: 120px;
        height: 120px;        
    }
`;

const GridCellEquipment = styled.div`    
    grid-column: 3/5;
    grid-row: 4/9;
    display: flex;
    flex-wrap: wrap;    
    margin: auto 0;
    min-height: 400px;

    @media only screen and (max-width: 1600px) {
        position: relative;                
        min-height: 240px;
        grid-row: 2/3;
    }

    @media only screen and (max-width: 720px) {
        top: 10%;
    }
`;

const EquipmentSlot = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    display: flex;
    justify-content: center;

    img{ // likely to keep this synced with mask/item dimensions
        margin: 0 auto;
        width: 120px;
        height: 120px;
        @media only screen and (max-width: 1600px) {
            width: 100px;
            height: 100px;
        }
    }
`;

const QuestStatus = (props) => {
    const { curMenu, description, setDescription } = useContext(MenuContext);
    const {hearts, setHearts, setHealth} = props;
    const [notebookOpened, setNotebookOpened] = useState(false);
    const [questItemWidth, setQuestItemWidth] = useState(120);
    const [bomberNotebookWidth, setBomberNotebookWidth] = useState(160);
    const isActive = mod(curMenu, 4) === 2;
    useEffect(()=>{
        if(window.outerWidth<1600){
            setQuestItemWidth(100);
            setBomberNotebookWidth(120);
        }
    }, []);
    return <QuestStatusContainer>
        <h1 className='wendy-one-regular'>quest status</h1>
        <QuestStatusGrid>
            <GridCellNotebook>
                <QuestItemWrapper onClick = {() => {setNotebookOpened(true)}} disablelite={description} disabled={!isActive}>
                    <AddHoverEffect dims={28} border={4.6} color={questHover}>
                        <QuestItem src={items.bombersNotebook.img} name={items.bombersNotebook.name} parentWidth={bomberNotebookWidth} instructions={items.bombersNotebook.instructions} disabled={!isActive || !!description}/>
                    </AddHoverEffect>
                </QuestItemWrapper>
            </GridCellNotebook>
            <GridCellHeartContainer hearts={hearts} setHealth={setHealth} setHearts={setHearts}/>
            <GridCellOcarinaSongs/>
            <GridCellBossMasks>
                <div><QuestItemWrapper onClick = {() => setDescription(items.odalwa)} remains={true} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <BossRemains src={items.odalwa.img} name={items.odalwa.name} selected={description?.name == items.odalwa.name} parentWidth={questItemWidth} boss={items.odalwa.short} disabled={!isActive || !!description}/>
                        </AddHoverEffect>
                </QuestItemWrapper></div>
                <div>
                    <QuestItemWrapper onClick = {() => setDescription(items.gyorg)} remains={true} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <BossRemains src={items.gyorg.img} name={items.gyorg.name} selected={description?.name == items.gyorg.name} parentWidth={questItemWidth} boss={items.gyorg.short} disabled={!isActive || !!description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                    <QuestItemWrapper onClick = {() => setDescription(items.goht)} remains={true} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <BossRemains src={items.goht.img} name={items.goht.name} selected={description?.name == items.goht.name} parentWidth={questItemWidth} boss={items.goht.short} disabled={!isActive || !!description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                </div>
                <div><QuestItemWrapper onClick = {() => setDescription(items.twinmold)} remains={true} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <BossRemains src={items.twinmold.img} name={items.twinmold.name} selected={description?.name == items.twinmold.name} parentWidth={questItemWidth} boss={items.twinmold.short} disabled={!isActive || !!description}/>
                        </AddHoverEffect>
                </QuestItemWrapper></div>                                
            </GridCellBossMasks>            
            <GridCellEquipment>
                <EquipmentSlot>
                    <QuestItemWrapper onClick = {() => setDescription(items.sword)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <QuestItem src = {items.sword.img} name={items.sword.name} selected={description?.name == items.sword.name} parentWidth={questItemWidth} disabled={!isActive || !!description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                </EquipmentSlot>
                <EquipmentSlot>
                    <QuestItemWrapper onClick = {() => setDescription(items.shield)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <QuestItem src = {items.shield.img} name={items.shield.name} selected={description?.name == items.shield.name} parentWidth={questItemWidth} disabled={!isActive || !!description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                </EquipmentSlot>
                <EquipmentSlot>
                    <QuestItemWrapper onClick = {() => setDescription(items.quiver)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <QuestItem src = {items.quiver.img} name={items.quiver.alternate} selected={description?.name == items.quiver.name} parentWidth={questItemWidth} disabled={!isActive || !!description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                </EquipmentSlot>
                <EquipmentSlot>
                    <QuestItemWrapper onClick = {() => setDescription(items.bombBag)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <QuestItem src = {items.bombBag.img} name={items.bombBag.alternate} selected={description?.name == items.bombBag.name} parentWidth={questItemWidth} disabled={!isActive || !!description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                </EquipmentSlot>
            </GridCellEquipment>
        </QuestStatusGrid>
        { notebookOpened && <Modal>
            <BombersNotebook setNotebookOpened={setNotebookOpened}/>
      </Modal>}
    </QuestStatusContainer>
}


export default QuestStatus;