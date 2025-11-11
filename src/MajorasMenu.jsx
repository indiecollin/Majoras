import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';
import Items from './Items/Items.jsx';
import Masks from './Masks/Masks.jsx';
import QuestStatus from './QuestStatus/QuestStatus.jsx';
import Map from './Map/Map.jsx';
import Health from './Interface/Health.jsx';
import Magic from './Interface/Magic.jsx';
import ActionButtons from './Interface/ActionButtons.jsx';
import AboutModal from './Interface/AboutModal.jsx';
import ControlsTooltip from './Interface/ControlsTooltip.jsx';
import InfoBar from './Interface/InfoBar.jsx';
import DescriptionModal from './Interface/DescriptionModal.jsx';
import MobileNotice from './Interface/MobileNotice.jsx';
import TouchDeviceNotice from './Interface/TouchDeviceNotice.jsx';
import Triangle from './svgs/Triangle.jsx';
import Base from './svgs/Base.jsx';
import { rotateButtonInfo } from './data/index.js';
import AddHoverEffect from './helpers/AddHoverEffect.jsx';
import { delay, mod } from './helpers/index.js';
import onClickOutside from './helpers/onClickOutside.jsx';
import {    
    frame,
    darkFrame,
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
import Rupee from '../public/Interface/rupee.png';
import FireEffect from '../public/Interface/fire-effect.png';
import IceEffect from '../public/Interface/ice-effect.png';
import LightEffect from '../public/Interface/light-effect.png';
import fireArrowSelect from '../public/Interface/fire-arrow-effect.wav';
import iceArrowSelect from '../public/Interface/ice-arrow-effect.wav';
import lightArrowSelect from '../public/Interface/light-arrow-effect.wav';
import itemSelect from '../public/Interface/item-select.wav';
import rotateMenuLeft from '../public/Interface/menu-left.wav';
import rotateMenuRight from '../public/Interface/menu-right.wav';

const sounds = {    
    fireArrowSelect: new Audio(fireArrowSelect),
    iceArrowSelect: new Audio(iceArrowSelect),
    lightArrowSelect: new Audio(lightArrowSelect),
    itemSelect: new Audio(itemSelect),
    rotateMenuLeft: new Audio(rotateMenuLeft),    
    rotateMenuRight: new Audio(rotateMenuRight)
};

const count = 4;
const menuButtonWidth = 84;
const fullMenuWidth = 1600;

const MenuBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    perspective: 3200px; 
    @media only screen and (max-width: 1600px) {
        perspective: 5000px;
    } 

    > * {
         flex: 0 0 auto;
    }

    figure {
        width: 100%;
        max-width: ${props => props.menusWidth + 'px'};        
        transform-origin: 50% 50% ${props => -props.apothem + 'px'};
        transform-style: preserve-3d;
        transform: rotateY(${props => props.curMenu * -2*Math.PI/props.count}rad);
        transition: all 0.5s linear;
        z-index: 1000;
        pointer-events: none;
        
        @media only screen and (max-width: 1600px) {            
            margin-top: -2.5%;
        }

        @media only screen and (max-width: 720px) {            
            margin-top: -12.5%;
        }

        @media (width < 480px) {
            display: none;
        }
        
        &>div {            
            pointer-events: all;                        

            &:nth-child(${props => mod(props.curMenu, 4) + 1}){
                visibility: hidden;
            }
            ${props => transAngle(props.count)}
            &:not(:first-of-type) {
                position: absolute;                
                transform-origin: 50% 50% ${props => -props.apothem + 'px'};
            }
            &>div{
                transform: rotateY(180deg);
            }
            h1{
                color: ${frame};
                -webkit-text-stroke: 5px ${darkFrame};
                letter-spacing: 4px;
                line-height: 75px;
                font-size: 64px;
                @media only screen and (max-width: 1600px) {
                    line-height: 50px;
                    font-size: 48px;
                }                 
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

const FontPreload = styled.span`
    position: absolute;
    visibility: hidden;
    z-index: -1;
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

const HealthAndMagic = styled.div`
    position: absolute;
    z-index: 1100;
    top: 72px;
    left: 25%;
    transform: translateX(-50%);

    @media only screen and (max-width: 1600px) {
        top: 0;
        left: 20%;
    }

    @media only screen and (max-width: 720px) {
        top: 0;
        left: 30%;
    }
`;

const EquipButtonsWrapper = styled.div`
    display: flex;
    position: absolute;
    z-index: 1100;
    top: 62px;
    right: 15%;    
    width: 300px;

    @media only screen and (max-width: 1600px) {
        top: 2.5%;
        right: -9%;
    }

    @media only screen and (max-width: 720px) {
        display: none;
    }
`;

const EquipButton = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    position: relative;
    &:before{
        display: flex;
        content: '';
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        background-color: ${buttonYellow};
        position: absolute;
        border: 1px solid ${buttonYellowBorder};
        outline: 3px solid ${buttonYellowOutline};
        outline-offset: -6px;
        clip-path: polygon(50% 0%, 80.9% 9.5%, 97.6% 34.5%, 97.6% 65.5%, 80.9%
        90.5%, 50% 100%, 19.1% 90.5%, 2.4% 65.5%, 2.4% 34.5%, 19.1% 9.5%, 50% 0%);
        z-index: -1;
    }
    svg{
        position: absolute;
    }
    img{
        z-index: 1300
    } 
`;

const EquipButtonLeft = styled(EquipButton)`
    left: -8px;
    z-index: 1230;
    svg{
        transform: rotate(90deg);
    }
`;

const EquipButtonDown = styled(EquipButton)`    
    top: 40px;
    left: -16px;
    z-index: 1220;
`;

const EquipButtonRight = styled(EquipButton)`
    left: -24px;
    z-index: 1210;
    svg{
        transform: rotate(-90deg);
    }
`;

const NoticeButton = styled(EquipButton)`
    width: 36px;
    height: 36px;
    position: absolute;
    left: 20.5%;
    top: -6px;
    color: white;
    outline: unset;    
    -webkit-text-stroke: 1px black;
    font-weight: 600;
    animation: flicker 1s steps(1, end) alternate infinite;
    cursor: pointer;
    @keyframes flicker {
        0% {
        opacity: 1
        }
        50% {
        opacity : 0;
        }
        100% {
        opacity: 1
        }
    }
`;

const EquippedItem = styled.img``;

const RotateMenuLeftButton = styled.button`

    @media only screen and (max-width: 720px) {            
        left: 0;
    }

    all: unset;
    left: 20%;
    top: 40%;
    z-index: 1100;
    touch-action: manipulation;

    &:after{
        position: absolute;
        z-index: 2000;
        content: 'Q';
        font-size: 36px;
        color: ${frame};
        -webkit-text-stroke: 2.5px ${darkFrame};
        top: 15%;
        left: 40%;   
        font-family: "Aoboshi One", serif;
        font-weight: 400;
        font-style: normal; 
    }
`;

const RotateMenuRightButton = styled.button`

    @media only screen and (max-width: 720px) {            
        right: 0;
    }

    all: unset;
    right: 20%;
    top: 40%;
    z-index: 1100;
    touch-action: manipulation;

    &:after{
        position: absolute;
        z-index: 2000;
        content: 'E';
        font-size: 36px;
        color: ${frame};
        -webkit-text-stroke: 2.5px ${darkFrame};
        top: 15%;
        right: 50%;
        font-family: "Aoboshi One", serif;
        font-weight: 400;
        font-style: normal;
    }
`;

const Rupees = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
    color: white;
    -webkit-text-stroke: 1px black;        
    font-size: 24px;
    bottom: 72px;
    left: 224px;
    @media only screen and (max-width: 1600px) {
        bottom: 5%;
        left: 2.5%;
    }
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
    ${props => props.animate2 ? ('top: calc(' + props.arrowTip.top + 'px + '+ (props.arrowTip.height/5) +'px + ' + (props.scrollY) + 'px);') : '' }
    ${props => !props.animate2 ? ('left: calc(' + props.arrow.left + 'px + '+ (props.arrow.width/8) +'px + ' + (props.scrollX) + 'px);') : '' }
    ${props => props.animate2 ? ('left: calc(' + props.arrowTip.left + 'px + ' + (props.arrowTip.width/2.5) +'px + ' + (props.scrollX) + 'px);') : '' }    
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
    const [hearts, setHearts] = useState(4); // the max capacity of hearts
    const [health, setHealth] = useState(10); // current value, counted in fourths to work better with quarter hearts
    const [magic, setMagic] = useState(100);
    const [showAbout, setShowAbout] = useState(false);    
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
    const [showControls, setShowControls] = useState(false);
    const [arrowAnimate1, setArrowAnimate1] = useState(false);
    const [arrowAnimate2, setArrowAnimate2] = useState(false);
    const [scrollX, setScrollX] = useState(window.scrollX);
    const [scrollY, setScrollY] = useState(window.scrollY);
    const [menusWidth, setMenusWidth] = useState(fullMenuWidth);// can probably get rid of this
    const [apothem, setApothem] = useState(fullMenuWidth / (2 * Math.tan(Math.PI/count)));// can probably get rid of this
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);    



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
                selectSound = sounds['fireArrowSelect'];
            } else if(element === 'Ice'){
                effectImage = IceEffect;
                selectSound = sounds['iceArrowSelect'];
            } else if(element === 'Light'){
                effectImage = LightEffect;
                selectSound = sounds['lightArrowSelect'];
            }
            setArrowAnimate1(true);
            setScrollX(window.scrollX);
            setScrollY(window.scrollY);
            selectSound.play();
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
            try{
                sounds['itemSelect'].load();
                sounds['itemSelect'].play();
            } catch(e){
                console.error(e.message, 'sound used before last use completed');
            }
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

    const rotatePage = async (clockwise) => {        
        let nextMenu;
        setCurMenu(prevState => {
            nextMenu = prevState + (clockwise ? -1 : 1);
            return nextMenu;
        })
        if(!isTouchDevice){
            setInfoBar(rotateButtonInfo[mod(nextMenu + (clockwise ? -1 : 1), 4)]);
        }        
        setHoveredEquip();        

        try{
            if(clockwise){
                sounds['rotateMenuRight'].load();
                sounds['rotateMenuRight'].play();                
            } else {
                sounds['rotateMenuLeft'].load();
                sounds['rotateMenuLeft'].play();                
            }
        } catch(e){            
            console.error(e.message, 'sound used before last use completed');
        }     
    }

    onClickOutside(descriptionRef, () => {
        setDescription();
    });

    useEffect(()=>{                       
        if(window.outerWidth<=720){
            setIsSmallScreen(true);
        }         
        if (window?.matchMedia("(pointer:coarse)").matches){
            setIsTouchDevice(true);
        }        
        menuBoxRef.current.focus();
    },[]);
      
    return <MenuContext.Provider value={{curMenu, selecting, description, setInfoBar, setInstructions, setDescription, setHoveredEquip}}>
    <>
        <MenuBox 
            ref={menuBoxRef}
            curMenu = {curMenu} 
            menusWidth = {menusWidth} 
            count = {count}             
            apothem = {apothem} 
            onKeyDown={menuKeyPress} 
            tabIndex={-1} 
            navDisabled={description}
        >
            {/* preloading fonts */}
            <FontPreload className='wendy-one-regular'>|</FontPreload>
            <FontPreload className='comic-relief'>|</FontPreload>
            <FontPreload className='aoboshi-one-regular'>|</FontPreload>
            <FontPreload className='nanum-pen-script-regular'>|</FontPreload>            
            <HealthAndMagic>
                <Health health={health} hearts={hearts} defense={defense}/>
                <Magic magic={magic}/>
            </HealthAndMagic>
            <ActionButtons setShowAbout={setShowAbout}/>        
            <EquipButtonsWrapper>
                <EquipButtonLeft ref={cLeftRef}><EquippedItem src={cLeft.image}/><Triangle/></EquipButtonLeft>
                <EquipButtonDown ref={cDownRef}><EquippedItem src={cDown.image}/><Triangle/></EquipButtonDown>
                <EquipButtonRight ref={cRightRef}><EquippedItem src={cRight.image}/><Triangle/></EquipButtonRight>
                {!description && <NoticeButton className='comic-relief' onMouseOver={() => setShowControls(true)} onMouseLeave={()=> setShowControls(false)}>
                    Tatl                
                </NoticeButton>}
                {showControls && <ControlsTooltip/>}
            </EquipButtonsWrapper>        
            <AddHoverEffect dims={20} border={3.3}>
                <RotateMenuLeftButton 
                    onClick = {() => rotatePage()} 
                    name={rotateButtonInfo[mod(curMenu + 1, 4)]} 
                    parentWidth={menuButtonWidth} 
                    disabled={description} 
                    hoverDisabled={isSmallScreen} 
                    className='nav' nav
                >
                    <Base left={true}/>                
                </RotateMenuLeftButton>         
            </AddHoverEffect>
            <AddHoverEffect dims={20} border={3.3}>
                <RotateMenuRightButton  
                    onClick = {() => rotatePage(true)} 
                    name={rotateButtonInfo[mod(curMenu - 1, 4)]} 
                    parentWidth={menuButtonWidth} 
                    disabled={description} 
                    hoverDisabled={isSmallScreen} 
                    className='nav' nav
                >
                    <Base left={false}/>                
                </RotateMenuRightButton>
            </AddHoverEffect>        
            <Rupees className='comic-relief'>
                <img src={Rupee}/>500
            </Rupees>                    
            <figure>
                <QuestStatus hearts={hearts} setHealth={setHealth} setHearts={setHearts} />
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
            {showAbout && <AboutModal setShowAbout={setShowAbout}/>}
        </MenuBox>
        {!description && <InfoBar name={infoBar} instructions={instructions} equippable={hoveredEquip.current.equip.name}/>}
        <MobileNotice/>
        <TouchDeviceNotice/>
    </>
    </MenuContext.Provider>
}

export default MajorasMenu;
