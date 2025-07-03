import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';
import { strongTextRed, nextPromptBlue, questItemYellow } from './styles/colors.js';

const DescriptionModalContainer = styled.div`
    position: absolute;    
    background-color: #00000080;   
    border-radius: 20px;
    width: 440px;
    min-width: 0; // 
    max-width: 440px;
`;

//used as relative parent to position some elements
const DescriptionModalWrapper = styled.div`
    position: relative;
    display: flex;
    z-index: 2000;
    &>img{
        width: 100px;
        height: 100px;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-size: 20px;

    &>p{
        color: ${props => props.equip ? strongTextRed : questItemYellow};
        font-weight: 700;    
    }
`;

const Description = styled.div`
    display: inline;
    color: white;
    align-items: center;
    font-size: 20px;
    
    img{
        margin: 0 4px;
        display: inline;
        vertical-align: text-top;
    }
    p{
        margin-left: 4px;
        margin-right: 2px;
    }
`;

const PromptButton = styled.button`
    position: absolute;
    left: 50%;
    top: 100%;
    width: 32px;
    height: 32px;
    background-color: ${nextPromptBlue};
`;

const DescriptionModal = (props) => {
    const [page, setPage] = useState(0);
    const {img, name, prompts, equip} = props.description;
    const { setDescription } = useContext(MenuContext);
    const nextPrompt = (prompts) => {
        //if last page
        if(page+1 === prompts.length){
            setDescription();
        }
        else{
            setPage(1);
        }        
    }
    return <DescriptionModalContainer>
        <DescriptionModalWrapper>
            <img src={img}/>
            <TextContainer equip={equip}>
                <p>{!page ? name : '\u00A0' }</p>
                <Description>{prompts[page]}</Description>
            </TextContainer>
            <PromptButton onClick = {() => {nextPrompt(prompts)}}/>
        </DescriptionModalWrapper>
    </DescriptionModalContainer>
}

export default DescriptionModal;