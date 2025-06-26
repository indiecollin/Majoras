import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import MenuContext from '../MenuContext.jsx';
import AddHoverEffect from '../helpers/AddHoverEffect.jsx';
import Heart0 from '../../public/QuestStatus/heart0.png';
import Heart1 from '../../public/QuestStatus/heart1.png';
import Heart2 from '../../public/QuestStatus/heart2.png';
import Heart3 from '../../public/QuestStatus/heart3.png';
import Heart4 from '../../public/QuestStatus/heart4.png';
import HeartPiece from '../../public/QuestStatus/heart-piece.png';

const heartImages = {
    heart0: Heart0,
    heart1: Heart1,
    heart2: Heart2,
    heart3: Heart3,
    heart4: Heart4
};

const HeartContainer = styled.div`
    position: relative;
    background-color: red;
    grid-column: 2/3;
    grid-row: 1/4;
    display: flex;
    justify-content: center;
    align-items: center;

    img{
        width: 180px;
        height: 180px;
        display: flex;
        z-index: 10
    }
`;

const HeartImage = styled.img`
    top: 0;
    left: 0;
`;

const QuestItemWrapper = styled.button`
    position: relative;
`;

const heartItem = {
    img: HeartPiece, 
    name: 'Pieces of Heart',
    prompts: [
        <>Four pieces form a Heart Container...</>,
        <>And a new Heart Container will extend your life energy supply. </>
    ]  
}

const imgWidth = 160;
const HeartContainerContainer = () => { //it's actually called a heart container T-T
    const { setDescription } = useContext(MenuContext);  
    const [_, setHeartPieces] = useState(0);
    const [heart, setHeart] = useState(Heart0);

    const obtainHeartPiece = () => {
        setHeartPieces((prevState) => {
            const newCount = Math.min(++prevState, 4);
            setHeart(heartImages[`heart${newCount}`]);
            return newCount;
        })        
    };

    return <HeartContainer onClick = {obtainHeartPiece}>
        <QuestItemWrapper onClick = {() => setDescription(heartItem)}>
            <AddHoverEffect>
                <HeartImage src = {heart} name = {heartItem.name} parentWidth={imgWidth} />
            </AddHoverEffect>
        </QuestItemWrapper>
    </HeartContainer>
}

export default HeartContainerContainer;