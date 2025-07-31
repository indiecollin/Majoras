import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import MenuContext from '../MenuContext.jsx';
import AddHoverEffectAbsolute from '../helpers/AddHoverEffectAbsolute.jsx';
import { darkFrame, questHover } from '../styles/colors.js';
import { mod } from '../helpers/index.js';
import WhiteNote from '../../public/QuestStatus/white-note.png';
import GreenNote from '../../public/QuestStatus/green-note.png';
import RedNote from '../../public/QuestStatus/red-note.png';
import BlueNote from '../../public/QuestStatus/blue-note.png';
import OrangeNote from '../../public/QuestStatus/orange-note.png';
import PurpleNote from '../../public/QuestStatus/purple-note.png';
import Clef from '../../public/QuestStatus/clef.png';
import OcarinaA from '../../public/Interface/a.png';
import OcarinaLeft from '../../public/Interface/left.png';
import OcarinaUp from '../../public/Interface/up.png';
import OcarinaRight from '../../public/Interface/right.png';
import OcarinaDown from '../../public/Interface/down.png';
import InfoBarA from '../../public/Interface/info-bar-A.png';

import soundA from '../../public/QuestStatus/sound-a.wav';
import soundDown from '../../public/QuestStatus/sound-down.wav';
import soundRight from '../../public/QuestStatus/sound-right.wav';
import soundLeft from '../../public/QuestStatus/sound-left.wav';
import soundUp from '../../public/QuestStatus/sound-up.wav';
import soundSuccess from '../../public/QuestStatus/success.wav';
import soundError from '../../public/QuestStatus/error.wav';

const sounds = {
    soundA: new Audio(soundA),
    soundDown: new Audio(soundDown),
    soundRight: new Audio(soundRight),
    soundLeft: new Audio(soundLeft),
    soundUp: new Audio(soundUp),
    soundSuccess: new Audio(soundSuccess),
    soundError: new Audio(soundError)
}

const songNotes = {
    white: WhiteNote,
    green: GreenNote,
    red: RedNote,
    blue: BlueNote,
    orange: OrangeNote,
    purple: PurpleNote
};

const inputs = '↑←→↓A';// dirty
const ocarinaInputSettings = {
    '↑': {
        input: OcarinaUp,
        height: -20
    },
    '←': {
        input: OcarinaLeft,
        height: 5
    },
    '→': {
        input: OcarinaRight,
        height: 30
    },
    '↓': {
        input: OcarinaDown,
        height: 55
    },
    'A': {
        input: OcarinaA,
        height: 80
    }
};

const soundInputs = {
    '↑': 'soundUp',
    '←': 'soundLeft',
    '→': 'soundRight',
    '↓': 'soundDown',
    'A': 'soundA',
    [true]: 'soundSuccess',
    [false]: 'soundError'
};

const inputToRowIndex = (input) => {
    switch(input){
        case '↑': return 0;
        case '←': return 1;
        case '→': return 2;
        case '↓': return 3;
        case 'A': return 4;
    }
};

const instructions = <><img src={InfoBarA}/>to Play Melody</>

const OcarinaSongs = styled.div`
    grid-column: 1/3;
    grid-row: 4/9;
    margin: auto 0;
`;

const SongList = styled.div`    
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
`;

const SongNote = styled.button`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 20%;
    display: flex;
    margin-top: 12px;
    position: relative;
    cursor: ${props => props.disabled ? 'unset' : 'pointer'};
    padding: 0;

    img{
        margin: 0 auto;
        width: 48px;
        height: 72px;
    }
`;

const noteRowPadding = 68;//clef width + padding
const rotatorOffset = 32;

const SongMeasureContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 24px;
    &>img{
        width: 64px;
        height: 96px;
    }
`;

const SongMeasures = styled.div`
    display: flex;
    width: 100%;
`;

const SongMeasureLine = styled.span`
    display: flex;
    border-top: 2px solid ${darkFrame};
