import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import MenuContext from '../MenuContext.jsx';
import { strongTextRed, nextPromptBlue, questItemYellow } from '../styles/colors.js';
import dialogueNext from '../../public/Interface/dialogue-next.wav';
import dialogueDone from '../../public/Interface/dialogue-done.wav';

const sounds = {
    dialogueNext: new Audio(dialogueNext),
    dialogueDone: new Audio(dialogueDone),
}

const DescriptionModalContainer = styled.div`
    position: absolute;    
    background-color: #00000080;   
    border-radius: 20px;
    width: 480px;
    min-width: 0;
    max-width: 480px;
    height: 132px;    
    z-index: 2000;
`;

//used as relative parent to position some elements
const DescriptionModalWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    min-height: 132px;   
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
    padding: 8px 20px 20px 8px;
    margin-bottom: auto;

    &>p{
        color: ${props => props.equip ? strongTextRed : questItemYellow};
        font-weight: 700;
        margin-right: auto;    
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
    border: unset;
    padding: 0;
    background-color: ${nextPromptBlue};
    border-radius: 2px;
    filter: blur(2px);
    cursor: pointer;
    ${props => !props.last ? 'clip-path: polygon(0% 0%, 0% 15%, 50% 66.6%, 100% 15%, 100% 0%);' : ''}
`;

const DescriptionModal = (props, ref) => {
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

    useEffect(() => {
        try{
            if(prompts.length === page + 1){
                sounds['dialogueDone'].load();
                sounds['dialogueDone'].play();
            }
            else{
                sounds['dialogueNext'].load();
                sounds['dialogueNext'].play();
            }
        } catch(e){
            console.error(e.message, 'sound used before last use completed');
        }
    }, [prompts, page]);
    
    return <DescriptionModalContainer ref={ref}>
        <DescriptionModalWrapper>
            <img src={img}/>
            <TextContainer equip={equip}>
                <p>{!page ? name : '\u00A0' }</p>
                <Description>{prompts[page]}</Description>
            </TextContainer>
            <PromptButton onClick = {() => {nextPrompt(prompts)}} last={prompts.length === page + 1}/>
        </DescriptionModalWrapper>
    </DescriptionModalContainer>
}

export default DescriptionModal;