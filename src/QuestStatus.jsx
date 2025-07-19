import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';
import BombersNotebook from './BombersNotebook.jsx';
import GridCellHeartContainer from './QuestStatus/HeartContainer.jsx';
import GridCellOcarinaSongs from './QuestStatus/OcarinaSongs.jsx';
import AddHoverEffect from './helpers/AddHoverEffect.jsx';
import Modal from './Modal.jsx';
import { questItems as items } from './data/questItemsData.jsx';
import { frame, darkFrame, questHover } from './styles/colors.js';
import { mod } from './helpers/index.js';

const QuestStatusContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;    
    background-color: ${frame};
    h1{
        margin: 0 auto;
        text-transform: uppercase;        
        font-size: 50px;
    }
    button{
        background-color: unset;
        border: none;
    }

    &:before{
        position: absolute;
        z-index: 0;
        content: '';
        inset: 0;
        filter: url(#grainy);        
    }
`;

const QuestStatusGrid = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 3fr 3fr 3fr 3fr;
    /* grid-template-columns: repeat(4, 3fr) */
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;;
    /* grid-template-rows: repeat(8, 1fr); */

    /* img{ // likely to keep this synced with mask/item dimensions
        width: 120px;
        height: 120px;
    } */
`;

const QuestItemWrapper = styled.button`
    position: relative;
    height: min-content;
    cursor: ${props => props.disabled || props.disablelite ? 'unset' : 'pointer'};
    pointer-events: ${props => props.disablelite ? 'none' : 'unset'};
`;

const QuestItem = styled.img`
    top: 0;
    left: 0;
    border: 5px inset ${darkFrame};    
`;

const BossRemains = styled(QuestItem)`
    position: relative;
    animation: ${props => props.boss} 2.5s infinite alternate;
    border: none;    
`;


const GridCellNotebook = styled.div`    
    position: relative;
    grid-column: 1/2;
    grid-row: 1/4;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GridCellBossMasks = styled.div`    
    grid-column: 3/5;
    grid-row: 1/5;
    display: flex;
    flex-direction: column;
    div{
        display: flex;
        justify-content: space-around;
    }
    button > div{
        border-radius: 50%;
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
    padding-top:40px;
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
    }
`;

const questItemWidth = 120;
const bomberNotebookWidth = 160;

const QuestStatus = (props) => {
    const { curMenu, description, setDescription } = useContext(MenuContext);
    const {hearts, setHearts, setHealth} = props;
    const [notebookOpened, setNotebookOpened] = useState(false);
    const isActive = mod(curMenu, 4) === 2;
    return <QuestStatusContainer>
        <h1>quest status</h1>
        <QuestStatusGrid>
            <GridCellNotebook>
                <QuestItemWrapper onClick = {() => {setNotebookOpened(true)}} disablelite={description} disabled={!isActive}>
                    <AddHoverEffect dims={'28px'} color={questHover}>
                        <QuestItem src={items.bombersNotebook.img} name={items.bombersNotebook.name} parentWidth={bomberNotebookWidth} instructions={items.bombersNotebook.instructions} disabled={!isActive || description}/>
                    </AddHoverEffect>
                </QuestItemWrapper>
            </GridCellNotebook>
            <GridCellHeartContainer hearts={hearts} setHealth={setHealth} setHearts={setHearts}/>
            <GridCellOcarinaSongs/>
            <GridCellBossMasks>
                <div><QuestItemWrapper onClick = {() => setDescription(items.odalwa)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <BossRemains src={items.odalwa.img} name={items.odalwa.name} parentWidth={questItemWidth} boss={items.odalwa.short} disabled={!isActive || description}/>
                        </AddHoverEffect>
                </QuestItemWrapper></div>
                <div>
                    <QuestItemWrapper onClick = {() => setDescription(items.gyorg)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <BossRemains src={items.gyorg.img} name={items.gyorg.name} parentWidth={questItemWidth} boss={items.gyorg.short} disabled={!isActive || description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                    <QuestItemWrapper onClick = {() => setDescription(items.goht)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <BossRemains src={items.goht.img} name={items.goht.name} parentWidth={questItemWidth} boss={items.goht.short} disabled={!isActive || description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                </div>
                <div><QuestItemWrapper onClick = {() => setDescription(items.twinmold)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <BossRemains src={items.twinmold.img} name={items.twinmold.name} parentWidth={questItemWidth} boss={items.twinmold.short} disabled={!isActive || description}/>
                        </AddHoverEffect>
                </QuestItemWrapper></div>                                
            </GridCellBossMasks>            
            <GridCellEquipment>
                <EquipmentSlot>
                    <QuestItemWrapper onClick = {() => setDescription(items.sword)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <QuestItem src = {items.sword.img} name={items.sword.name} parentWidth={questItemWidth} disabled={!isActive || description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                </EquipmentSlot>
                <EquipmentSlot>
                    <QuestItemWrapper onClick = {() => setDescription(items.shield)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <QuestItem src = {items.shield.img} name={items.shield.name} parentWidth={questItemWidth} disabled={!isActive || description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                </EquipmentSlot>
                <EquipmentSlot>
                    <QuestItemWrapper onClick = {() => setDescription(items.quiver)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <QuestItem src = {items.quiver.img} name={items.quiver.alternate} parentWidth={questItemWidth} disabled={!isActive || description}/>
                        </AddHoverEffect>
                    </QuestItemWrapper>
                </EquipmentSlot>
                <EquipmentSlot>
                    <QuestItemWrapper onClick = {() => setDescription(items.bombBag)} disablelite={description} disabled={!isActive}>
                        <AddHoverEffect>
                            <QuestItem src = {items.bombBag.img} name={items.bombBag.alternate} parentWidth={questItemWidth} disabled={!isActive || description}/>
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