`;

const songs = [
    {name: 'Song of Time', note: 'white',  sequence: '→A↓→A↓', delays: [500,1000,500,500,1000]},
    {name: 'Song of Healing', note: 'white',  sequence: '←→↓←→↓', delays: [500,500,500,500,500]},
    {name: 'Song of Soaring', note: 'white',  sequence: '↓←↑↓←↑', delays: [300,300,400,300,300,]},
    {name: "Epona's Song", note: 'white',  sequence: '↑←→↑←→', delays: [400,400,700,400,400]},
    {name: 'Song of Storms', note: 'white',  sequence: 'A↓↑A↓↑', delays: [250,250,750,250,250]},
    {name: 'Sonata of Awakeing', note: 'green',  sequence: '↑←↑←A→A', delays: [400,400,400,700,500,900]},
    {name: "Goron's Lullaby", note: 'red',  sequence: 'A→←A→←→A', delays: [500,500,500,500,500,500,500]},
    {name: 'New Wave Bossa Nova', note: 'blue',  sequence: '←↑←→↓←→', delays: [1250,250,250,1250,250,250]},
    {name: 'Elegy of Emptiness', note: 'orange',  sequence: '→←→↓→↑←', delays: [1000,750,750,400,400,750]},
    {name: 'Oath to Order', note: 'purple',  sequence: '→↓A↓→↑', delays: [1200,700,700,700,700]}
];

const MeasureLines = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
`;

const OcarinaInput = styled.img`
    position: relative;
    width: 48px;
    height: 48px;
    background-color: ${props => props.pending && !props.wrong ? 'rgba(128, 128, 128, .75)' : props.color};
    opacity: ${props => props.show ? 1 : 0};
    transition: opacity .25s ease-in-out ${props => !props.show ? ', background-color 1s linear 1s' : ''};
    border-radius: 50%;
`;

const NotePlayer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const NoteRow = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: ${props => props.top ? props.top : '0'}px;
    width: 100%;
    left: 0;
    padding-left: ${noteRowPadding}px;
    box-sizing: border-box;

    span{
        width: 48px;
        height: 48px;
    }
