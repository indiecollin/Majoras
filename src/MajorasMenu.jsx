import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';
import Items from './Items.jsx';
import Masks from './Masks.jsx';
import QuestStatus from './QuestStatus.jsx';
import Map from './Map.jsx';
import Health from './Health.jsx';
import Magic from './Magic.jsx';
import ActionButtons from './ActionButtons.jsx';
import Triangle from './svgs/Triangle.jsx';
import InfoBar from './InfoBar.jsx';
import Rupee from '../public/Interface/rupee.png';
import FireEffect from '../public/Interface/fire-effect.png';
import IceEffect from '../public/Interface/ice-effect.png';
import LightEffect from '../public/Interface/light-effect.png';
import AddHoverEffect from './helpers/AddHoverEffect.jsx';
import onClickOutside from './helpers/onClickOutside.jsx';
import Base from './svgs/Base.jsx';
import DescriptionModal from '../src/DescriptionModal.jsx';
import { delay, mod } from './helpers/index.js';
import { rotateButtonInfo } from './data/index.js';
import getHeart from '../public/Interface/get-heart.wav';
import fireArrowSelectSound from '../public/Interface/fire-arrow-effect.wav';
import iceArrowSelectSound from '../public/Interface/ice-arrow-effect.wav';
import lightArrowSelectSound from '../public/Interface/light-arrow-effect.wav';
import itemSelectSound from '../public/Interface/item-select.wav';
import rotateMenuSoundLeft from '../public/Interface/menu-left.wav';
import rotateMenuSoundRight from '../public/Interface/menu-right.wav';

