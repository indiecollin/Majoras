import React, { useState, Fragment } from 'react';
import styled from 'styled-components';

import BackArrow from '../public/QuestStatus/BombersNotebook/back-arrow.png';
import MidDay from '../public/QuestStatus/BombersNotebook/mid-day.png';
import MedalIcon from '../public/QuestStatus/BombersNotebook/medal.png';
// import IncompleteIcon from '../public/QuestStatus/BombersNotebook/incomplete-quest-icon.png';
import Quest from '../public/QuestStatus/BombersNotebook/completed-quest-icon.png';
import Mask from '../public/QuestStatus/BombersNotebook/mask-icon.png';
import Gift from '../public/QuestStatus/BombersNotebook/ribbon-icon.png';
import { people } from './data/bombersNotebookData.jsx';

import { 
    nextPromptBlue,
    notebookBackground, 
    notebookBackgroundPattern,
    firstDawn,
    firstDusk,
    secondDawn,
    secondDusk,
    finalDawn,
    finalDusk, 
    cornerHover,
    strongTextRed,
    giftTextBlue,
    locationTextBlue,
    eventBlue

} from './styles/colors';

const CloseButton = styled.button`
    all: unset;
    position: sticky;
    grid-column: 1/2;
    z-index: 2100;
    top: 4px;
    display: flex;
    cursor: pointer;
;
    justify-content: center;
    img{
        width:66.6%;
    }
`;

const NotebookContainer = styled.div`

  --s: 80px;  /* control the size of the grid */
  --n: 4;     /* control the granularity */
  --t: 2px;   /* the thickness */
  --g: 10px;  /* the gap between dashes */
  --c:${notebookBackgroundPattern} 25%,#0000 0;
  
  background: 
    conic-gradient(at var(--g) var(--t),var(--c))
    calc((var(--s)/var(--n) - var(--g) + var(--t))/2) 0/
    calc(var(--s)/var(--n)) var(--s),
    conic-gradient(from 180deg at var(--t) var(--g),var(--c))
    0 calc((var(--s)/var(--n) - var(--g) + var(--t))/2)/
    var(--s) calc(var(--s)/var(--n));
    background-color: ${notebookBackground};    
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
`;

const NotebookGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr;
    column-gap: 8px;
    margin: 0 8%;  
