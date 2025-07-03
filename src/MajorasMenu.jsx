import React, { useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';
import Items from './Items.jsx';
import Masks from './Masks.jsx';
import QuestStatus from './QuestStatus.jsx';
import Map from './Map.jsx';
import EquipButtons from './EquipButtons.jsx';
import Rupee from '../public/Interface/rupee.png';
import FireEffect from '../public/Interface/fire-effect.png';
import IceEffect from '../public/Interface/ice-effect.png';
import LightEffect from '../public/Interface/light-effect.png';
import InfoBarCs from '../public/Interface/info-bar-Cs.png';
import AddHoverEffect from './helpers/AddHoverEffect.jsx';
import baseSVG from '../public/Interface/base.svg';
import DescriptionModal from '../src/DescriptionModal.jsx';
import { delay } from './helpers/index.js';
import fireArrowSelectSound from '../public/Interface/fire-arrow-effect.wav';
import iceArrowSelectSound from '../public/Interface/ice-arrow-effect.wav';
import lightArrowSelectSound from '../public/Interface/light-arrow-effect.wav';
import itemSelectSound from '../public/Interface/item-select.wav';

import {
    frame,
    fireArrowRedPrimary,
    fireArrowRedSecondary,    
    iceArrowBluePrimary,
    iceArrowBlueSecondary,
    lightArrowYellowPrimary,
    lightArrowYellowSecondary 
} from './styles/colors.js';


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
    background-color: #DCDCDC;

    > * {
         flex: 0 0 auto;
    }

    figure {
        width: ${props => props.menusWidth + 'px'};
        transform-origin: 50% 50% ${props => -props.apothem + 'px'};
        transform-style: preserve-3d;
        transform: rotateY(${props => props.curMenu * -2*Math.PI/props.count}rad);
        transition: all 0.5s linear;
        z-index: 1000;
        
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
    z-index: 1100;
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
    z-index: 1100;
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
    z-index: 1100;
    top: 62px;
    left: 1200px;
    width: 300px;    

    span{
        border-radius: 50%;
        width: ${props => props.dims.width}px;
        height: ${props => props.dims.height}px;
        background-color: yellow;
        position: relative;
    }

    span:nth-child(1){   
        left: -8px;
        z-index: 1230;  
    }

    span:nth-child(2){   
        top: 32px;
        left: -16px;
        z-index: 1220; 
    }

    span:nth-child(3){   
        left: -24px;
        z-index: 1210;
    }
`;

const EquippedItem = styled.img`
    
`;

const RotateButtonSVG = styled.svg`
    background: url(${baseSVG});
    transform-origin: 50% 50%;
    ${props => !props.hovered ? props.hoverEffect : ''}
    transform: ${props => props.left ? 'rotate(90deg)' : 'rotate(-90deg)'};
`;

const menuButtonWidth = 100;

const RotateMenuLeftButton = styled.button`
    all: unset;
    position: absolute;
    display: flex;
    top: 45%;
    left: 12%;
    width: 100px;
    height: 100px;
    z-index: 1100;
`;

const RotateMenuRightButton = styled.button`
    all: unset;
    position: absolute;
    display: flex;
    width: 100px;
    height: 100px;
    top: 45%;
    right: 12%;
    z-index: 1100;
`;

const Rupees = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
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
    background-color: ${frame};
    width: 300px;
    color: ${props => props.nav ? 'gold' : '#ffffff'};
    -webkit-text-stroke: 1px black;
    font-family: cursive;
    font-weight: 600;
    font-size: 24px;
    bottom: 72px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        height: 36px;
    }
`;

const EquipmentClone = styled.img`
    position: absolute;
    top: ${props => (props.clonedInfo.top + props.scrollY)}px;    
    left: ${props => (props.clonedInfo.left + props.scrollX)}px;    
    width: ${props => props.clonedInfo.width}px;
    height: ${props => props.clonedInfo.height}px;
    transition: all 0.25s linear;
    z-index: 1200;
`;

const ArrowEffect = styled.span`
    position: absolute;
    border-radius: 50%;
    z-index: 900;    
    background-image: radial-gradient(circle at center, ${props => props.color + ' 50%, ' + props.color2 + ' 66.6%, ' + props.color2} 100%);
    opacity: ${props => props.show && (props.animate1 || props.animate2) ?  1 : 0 };
    ${props => !props.animate2 ? ('top: calc(' + props.arrow.top + 'px + '+ (props.arrow.height/2.3) +'px + ' + (props.scrollY) + 'px);') : '' }
    ${props => props.animate2 ? ('top: calc(' + props.arrowTip.top + 'px + '+ (props.arrowTip.height/25) +'px + ' + (props.scrollY) + 'px);') : '' }
    ${props => !props.animate2 ? ('left: calc(' + props.arrow.left + 'px + '+ (props.arrow.width/8) +'px + ' + (props.scrollX) + 'px);') : '' }
    ${props => props.animate2 ? ('left: calc(' + props.arrowTip.left + 'px + '+ (props.arrowTip.width/1.66) +'px + ' + (props.scrollX) + 'px);') : '' }    
    ${props => !props.animate2 ? ('width: calc(' + props.arrow.width + 'px/2);') : ''}
    ${props => props.animate2 ? ('width: ' + props.arrowTip.width/3 + 'px;') : ''}
    ${props => !props.animate2 ? ('height: calc(' + props.arrow.height + 'px/2);') : ''}
    ${props => props.animate2 ? ('height: ' + props.arrowTip.height/3 + 'px;') : ''}
    ${props => (props.animate2) ? 'transition: left 0.3s linear, top 0.3s linear, width 0.3s linear, height 0.3s linear;' : ''}

    &.arrow-glow{
        animation: glow 0.5s linear alternate 2;
    }

    @keyframes glow {
        from {
        width: ${props =>  props.arrowTip.width/3}px;
        height: ${props => props.arrowTip.height/3}px;
        filter: blur()
        }
        to {
        width: calc(${props => props.arrow.width}px/2);
        height: calc(${props => props.arrow.height}px/2);
        filter: blur(15px);
        }
    }
`;

const InfoBarX = (props) => {
    const {name, equippable} = props;
    let instructions, nav;
    if(equippable){
        instructions = <><img src={InfoBarCs}/> to Equip</>
    }
    if (rotateButtonInfo.includes(name)){
        nav = true;
    }
    else{
        instructions = props.instructions;
    }
    const [info, setInfo] = useState(name ? <p>{name}</p> : <p>{'\u00A0'}</p>);

    useEffect(()=>{
        setInfo(<p>{name}</p>);
        const interval = setInterval(() => {
            setInfo((prevState) => prevState.props.children === name && instructions ? instructions : <p>{name}</p>);
        }, 1500);
        return () => clearInterval(interval);
    },[name]);

    return <InfoBar nav={nav}>{info}</InfoBar>
}

const MajorasMenu  = () => {
    const hoveredEquip = useRef({equip:{}}); // Store a mutable object in a ref
    const cLeftRef = useRef();
    const cDownRef = useRef();
    const cRightRef = useRef();

    const [curMenu, setCurMenu] = useState(0);
    const [infoBar, setInfoBar] = useState('\u00A0');
    const [instructions, setInstructions] = useState();
    const [description, setDescription] = useState();
    const [equipmentClone, setEquipmentClone] = useState({});
    const [equipDims, setEquipDims] = useState({width: 64, height: 64});
    const [bowRef, setBowRef] = useState();
    const [fireArrowRef, setFireArrowRef] = useState();
    const [iceArrowRef, setIceArrowRef] = useState();
    const [lightArrowRef, setLightArrowRef] = useState();
    const [cLeft, setCLeft] = useState({});
    const [cDown, setCDown] = useState({});
    const [cRight, setCRight] = useState({});
    const [selecting, setSelecting] = useState(false);
    const [arrowAnimate1, setArrowAnimate1] = useState(false);
    const [arrowAnimate2, setArrowAnimate2] = useState(false);
    const [scrollX, setScrollX] = useState(window.scrollX);
    const [scrollY, setScrollY] = useState(window.scrollY);
    
    const test = async (e) => {
        if(!'asd'.includes(e.key)) return;
        if(!hoveredEquip.current.equip.name) return;
        setSelecting(true);
        e.persist();
        let { name, image, bottle } = hoveredEquip.current.equip;
        let effectImage;
        if(name.includes('Arrow')){
            const element = name.split(' ')[0];
            let selectSound;
            name = "Hero's Bow";    
            if(element === 'Fire'){
                effectImage = FireEffect;
                selectSound = fireArrowSelectSound;
            } else if(element === 'Ice'){
                effectImage = IceEffect;
                selectSound = iceArrowSelectSound;
            } else if(element === 'Light'){
                effectImage = LightEffect;
                selectSound = lightArrowSelectSound;
            }
            setArrowAnimate1(true);
            setScrollX(window.scrollX);
            setScrollY(window.scrollY);
            new Audio(selectSound).play();
            await delay(1000);            
            setArrowAnimate2(true);
            await delay(500);
            setArrowAnimate1(false);
            setArrowAnimate2(false);
            let cButtonInfo = {...bowRef.current.getBoundingClientRect().toJSON()};         
            setEquipmentClone((prevState) => {                
            return {
                ...prevState,    
                top: cButtonInfo.top,                
                left: cButtonInfo.left,                
                width: cButtonInfo.width,
                height: cButtonInfo.height,                
                image: effectImage
            }
            });
            setScrollX(window.scrollX);
            setScrollY(window.scrollY);
            await delay(300);
        }        
        await delay(0);
        let cButtonInfo;
        let inUseLeft, inUseDown, inUseRight;
        let setC;
        if(e.key === 'a'){            
            cButtonInfo = {...cLeftRef.current.getBoundingClientRect().toJSON()};
            setC = () => {setCLeft({name: name, image: effectImage ? effectImage : image, bottle: bottle})};
            if(cDown.name === name && (!bottle || cDown.bottle === bottle)){
                if(cLeft.name){
                    inUseDown = {...cLeft};
                }
                else{
                    inUseDown = {};
                }
            }
            else if (cRight.name === name && (!bottle || cRight.bottle === bottle)){
                if(cLeft.name){
                    inUseRight = {...cLeft};
                }
                else{
                    inUseRight = {};
                }
            }
        } else if(e.key === 's'){            
            cButtonInfo = {...cDownRef.current.getBoundingClientRect().toJSON()};
            setC = () => {setCDown({name: name, image: effectImage ? effectImage : image, bottle: bottle})};
            if(cLeft.name === name && (!bottle || cLeft.bottle === bottle)){
                if(cDown.name){
                    inUseLeft = {...cDown};
                }
                else{
                    inUseLeft = {};
                }
            }
            else if (cRight.name === name && (!bottle || cRight.bottle === bottle)){
                if(cDown.name){
                    inUseRight = {...cDown};
                }
                else{
                    inUseRight = {};
                }
            }            
        } else if(e.key === 'd'){            
            cButtonInfo = {...cRightRef.current.getBoundingClientRect().toJSON()};
            setC = () => {setCRight({name: name, image: effectImage ? effectImage : image, bottle: bottle})};
            if(cLeft.name === name && (!bottle || cLeft.bottle === bottle)){
                if(cRight.name){
                    inUseLeft = {...cRight};
                }
                else{
                    inUseLeft = {};
                }
            }
            else if (cDown.name === name && (!bottle || cDown.bottle === bottle)){
                if(cRight.name){
                    inUseDown = {...cRight};
                }
                else{
                    inUseDown = {};
                }
            }          
        } 

        if(!effectImage){ // already set in the elemental arrow logic
            setEquipmentClone({
                ...hoveredEquip.current.equip,                
            });
            setScrollX(window.scrollX);
            setScrollY(window.scrollY);
            new Audio(itemSelectSound).play();
        }
      
        await delay(0);
        setEquipmentClone((prevState) => {                
            return {
                ...prevState,    
                top: cButtonInfo.top,                
                left: cButtonInfo.left,                
                width: cButtonInfo.width,
                height: cButtonInfo.height
            }
        });
        await delay(300);
        setEquipmentClone({});
        setHoveredEquip();
        setC();
        if(inUseLeft){
            setCLeft(inUseLeft);
        }
        if(inUseDown){ // these can technically be else ifs
            setCDown(inUseDown);
        }
        if(inUseRight){
            setCRight(inUseRight);
        }
        setSelecting(false);
    }

    const setHoveredEquip = (equipInfo) => {        
        hoveredEquip.current.equip = equipInfo ? equipInfo : {};
    }

    const isEquipped = (name, bottle) => {          
        if(cLeft.name === name && cLeft.bottle === bottle){
            return true;
        }
        if(cDown.name === name && cDown.bottle === bottle){
            return true;
        }
        if(cRight.name === name && cRight.bottle === bottle){
            return true;
        }
        return false;
    }    
      
    return <MenuContext.Provider value={{selecting, setInfoBar, setInstructions, setDescription, setHoveredEquip}}>
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
        {/* <EquipButtons cLeft = {cLeft} cLeftRef={cLeftRef}/> */}
        <ItemButtons dims={equipDims}>
            <span ref={cLeftRef}><EquippedItem src={cLeft.image}/></span>
            <span ref={cDownRef}><EquippedItem src={cDown.image}/></span>
            <span ref={cRightRef}><EquippedItem src={cRight.image}/></span>
        </ItemButtons>        
         <AddHoverEffect>
            <RotateMenuLeftButton onClick = {() => setCurMenu(prevState => prevState+1)} name={rotateButtonInfo[mod(curMenu + 1, 4)]} parentWidth={menuButtonWidth} nav>
                <RotateButtonSVG left={true}>Z</RotateButtonSVG>
            </RotateMenuLeftButton>         
        </AddHoverEffect>
        <AddHoverEffect>
            <RotateMenuRightButton onClick = {() => setCurMenu(prevState => prevState-1)} name={rotateButtonInfo[mod(curMenu - 1, 4)]} parentWidth={menuButtonWidth} nav>
                <RotateButtonSVG left={false}/>
            </RotateMenuRightButton>
        </AddHoverEffect>        
        <Rupees>
            <img src={Rupee}/>500
        </Rupees>
        {/* <InfoBar>{infoBar}</InfoBar> */}
        <InfoBarX name={infoBar} instructions={instructions} equippable={hoveredEquip.current.equip.name}/>
        <figure>
            <QuestStatus/>
            <Map/>
            <Items 
                isEquipped={isEquipped}
                setBowRef={setBowRef} 
                setFireArrowRef={setFireArrowRef}
                setIceArrowRef={setIceArrowRef} 
                setLightArrowRef={setLightArrowRef}/>
            <Masks isEquipped={isEquipped}/>
        </figure>
        {(bowRef?.current) && <>
            <ArrowEffect className = {arrowAnimate1 ? 'arrow-glow' : ''} show = {selecting && hoveredEquip.current.equip.name === 'Fire Arrow'} animate1={arrowAnimate1} animate2={arrowAnimate2} color={fireArrowRedPrimary} color2={fireArrowRedSecondary} arrow={fireArrowRef.current.getBoundingClientRect().toJSON()} arrowTip={bowRef.current.getBoundingClientRect().toJSON()} scrollX={scrollX} scrollY={scrollY}/> 
            <ArrowEffect className = {arrowAnimate1 ? 'arrow-glow' : ''} show = {selecting && hoveredEquip.current.equip.name === 'Ice Arrow'} animate1={arrowAnimate1} animate2={arrowAnimate2} color={iceArrowBluePrimary} color2={iceArrowBlueSecondary} arrow={iceArrowRef.current.getBoundingClientRect().toJSON()} arrowTip={bowRef.current.getBoundingClientRect().toJSON()} scrollX={scrollX} scrollY={scrollY}/>
            <ArrowEffect className = {arrowAnimate1 ? 'arrow-glow' : ''} show = {selecting && hoveredEquip.current.equip.name === 'Light Arrow'} animate1={arrowAnimate1} animate2={arrowAnimate2} color={lightArrowYellowPrimary} color2={lightArrowYellowSecondary} arrow={lightArrowRef.current.getBoundingClientRect().toJSON()} arrowTip={bowRef.current.getBoundingClientRect().toJSON()} scrollX={scrollX} scrollY={scrollY}/>
        </>}
        <EquipmentClone src={equipmentClone.image} clonedInfo={equipmentClone} scrollX={scrollX} scrollY={scrollY}/>
        {description && <DescriptionModal description={description}/>}
    </MenuBox>
    </MenuContext.Provider>
}


export default MajorasMenu;