`;

const NotePlayerContainer = ({noteMap, playMap, wrongNote}) => {    
    return <NotePlayer>{
        noteMap.map((row,i) => {
            const inputSetting = ocarinaInputSettings[inputs[i]];            
            return <NoteRow key={`note-row-${i}`} top={inputSetting.height}>
                {row.map((n,j) => {
                    const wrongNoteCheck = wrongNote.row === i && wrongNote.col === j;
                    const color = inputs[i] === 'A' ? 'blue' : 'yellow';
                    const show = n || wrongNoteCheck;
                    const pending = playMap[j]
                    return <OcarinaInput key={`ocarina-input-${j}`} src = {inputSetting.input} show = {show} color={color} pending={pending} wrong={wrongNoteCheck} />
                })}
            </NoteRow>
        })
    }</NotePlayer>
};

const SongMeasure = ({noteMap, playMap, wrongNote}) => {
    return <SongMeasureContainer>
        <img src = {Clef}/>
        <SongMeasures>
            <MeasureLines>{[...Array(4)].map((_,i) => <SongMeasureLine key={`measure-${i}`}/>)}</MeasureLines>
            <NotePlayerContainer noteMap={noteMap} playMap={playMap} wrongNote={wrongNote}></NotePlayerContainer>            
        </SongMeasures>
    </SongMeasureContainer>
};

const OcarinaSongsContainer = () => {
    const { curMenu, description, setInfoBar, setInstructions } = useContext(MenuContext);
    const [curSong, setCurSong] = useState();    
    const [noteMap, setNoteMap] = useState(Array.from({length: 5}, () => Array(8).fill(false)));
    const [playMap, setPlayMap] = useState(Array(8).fill(false));
    const [playMode, setPlayMode] = useState(false);
    const [playIndex, setPlayIndex] = useState();
    const [wrongNote, setWrongNote] = useState({});
    const [disabled, setDisabled] = useState(false);

    const containerRef = useRef(null); //  used to check click events on component     
    const playModeRef = useRef(playMode);// used to keep track of whether the component is in play mode in between async calls

    const setSong = (song, passedPlayMode) => {
        if(passedPlayMode) return;
        setPlayMode(true);
        setCurSong(song);
        setDisabled(true);
        setInfoBar('\u00A0');
        setInstructions();
        let newNoteMap =  Array.from({length: 5}, () => Array(8).fill(false));
        let songDelay = 0;        
        song.sequence.split('').forEach((input, seqIndex)=>{ // TODO: Abort functionality                
            setTimeout(() => { // make sure this doesn't get expensive
                if(!playModeRef.current) {
                    setDisabled(false);
                    return;
                }
                try{                
                    sounds[soundInputs[input]].load();
                    sounds[soundInputs[input]].play();
                } catch(e){
                    console.error(e.message, 'sound used before last use completed');
                }
                setNoteMap(()=>{
                    newNoteMap = newNoteMap.map((row, i)=>{                        
                        const rowInputKey = inputs[i];
                        return row.map((n, j)=>{                                                            
                            if(seqIndex !== j){// if index mismatch then keep value
                                return n;
                            }
                            else{
                                return rowInputKey === input;
                            }
                        })
                    });
                    return newNoteMap;
                });
                if(song.sequence.length-1 === seqIndex){// if it's the last note switch to play mode
                    setTimeout(() => {
                        if(!playModeRef.current) {
                            setDisabled(false);
                            return;
                        }
                        setPlayMap(Array(8).fill(true));
                        setPlayIndex(0);
                        containerRef.current.focus();
                        setDisabled(false);
                    }, 1000);
                }
            }, songDelay);
            songDelay+= song.delays[seqIndex]
        })
    };

    const resetAll = () => {
        setCurSong();
        setNoteMap(Array.from({length: 5}, () => Array(8).fill(false)));
        setPlayMap(Array(8).fill(false));
        setPlayMode(false)
        setPlayIndex();
        setWrongNote({});
    }

    const ob = (sequence) => { // i don't remember why I called this function ob. ocarina something?      
        if(playMode){
            resetAll();
        }     
        let newNoteMap =  Array.from({length: 5}, () => Array(8).fill(false));
        sequence.split('').forEach((input, seqIndex) => {        
           const noteRowIndex = inputToRowIndex(input);
           newNoteMap[noteRowIndex][seqIndex] = true;
        });
        if(JSON.stringify(newNoteMap) !== JSON.stringify(noteMap)){
            setNoteMap(newNoteMap);
        }            
    };

    const playOcarina = (e) => {// if the playMap is all false it either isn't in play mode OR it is in play mode but the song demo has not completed.
        if(!playModeRef.current || isNaN(playIndex) || disabled) return;
        let sound;
        let input;
        if(e.key === 'w'){
            input = '↑'
            sound = soundInputs[input];                            
        } else if(e.key === 'a'){
            input = '←'
            sound = soundInputs[input];                
        } else if(e.key === 'd'){
            input = '→'
            sound = soundInputs[input];                
        } else if(e.key === 's'){
            input = '↓'
            sound = soundInputs[input];                
        } else if(e.key === 'z'){
            input = 'A'
            sound = soundInputs[input];                
        } else {
            return;
        }
        try{
            sounds[sound].load();
            sounds[sound].play();
        } catch(e){
            console.error(e.message, 'sound used before last use completed');
        }
        if(input === curSong.sequence[playIndex]){
            setPlayMap(prevState => prevState.map((noteSlot, noteIndex) => noteIndex === playIndex ? false : noteSlot));
            if(playIndex + 1 < curSong.sequence.length){//more notes to play
                setPlayIndex(prevState => prevState + 1);
            }
            else{ // success sound and reset
                setDisabled(true);
                setTimeout(() => {
                    try{
                        sounds['soundSuccess'].load();
                        sounds['soundSuccess'].play();
                    } catch(e){
                        console.error(e.message, 'sound used before last use completed');
                    }                                       
                    setTimeout(() => {
                        resetAll();                        
                        setDisabled(false);
                    }, 1000);
                }, 1000);
            }
        } else { //wrong note
            try{
                sounds['soundError'].load();
                sounds['soundError'].play();
            } catch(e){
                console.error(e.message, 'sound used before last use completed');
            }
            setDisabled(true);
            setWrongNote({row: inputToRowIndex(input), col: playIndex});
            setTimeout(() => {
                setPlayMap(Array(8).fill(true));
                setPlayIndex(0);
                setWrongNote({});
                setDisabled(false)
            }, 1500);            
        }     
    }

    useEffect(() => {         
        playModeRef.current = playMode; // <-- cache current value
    }, [playMode]);

    const isActive = mod(curMenu, 4) === 2;    
    return <OcarinaSongs ref={containerRef} tabIndex={0} onKeyDown={playOcarina} onMouseLeave={resetAll}>
        <SongList>
            {songs.map((s,i)=>{
                return <AddHoverEffectAbsolute key={s.name} color={questHover} dims={'24px'}>
                    <SongNote 
                        key={s.name} 
                        onClick={() => setSong(s, playModeRef.current)} 
                        onHover={()=> ob(s.sequence)}
                        onBlur={()=>{if(!playModeRef.current) resetAll()}}                        
                        disabled={!isActive || disabled || description || curSong?.name === s.name} 
                        name={s.name}
                        instructions={instructions}            
                        parentWidth={rotatorOffset}    
                        absoluteOffset={noteRowPadding}                        
                    >
                        <img src = {songNotes[s.note]} />
                    </SongNote>
                </AddHoverEffectAbsolute>
            })}
        </SongList>
        <SongMeasure noteMap = {noteMap} playMap = {playMap} wrongNote={wrongNote}/>
    </OcarinaSongs>
}

export default OcarinaSongsContainer;