`;

const DayHeader = styled.div`
    grid-column: ${props => props.columns };
    grid-row: 1;
    background-color: ${props => props.color };
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    z-index: 2100;
    opacity: .8;
    font-size: 24px;     
    font-weight: bold;
    color: white;
    letter-spacing: -3px; 
    -webkit-text-stroke: black 2px;    
    text-shadow:
        -3px -3px 4px #000,
        3px -3px 4px #000,
        -3px 3px 4px #000,
        3px 3px 4px #000;
    padding-left: 8px;
    img{
        height: 20px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const DayColumn = styled.div`
    grid-column: ${props => props.columns };
    grid-row: 2 / ${people.length + 2};
    background-color: ${props => props.color };
    z-index: 1010;
`;

const Timeline = styled.span`
    grid-column: 1 / 8;
    grid-row: ${props => `${props.i+2}/${props.i+3}`};
    position: relative;
    top: 50%;
    width: 100%;
    border-top: 2px solid black;
    z-index: 1050;
    margin-left: 32px;
`;

const Profile = styled.button`
    all: unset;
    grid-column: 1 / 2;
    grid-row: ${props => `${props.i+2}/${props.i+3}`};
    z-index: 1200;
    cursor: pointer;

    img{
        padding: 8px;    
        outline-offset: -5px;    
        mask: conic-gradient(at 20px 20px, #0000 75%, #000 0) 0 0 / calc(100% - 20px) calc(100% - 20px), conic-gradient(#000 0 0) content-box;
        &:hover{
            outline: 5px solid ${cornerHover};
        }
    }
    
`;

const Day = styled.div`
    grid-column: ${props => props.columns};
    grid-row: ${props => props.i ? `${props.i+2}/${props.i+3}` : '2/3'};
    display: flex;
    flex-direction: column;    
    height: 100%;
    z-index: 1200;
`

const EventRowsContainer = styled.div`
    position: relative;
    height: 100%;
`;

const Event = styled.button`
    background-color: ${eventBlue};
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: ${props => (props.event.start-1)/24}%;
    top: ${props => props.top};
    width: ${props => (props.event.end-props.event.start+1)/24}%;
    height: 30%;
    z-index: 1100;
    cursor: pointer;
    
    &:hover{
        img{
            outline: 2px solid ${cornerHover};
        }
    }

    span, img{
        width: 32px;
        height: 32px;
        position: absolute;
    }
`;

const EventIconWrapper = styled.span`
    img{
        padding: 2px;
        outline-offset: -2px;    
        mask: conic-gradient(at 8px 8px, #0000 75%, #000 0) 0 0 / calc(100% - 8px) calc(100% - 8px), conic-gradient(#000 0 0) content-box;
    }    
`;


const Medal = styled.div`
    grid-column: 8/9;
    grid-row: ${props => props.i ? `${props.i+2}/${props.i+3}` : '2/3'};
    display: flex;
    align-items: center;
    z-index: 1200;
    img{
        margin-left: 16px;
        height: 30%;
    }
`;

const DescriptionContainer = styled.div`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 5%;
    background: white;
    border-radius: 5px;
    z-index: 1300;
    width: 720px;
    height: 160px;    
    display: flex;
    padding: 8px 64px 24px 24px;
    img{
        width: 100px;
        height: 100px;
        margin-top: 12px;
    }
`;

const DescriptionTextWrapper = styled.div`
    display: inline;
    width: 100%;
    font-size: 24px;
    line-height: 64px;
    margin-left: 32px;
    padding: 0 8px;

    .name{        
        color: ${strongTextRed};
    }

    .short{
        display: block;
    }

    .long{

    }

    .gift{
        float: left;
        color: ${giftTextBlue};
    }

    .location{
        color: ${locationTextBlue};
        display: block;
        text-align: right;      
    }
`;

const PromptButton = styled.button`
    position: absolute;
    left: 50%;
    bottom: 5%;
    width: 32px;
    height: 32px;
    border: unset;
    padding: 0;
    cursor: pointer;
    background-color: ${nextPromptBlue};
    border-radius: 2px;
    filter: blur(2px);
    bottom: -5%;
`;

const EventRows = (props) => {
    const {events, setDescription} = props;
    return <EventRowsContainer>
        {
            events.map((event, i) => {
                const overlapsWithLastEvent = !i ? false : !(event.end < events[i-1].start || events[i-1].end < event.start);
                const overlapsWithNextEvent = i === events.length-1 ? false : !(event.end < events[i+1].start || events[i+1].end < event.start);
                let top = '35%';
                if(overlapsWithNextEvent){
                    top = '20%';
                } else if(overlapsWithLastEvent){
                    top = '50%';
                }                
                let icon;
                switch(event.type){
                    case 'quest': icon = Quest;
                    break;
                    case 'gift': icon = Gift;
                    break
                    case 'mask': icon = Mask;                    
                }
                return <Event 
                    event={event} 
                    top={top}
                    onClick={()=>setDescription({type: 'event', image: event.image, name: event.title, location: event.location, text: event.description})}
                    key={event.title}
                >
                    <EventIconWrapper>
                        <img src={icon}/>
                    </EventIconWrapper>
                </Event>
            })
        }
    </EventRowsContainer>
};

const Description = (props) => {
    const {type, image, name, location, text, setDescription} = props;
    let content;
    if(type === 'profileShort'){
         content = <>
            <span className='name short'>{name}</span>
            <span className='short'>{text}</span>
        </>
    } else if(type === 'profileLong'){
        content = <>
            <span className='name long'>{name}</span>
            <span className='long'>{text}</span>
        </>
    } else if(type === 'event'){
         content = <>
            <span className='gift'>{name}</span>
            <span className='location'>{location}</span>
            <span className='short'>{text}</span>
        </>
    }    
    return <DescriptionContainer>
        <img src={image ? image : Quest}/>
        <DescriptionTextWrapper>{content}</DescriptionTextWrapper>
        <PromptButton onClick={() => setDescription()} last/>        
    </DescriptionContainer>
}

const BombersNotebook = (props) => {
    const {setNotebookOpened} = props;
    const [description, setDescription] = useState();
    return <NotebookContainer>
            <NotebookGrid>
                <CloseButton onClick = {() => setNotebookOpened(false)}><img src={BackArrow}/></CloseButton>                
                <DayHeader columns='2/4' color={firstDusk}>1st<img src={MidDay}/></DayHeader>
                <DayHeader columns='4/6' color={secondDusk}>2nd<img src={MidDay}/></DayHeader>
                <DayHeader columns='6/8' color={finalDusk}>Final<img src={MidDay}/></DayHeader>             
                <DayColumn columns='2/3' color={firstDawn}/>
                <DayColumn columns='3/4' color={firstDusk}/>
                <DayColumn columns='4/5' color={secondDawn}/>
                <DayColumn columns='5/6' color={secondDusk}/>
                <DayColumn columns='6/7' color={finalDawn}/>
                <DayColumn columns='7/8' color={finalDusk}/>
                {people.map((p,i) => {
                 return <Fragment key={p.name}>
                    <Profile i={i} 
                        onClick={()=>setDescription({
                            type: p.type, image: p.image, name: p.name, text: p.description,
                        })}                         
                    >
                        <img src={p.image}></img>
                    </Profile>                    
                    <Day columns='2/4' i={i}>
                        <EventRows events={p.events.first} setDescription={setDescription}/>
                    </Day>
                    <Day columns='4/6' i={i}>
                        <EventRows events={p.events.second} setDescription={setDescription}/>
                    </Day>
                    <Day columns='6/8' i={i}>
                        <EventRows events={p.events.final} setDescription={setDescription}/>
                    </Day>
                    <Medal i={i}><img src={MedalIcon}/></Medal>
                    <Timeline i={i}/>
                 </Fragment>
                })}
            </NotebookGrid>
            {description && <Description {...description} setDescription={setDescription}/>}
        </NotebookContainer>
}
export default BombersNotebook;