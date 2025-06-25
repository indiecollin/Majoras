import React, {useState} from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';
import Items from './Items.jsx';
import Masks from './Masks.jsx';
import QuestStatus from './QuestStatus.jsx';
import Map from './Map.jsx';
import Rupee from '../public/Interface/rupee.png';
import AddHoverEffect from './helpers/AddHoverEffect.jsx';
import baseSVG from '../public/Interface/base.svg';
import DescriptionModal from '../src/DescriptionModal.jsx';

const count = 4;
const menusWidth = 1600;
const menuGap = '0';
const apothem = menusWidth / (2 * Math.tan(Math.PI/count));

const rotateButtonInfo = [
    'To Select Item',
    'To Masks',
    'To Quest Status',
    'To Map'
];

const MenuBox = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    perspective: 3200px;
    > * {
         flex: 0 0 auto;
    }

    figure {
        width: ${props => props.menusWidth + 'px'};
        transform-origin: 50% 50% ${props => -props.apothem + 'px'};
        transform-style: preserve-3d;
        transform: rotateY(${props => props.curMenu * -2*Math.PI/props.count}rad);
        transition: all 0.5s linear;
        
        &>div {
            padding: 0 ${props => props.menuGap / 2}px;
            width: 100%;
            height: 100vh;                  
            &:nth-child(${props => mod(props.curMenu, 4) + 1}){
                visibility: hidden;
            }
            ${props => transAngle(props.count)}
            &:not(:first-of-type) {
                position: absolute;
                left: 0;
                top: 0;
                transform-origin: 50% 50% ${props => -props.apothem + 'px'};
            }
            &>*{
                transform: rotateY(180deg);
            }
        } 
    }
`;

const transAngle = (n) => {
    let rules = '';
    for(let i = 2; i<=n; i++){
        rules += `&:nth-child(${i}){
            transform: rotateY(${(i - 1) * (2 * Math.PI / n) }rad);
        }\n`
    }
    return rules;
}

const mod = (n, m) => {
    return ((n % m) + m) % m;
}

const HealthAndMagic = styled.div`
    position: absolute;
    z-index: 1000;
    top: 72px;
    left: 224px;
    div:first-child{
        display: flex;
        flex-wrap: wrap;
        width: 280px;
        span{
            width: 24px;
            height: 18px;
            margin: 1px 2px;
            background-color: red;
            border-radius: 50%;
        }
    }
    div:last-child{
        position: relative;
        border: 2px solid #ffffff;
        background-color: darkgreen;
        width: 280px;
        height: 20px;
        margin-top: 2px;
        &:before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 75%;
            height: 100%;
            background-color: limegreen;
        }
    }
`;

const ActionButtons = styled.div`
    position: absolute;
    z-index: 1000;
    top: 72px;
    left: 620px;
    width: 300px;    

    span{
        position: relative;
        color: #ffffff;
        -webkit-text-stroke: 1px black;
        font-weight: 600;
        font-family: cursive;
    }

    span:nth-child(1){
        &:before{
            content: '';
            position: absolute;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            z-index: -1;
            left: calc((52px/2) - 28px/2);
            background-color: red;
            
        }        
    }

    span:nth-child(2){
        margin-left: 10px;
        &:before{
            content: '';
            position: absolute;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            z-index: -1;
            top: -10px;
            left: calc((37px/2) - 48px/2);
            background-color: green;
        }
    }

    span:nth-child(3){
        margin-left: 10px;
        top: 36px;
        &:before{
            content: '';
            position: absolute;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            z-index: -1;
            top: -10px;
            left: calc((52px/2) - 48px/2);
            background-color: blue;
        }
    }
`;

const ItemButtons = styled.div`
    display: flex;
    position: absolute;
    z-index: 1000;
    top: 62px;
    left: 1200px;
    width: 300px;    

    span{        
        border-radius: 50%;
        width: 48px;
        height: 48px;
        background-color: yellow;
        position: relative;
    }

    span:nth-child(1){   
        left: -8px;   
    }

    span:nth-child(2){   
        top: 32px;
        left: -16px;   
    }

    span:nth-child(3){   
        left: -24px;   
    }