import {
    buttonYellow,
    buttonYellowBorder,
    buttonYellowOutline,
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
const menuButtonWidth = 84;

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

    svg[height='0'] { position: fixed }

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

    .nav{        
        position: absolute;
        display: flex;        
        width: ${menuButtonWidth}px;
        height: ${menuButtonWidth}px;        
        cursor: ${props => props.navDisabled ? 'unset': 'pointer'};        
        pointer-events: ${props => props.navDisabled ? 'none' : 'unset'};
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

const SVGFilters = styled.svg`
    
`;

const HealthAndMagic = styled.div`
    position: absolute;
    z-index: 1100;
    top: 72px;
    left: 224px;
`;

const EquipButtons = styled.div`
    display: flex;
    position: absolute;
    z-index: 1100;
    top: 62px;
    left: 1200px;
    width: 300px;    

    span{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 64px;
        height: 64px;
        background-color: ${buttonYellow};
        position: relative;
        border: 1px solid ${buttonYellowBorder};
        outline: 3px solid ${buttonYellowOutline};
        outline-offset: -6px;
        img{
            z-index: 1300
        }
    }

    span:nth-child(1){   
        left: -8px;
        z-index: 1230;
        svg{
            transform: rotate(90deg);
        }
    }

    span:nth-child(2){   
        top: 32px;
        left: -16px;
        z-index: 1220; 
    }

    span:nth-child(3){   
        left: -24px;
        z-index: 1210;
        svg{
            transform: rotate(-90deg);
        }
    }
`;

const EquippedItem = styled.img`
    
`;

const RotateMenuLeftButton = styled.button`
    all: unset;
    left: 12%;
    top: 45%;
    z-index: 1100;
`;

const RotateMenuRightButton = styled.button`
    all: unset;
    right: 12%;
    top: 45%;
    z-index: 1100;
`;

const Rupees = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
    color: white;
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

const MajorasMenu  = () => {
    const hoveredEquip = useRef({equip:{}}); // Store a mutable object in a ref
    const cLeftRef = useRef();
    const cDownRef = useRef();
    const cRightRef = useRef();
    const menuBoxRef = useRef();
    const descriptionRef = useRef();

    const [curMenu, setCurMenu] = useState(0);    
    const [infoBar, setInfoBar] = useState('\u00A0');
    const [hearts, setHearts] = useState(3); // the max capacity of hearts
    const [health, setHealth] = useState(6); // current value, counted in fourths to work better with quarter hearts
    const [magic, setMagic] = useState(100);
    const [defense, setDefense] = useState(false);
    const [instructions, setInstructions] = useState();
    const [description, setDescription] = useState();
    const [equipmentClone, setEquipmentClone] = useState({});
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

    const DescriptionModalWithRef = forwardRef(DescriptionModal);
    
    const menuKeyPress = async (e) => {
        if(e.key === 'q'){
            if(description) return;
            rotatePage();            
            return;
        }
        if(e.key === 'e'){
            if(description) return;
            rotatePage(true)            
            return;
        }
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

    const rotatePage = (clockwise) => {
        let nextMenu;
        setCurMenu(prevState => {
            nextMenu = prevState + (clockwise ? -1 : 1);
            return nextMenu;
        })
        setInfoBar(rotateButtonInfo[mod(nextMenu + (clockwise ? -1 : 1), 4)]);
        setHoveredEquip();
        clockwise ? new Audio(rotateMenuSoundRight).play() : new Audio(rotateMenuSoundLeft).play();
    }

    const increaseHealth = (points) =>{
        new Array(points).fill().forEach((_,i) => {
            setTimeout(() => {
                let nextHealth;
                setHealth(prevState => {
                    nextHealth = prevState+1;
                    return nextHealth;
                });
                if(nextHealth%4 == 0){
                    new Audio(getHeart).play();
                }
            }, (i+1) * 150);  
        })
    }

    onClickOutside(descriptionRef, () => {
        setDescription();

    });

    useEffect(()=>{
        menuBoxRef.current.focus();
    },[]);
      
    return <MenuContext.Provider value={{curMenu, selecting, description, setInfoBar, setInstructions, setDescription, setHoveredEquip}}>
    <MenuBox 
        ref={menuBoxRef}
        curMenu = {curMenu} 
        menusWidth = {menusWidth} 
        count = {count} 
        menuGap = {menuGap} 
        apothem = {apothem} 
        onKeyDown={menuKeyPress} 
        tabIndex={-1} 
        navDisabled={description}
    >
        <SVGFilters width="0" height="0" aria-hidden="true">
            <filter id="grainy" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency=".537"></feTurbulence>
            </filter>
            <filter id="stone" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency=".4337"></feTurbulence>
                <feColorMatrix type="saturate" values="0"></feColorMatrix>
                <feBlend mode="multiply" in="SourceGraphic"></feBlend>
            </filter>
        </SVGFilters>
        <HealthAndMagic>
            <Health health={health} hearts={hearts} defense={defense}/>
            <Magic magic={magic}/>
        </HealthAndMagic>
        <ActionButtons/>        
        <EquipButtons>
            <span ref={cLeftRef}><EquippedItem src={cLeft.image}/><Triangle/></span>
            <span ref={cDownRef}><EquippedItem src={cDown.image}/><Triangle/></span>
            <span ref={cRightRef}><EquippedItem src={cRight.image}/><Triangle/></span>
        </EquipButtons>        
         <AddHoverEffect dims={'20px'}>
            <RotateMenuLeftButton onClick = {() => rotatePage()} name={rotateButtonInfo[mod(curMenu + 1, 4)]} parentWidth={menuButtonWidth} disabled={description} className='nav' nav>
                <Base left={true}/>
            </RotateMenuLeftButton>         
        </AddHoverEffect>
        <AddHoverEffect dims={'20px'}>
            <RotateMenuRightButton onClick = {() => rotatePage(true)} name={rotateButtonInfo[mod(curMenu - 1, 4)]} parentWidth={menuButtonWidth} disabled={description} className='nav' nav>
                <Base left={false}/>
            </RotateMenuRightButton>
        </AddHoverEffect>        
        <Rupees>
            <img src={Rupee}/>500
        </Rupees>        
        <InfoBar name={infoBar} instructions={instructions} equippable={hoveredEquip.current.equip.name}/>
        <figure>
            <QuestStatus hearts={hearts} setHealth={setHealth} setHearts={setHearts}/>
            <Map/>
            <Items 
                isEquipped={isEquipped}
                setBowRef={setBowRef} 
                setFireArrowRef={setFireArrowRef}
                setIceArrowRef={setIceArrowRef} 
                setLightArrowRef={setLightArrowRef}
            />
            <Masks isEquipped={isEquipped}/>
        </figure>
        {(bowRef?.current) && <>
            <ArrowEffect className = {arrowAnimate1 ? 'arrow-glow' : ''} show = {selecting && hoveredEquip.current.equip.name === 'Fire Arrow'} animate1={arrowAnimate1} animate2={arrowAnimate2} color={fireArrowRedPrimary} color2={fireArrowRedSecondary} arrow={fireArrowRef.current.getBoundingClientRect().toJSON()} arrowTip={bowRef.current.getBoundingClientRect().toJSON()} scrollX={scrollX} scrollY={scrollY}/> 
            <ArrowEffect className = {arrowAnimate1 ? 'arrow-glow' : ''} show = {selecting && hoveredEquip.current.equip.name === 'Ice Arrow'} animate1={arrowAnimate1} animate2={arrowAnimate2} color={iceArrowBluePrimary} color2={iceArrowBlueSecondary} arrow={iceArrowRef.current.getBoundingClientRect().toJSON()} arrowTip={bowRef.current.getBoundingClientRect().toJSON()} scrollX={scrollX} scrollY={scrollY}/>
            <ArrowEffect className = {arrowAnimate1 ? 'arrow-glow' : ''} show = {selecting && hoveredEquip.current.equip.name === 'Light Arrow'} animate1={arrowAnimate1} animate2={arrowAnimate2} color={lightArrowYellowPrimary} color2={lightArrowYellowSecondary} arrow={lightArrowRef.current.getBoundingClientRect().toJSON()} arrowTip={bowRef.current.getBoundingClientRect().toJSON()} scrollX={scrollX} scrollY={scrollY}/>
        </>}
        <EquipmentClone src={equipmentClone.image} clonedInfo={equipmentClone} scrollX={scrollX} scrollY={scrollY}/>
        {description && <DescriptionModalWithRef description={description} ref={descriptionRef}/>}
    </MenuBox>
    </MenuContext.Provider>
}

export default MajorasMenu;
