import React, {useContext} from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';
// import BombersNoteBook from './';
import GridCellHeartContainer from './QuestStatus/HeartContainer.jsx';
import GridCellOcarinaSongs from './QuestStatus/OcarinaSongs.jsx';
import AddHoverEffect from './helpers/AddHoverEffect.jsx';
import Strong from './helpers/StrongText.jsx';
import NoteBook from '../public/QuestStatus/bombers-notebook.png';
import Odalwa from '../public/QuestStatus/odalwa.png';
import Goht from '../public/QuestStatus/goht.png';
import Gyorg from '../public/QuestStatus/gyorg.png';
import Twinmold from '../public/QuestStatus/twinmold.png';
import GildedSword from '../public/QuestStatus/gilded-sword.png';
import MirrorShield from '../public/QuestStatus/mirror-shield.png';
import Quiver from '../public/QuestStatus/quiver.png';
import BombBag from '../public/QuestStatus/bomb-bag.png';

const items = {
    odalwa: {
        img: Odalwa, 
        name: "Odalwa's Remains",
        prompts: [
            <>The remains of the boss in Woodfall Temple.</>
        ]  
    },
    goht: {
        img: Goht, 
        name: "Goht's Remains",
        prompts: [
            <>The remains of the boss in Snowhead Temple.</>
        ]  
    },
    gyorg: {
        img: Gyorg, 
        name: "Gyorg's Remains",
        prompts: [
            <>The remains of the boss in Great Bay Temple.</>
        ]  
    },
    twinmold: {
        img: Twinmold, 
        name: "Twinmold's Remains",
        prompts: [
            <>The remains of the boss in Stone Tower Temple.</>
        ]  
    },
    sword: {
        img: GildedSword, 
        name: 'Gilded Sword',
        prompts: [
            <>Forged from gold dust and the Razor Sword, it's <Strong>unbreakable</Strong>.</>
        ]  
    },
    shield: {
        img: MirrorShield, 
        name: 'Mirror Shield',
        prompts: [
            <>Used like the <Strong>Hero's Shield</Strong>, it can reflect certain rays of <Strong>light</Strong>.</>
        ]  
    },
    quiver: {
        img: Quiver, 
        name: 'Biggest Quiver',
        alternate: 'Quiver (Holds 50)',
        prompts: [
            <>This can hold up to a maximum of <Strong>50 arrows</Strong>.</>
        ]  
    },
    bombBag: {
        img: BombBag, 
        name: 'Biggest Bomb Bag',
        alternate: 'Bomb Bag (Holds 40)',
        prompts: [
            <>This can hold up to a maximum of <Strong>40 Bombs</Strong>.</>
        ]  
    }
};

const QuestStatusContainer = styled.div`
    background-color: wheat;
    display: flex;
    flex-direction: column;    
    h1{
        margin: 0 auto;
        text-transform: uppercase;
        padding: 16px 20px;
        font-size: 50px;
    }
    button{
        background-color: unset;
        border: none;
    }
    
    /* &>div{        
        padding: 0 120px 60px;

        &>div{
            background-color: #0B0B0F;
            display: flex;
            flex-direction: column;
            position: relative;
        }
    }     */
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
`;

const QuestItem = styled.img`
    top: 0;
    left: 0;
`;

const GridCellNoteBook = styled.div`
    background-color: pink;
    position: relative;
    grid-column: 1/2;
    grid-row: 1/4;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GridCellBossMasks = styled.div`
    background-color: #ffff008d;
    grid-column: 3/5;
    grid-row: 1/5;
    display: flex;
    flex-direction: column;
    div{
        display: flex;
        justify-content: space-around;
    }
    img{ // likely to keep this synced with mask/item dimensions
        width: 120px;
        height: 120px;
    }
`;

const GridCellEquipment = styled.div`
    background-color: #0000ff8d;
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

const QuestStatus = () => {
    const { setInfoBar, setDescription } = useContext(MenuContext);
    // const QuestItemWithHover = AddHoverEffect(QuestItem, 120, setInfoBar);
    // see if we can remake this so that we can just pass the parent width as a prop to the jsx, also fix hardcoded dimensions
    // const BombersNotebookWithHover = AddHoverEffect(QuestItem, 160, setInfoBar);
    return <QuestStatusContainer>
        <h1>quest status</h1>
        <QuestStatusGrid>
            {/* <GridCellNoteBook>
                <QuestItemWrapper><BombersNotebookWithHover src={NoteBook} name = {"Bomber's Notebook"}/></QuestItemWrapper>
            </GridCellNoteBook>
            <GridCellHeartContainer/>
            <GridCellOcarinaSongs/>
            <GridCellBossMasks>
                <div>
                    <QuestItemWrapper onClick = {() => setDescription(items.odalwa)}><QuestItemWithHover src={Odalwa} name={"Odalwa's Remains"}/></QuestItemWrapper>
                </div>
                <div>
                    <QuestItemWrapper onClick = {() => setDescription(items.gyorg)}><QuestItemWithHover src={Gyorg} name={"Gyorg's Remains"}/></QuestItemWrapper>
                    <QuestItemWrapper onClick = {() => setDescription(items.goht)}><QuestItemWithHover src={Goht} name={"Goht's Remains"}/></QuestItemWrapper>
                </div>
                <div>
                    <QuestItemWrapper onClick = {() => setDescription(items.twinmold)}><QuestItemWithHover src={Twinmold} name={"Twinmold's Remains"}/></QuestItemWrapper>
                </div>                                
            </GridCellBossMasks>            
            <GridCellEquipment>
                <EquipmentSlot><QuestItemWrapper onClick = {() => setDescription(items.sword)}><QuestItemWithHover src = {items.sword.img} name={items.sword.name}/></QuestItemWrapper></EquipmentSlot>
                <EquipmentSlot><QuestItemWrapper onClick = {() => setDescription(items.shield)}><QuestItemWithHover src = {items.shield.img} name={items.shield.name}/></QuestItemWrapper></EquipmentSlot>
                <EquipmentSlot><QuestItemWrapper onClick = {() => setDescription(items.quiver)}><QuestItemWithHover src = {items.quiver.img} name={items.quiver.alternate}/></QuestItemWrapper></EquipmentSlot>
                <EquipmentSlot><QuestItemWrapper onClick = {() => setDescription(items.bombBag)}><QuestItemWithHover src = {items.bombBag.img} name={items.bombBag.alternate}/></QuestItemWrapper></EquipmentSlot>
            </GridCellEquipment> */}
        </QuestStatusGrid>
    </QuestStatusContainer>
}


export default QuestStatus;