`;

const RotateButtonSVG = styled.svg`
    background: url(${baseSVG});
    transform-origin: 50% 50%;
    ${props => !props.hovered ? props.hoverEffect : ''}
    transform: ${props => props.left ? 'rotate(90deg)' : 'rotate(-90deg)'};
`;

const RotateMenuLeftButton = styled.button`
    all: unset;
    position: absolute;
    display: flex;
    top: 45%;
    left: 12%;
    width: 100px;
    height: 100px;
    z-index: 1000;
`;

const RotateMenuRightButton = styled.button`
    all: unset;
    position: absolute;
    display: flex;
    width: 100px;
    height: 100px;
    top: 45%;
    right: 12%;
    z-index: 1000;
`;

const Rupees = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: #ffffff;
    -webkit-text-stroke: 1px black;
    font-weight: 600;
    font-family: cursive;
    font-size: 24px;
    bottom: 72px;
    left: 224px;
    img{
        width: 24px;
        margin-right: 4px;
    }
`;

const InfoBar = styled.div`
    position: absolute;
    z-index: 1000;
    background-color: darkgoldenrod;
    width: 300px;
    color: #ffffff;
    -webkit-text-stroke: 1px black;
    font-family: cursive;
    font-weight: 600;
    font-size: 20px;
    bottom: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
`;

//clone image on top
//get coords for bow, c slots, arrow elements
//elements may need to be grabbed at animation time, bow is a maybe
//on resize
//animation to move clone to c slot
//item selection logic

const test = (e) => {
    //is an item being hovered?
    //is it equippable?
    //was a equip key pressed?
    //how will this work when I implement disabling by rotation?
    console.log("Collin wuz here");
}

const MajorasMenu  = () => {
    const [curMenu, setCurMenu] = useState(0);
    const [infoBar, setInfoBar] = useState('\u00A0');
    const [toEquip, setToEquip] = useState();
    const [description, setDescription] = useState();    

    // const RotateMenuLeftButtonWithHover = AddHoverEffect(RotateMenuLeftButton, 100, setInfoBar);
    // const RotateMenuRightButtonWithHover = AddHoverEffect(RotateMenuRightButton, 100, setInfoBar);
    return <MenuContext.Provider value={{setInfoBar, setDescription, setToEquip}}>
    <MenuBox curMenu = {curMenu} menusWidth = {menusWidth} count = {count} menuGap = {menuGap} apothem = {apothem} onKeyDown={test} tabIndex={-1}>
        <HealthAndMagic>
            <div>
                {new Array(20).fill().map(h => <span></span>)}
            </div>
            <div></div>
        </HealthAndMagic>
        <ActionButtons>
            <span>Return</span>
            <span>Save</span>
            <span>Decide</span>
        </ActionButtons>
        <ItemButtons>
            <span></span>
            <span></span>
            <span></span>
        </ItemButtons>        
        {/* <RotateMenuLeftButtonWithHover onClick = {() => setCurMenu(prevState =>  prevState+1)} name={rotateButtonInfo[mod(curMenu + 1, 4)]}>
            <RotateButtonSVG left={true}>Z</RotateButtonSVG>           
        </RotateMenuLeftButtonWithHover>
        <RotateMenuRightButtonWithHover onClick = {() => setCurMenu(prevState =>  prevState-1)} name={rotateButtonInfo[mod(curMenu - 1, 4)]}>
            <RotateButtonSVG left={false}/>
        </RotateMenuRightButtonWithHover>           */}
        <Rupees>
            <img src={Rupee}/>500
        </Rupees>
        <InfoBar>{infoBar}</InfoBar>
        <figure>
            <QuestStatus/>
            <Map/>
            <Items/>
            <Masks/>
        </figure>
        {description && <DescriptionModal description={description}/>}
    </MenuBox>    
    </MenuContext.Provider>
}


export default MajorasMenu;
