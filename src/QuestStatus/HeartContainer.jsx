import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import MenuContext from '../MenuContext.jsx';
import AddHoverEffect from '../helpers/AddHoverEffect.jsx';
import { mod } from '../helpers/index.js';
import { questHover } from '../styles/colors.js';
import Hearts from '../../public/QuestStatus/hearts.png';
import Heart0 from '../../public/QuestStatus/heart0.png';
import Heart1 from '../../public/QuestStatus/heart1.png';
import Heart2 from '../../public/QuestStatus/heart2.png';
import Heart3 from '../../public/QuestStatus/heart3.png';
import Heart4 from '../../public/QuestStatus/heart4.png';
import HeartPiece from '../../public/QuestStatus/heart-piece.png';

const HeartContainer = styled.div`
    position: relative;    
    grid-column: 2/3;
    grid-row: 1/4;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 240px;
    max-height: 240px;
    justify-self: center;
    align-self: center;

    img{
        display: flex;
        z-index: 10
    }
`;

const HeartImage = styled.img`
    top: 0;
    left: 0;    
    position: absolute;
    width: 100%;
    height: 100%;
`;

const HeartPiecesContainer = styled.div`
    position: relative;
    top: 0;
    left: 0;
    line-height: 0;
    button{
        position: relative;
        width: 50%;
        height: 50%;
        z-index: 10;
        padding: 0;
        cursor: ${props => props.disabled || props.disableLite ? 'unset' : 'pointer'};
        pointer-events: ${props => props.disableLite ? 'none' : 'unset'};

        img{
            min-width: 80px;
            min-height: 80px;
            width: 100%;
            height: 100%;
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
            animation: heart-container-glow 2s infinite alternate;
        }
    }
    @keyframes heart-container-glow {
        from {
        opacity: 1;
        }
        to {
        opacity: 0.666;
        }
    }
`;

const heartItem = {
    img: HeartPiece, 
    name: 'Pieces of Heart',
    prompts: [
        <>Four pieces form a Heart Container...</>,
        <>And a new Heart Container will extend your life energy supply. </>
    ]  
}

const imgWidth = 220;// this doesn't match the actual parent's width
const HeartContainerContainer = (props) => { //it's actually called a heart container T-T
    const {hearts, setHearts, setHealth} = props;
    const { curMenu, description, setDescription } = useContext(MenuContext);  
    const [heart1, setHeart1] = useState(false);    
    const [heart2, setHeart2] = useState(false);    
    const [heart3, setHeart3] = useState(false);    
    const [heart4, setHeart4] = useState(false); 

    const obtainHeartPiece = (heart, setHeart) => {
        if(heart){
            setDescription(heartItem);
        } else{
            setHeart(true);
        }  
    };

    useEffect(()=>{
        if(heart1 && heart2 && heart3 && heart4){
            let heartCount;
            setHeart1(false);
            setHeart2(false);
            setHeart3(false);
            setHeart4(false);            
            setHearts(prevState => {
                heartCount = Math.min(prevState + 1, 20);
                return heartCount;
            });
            setHealth(heartCount*4);
        }
    }, [heart1, heart2, heart3, heart4, setHearts, setHealth]);    

    const isActive = mod(curMenu, 4) === 2;
    const maxedHearts = hearts>=20;
    return <HeartContainer>        
            <HeartImage src = {Hearts}/>            
            <AddHoverEffect color={questHover} dims={'28px'}>
                <HeartPiecesContainer name={heartItem.name} parentWidth={imgWidth} disabled={!isActive || description}>
                    <button onClick={()=>{ obtainHeartPiece(heart1, setHeart1)}} disableLite={description} disabled={!isActive || maxedHearts}><img src={heart1 ? Heart1 : Heart0}/></button>
                    <button onClick={()=>{ obtainHeartPiece(heart2, setHeart2)}} disableLite={description} disabled={!isActive || maxedHearts}><img src={heart2 ? Heart2 : Heart0}/></button>
                    <button onClick={()=>{ obtainHeartPiece(heart3, setHeart3)}} disableLite={description} disabled={!isActive || maxedHearts}><img src={heart3 ? Heart3 : Heart0}/></button>
                    <button onClick={()=>{ obtainHeartPiece(heart4, setHeart4)}} disableLite={description} disabled={!isActive || maxedHearts}><img src={heart4 ? Heart4 : Heart0}/></button>
                </HeartPiecesContainer>
            </AddHoverEffect>                    
    </HeartContainer>
}

export default HeartContainerContainer;