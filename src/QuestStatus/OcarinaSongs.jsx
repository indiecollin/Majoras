import React, {useState, useEffect, useRef, useContext} from 'react';
import styled from 'styled-components';
import MenuContext from '../MenuContext.jsx';
import AddHoverEffectAbsolute from '../helpers/AddHoverEffectAbsolute.jsx';
import WhiteNote from '../../public/QuestStatus/white-note.png';
import GreenNote from '../../public/QuestStatus/green-note.png';
import RedNote from '../../public/QuestStatus/red-note.png';
import BlueNote from '../../public/QuestStatus/blue-note.png';
import OrangeNote from '../../public/QuestStatus/orange-note.png';
import PurpleNote from '../../public/QuestStatus/purple-note.png';
import Clef from '../../public/QuestStatus/clef.png';
import OcarinaA from '../../public/QuestStatus/a.png';
import OcarinaLeft from '../../public/QuestStatus/left.png';
import OcarinaUp from '../../public/QuestStatus/up.png';
import OcarinaRight from '../../public/QuestStatus/right.png';
import OcarinaDown from '../../public/QuestStatus/down.png';

import soundA from '../../public/QuestStatus/soundA.wav';
import soundDown from '../../public/QuestStatus/soundDown.wav';
import soundRight from '../../public/QuestStatus/soundRight.wav';
import soundLeft from '../../public/QuestStatus/soundLeft.wav';
import soundUp from '../../public/QuestStatus/soundUp.wav';
import soundSuccess from '../../public/QuestStatus/success.wav';
import soundError from '../../public/QuestStatus/error.wav';

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

const sounds = {
    '↑': soundUp,
    '←': soundLeft,
    '→': soundRight,
    '↓': soundDown,
    'A': soundA,
    [true]: soundSuccess,
    [false]: soundError
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

const OcarinaSongs = styled.div`
    background-color: lightslategray;
    grid-column: 1/3;
    grid-row: 4/9;
`;

const SongList = styled.div`    
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
`;

const SongNote = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 20%;
    display: flex;
    margin-top: 12px;
    position: relative;

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
    border-top: 2px solid #504029;
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
    transition: opacity .25s ease-in-out;    
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
            return <NoteRow top={inputSetting.height}>
                {row.map((n,j) => {
                    const wrongNoteCheck = wrongNote.row === i && wrongNote.col === j;
                    const color = inputs[i] === 'A' ? 'blue' : 'yellow';
                    const show = n || wrongNoteCheck;
                    const pending = playMap[j]
                    return <OcarinaInput src = {inputSetting.input} show = {show} color={color} pending={pending} wrong={wrongNoteCheck} />
                })}
            </NoteRow>
        })
    }</NotePlayer>
};

const SongMeasure = ({noteMap, playMap, wrongNote}) => {
    return <SongMeasureContainer>
        <img src = {Clef}/>
        <SongMeasures>
            <MeasureLines>{[...Array(4)].map(_ => <SongMeasureLine/>)}</MeasureLines>
            <NotePlayerContainer noteMap={noteMap} playMap={playMap} wrongNote={wrongNote}></NotePlayerContainer>            
        </SongMeasures>
    </SongMeasureContainer>
};

const OcarinaSongsContainer = () => {
    const [curSong, setCurSong] = useState();    
    const [noteMap, setNoteMap] = useState(Array.from({length: 5}, () => Array(8).fill(false)));
    const [playMap, setPlayMap] = useState(Array(8).fill(false));
    const [playMode, setPlayMode] = useState(false);
    const [playIndex, setPlayIndex] = useState();
    const [wrongNote, setWrongNote] = useState({});
    const playModeRef = useRef(playMode);

    const { setInfoBar } = useContext(MenuContext);
    const SongNoteWithHover = AddHoverEffectAbsolute(SongNote, rotatorOffset, noteRowPadding, setInfoBar);    

    useEffect(() => {         
        playModeRef.current = playMode; // <-- cache current value
    }, [playMode]);

    const setSong = (song, disabled) => {
        if(disabled) return;
        setPlayMode(true);  
        setCurSong(song);
        let newNoteMap =  Array.from({length: 5}, () => Array(8).fill(false));
        let songDelay = 0;
        song.sequence.split('').forEach((input, seqIndex)=>{ // TODO: Abort functionality            
            setTimeout(() => { // make sure this doesn't get expensive
                new Audio(sounds[input]).play();
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
                        setPlayMap(Array(8).fill(true));
                        setPlayIndex(0);
                    }, 1000);
                }
            }, songDelay);
            songDelay+= song.delays[seqIndex]
        })
    };
    const ob = (sequence, disabled) => { // i don't remember why I called this function ob. ocarina something?
        if(disabled) return;
        let newNoteMap =  Array.from({length: 5}, () => Array(8).fill(false));
        sequence.split('').forEach((input, seqIndex) => {        
           const noteRowIndex = inputToRowIndex(input);
           newNoteMap[noteRowIndex][seqIndex] = true;
        });
        if(JSON.stringify(newNoteMap) !== JSON.stringify(noteMap)){
            setNoteMap(newNoteMap);
        }      
    };

    const resetAll = () => {
        setCurSong();
        setNoteMap(Array.from({length: 5}, () => Array(8).fill(false)));
        setPlayMap(Array(8).fill(false));
        setPlayMode(false)
        setPlayIndex();
        setWrongNote({});
    }

    const playOcarina = (e) => {// if the playMap is all false it either isn't in play mode OR it is in play mode but the song demo has not completed.
        if(!playModeRef.current || isNaN(playIndex)) return;
        let sound;
        let input;
        if(e.key === 'ArrowUp'){
            input = '↑'
            sound = sounds[input];                            
        } else if(e.key === 'ArrowLeft'){
            input = '←'
            sound = sounds[input];                
        } else if(e.key === 'ArrowRight'){
            input = '→'
            sound = sounds[input];                
        } else if(e.key === 'ArrowDown'){
            input = '↓'
            sound = sounds[input];                
        } else if(e.key === 'a'){
            input = 'A'
            sound = sounds[input];                
        } else {
            return;
        }
        new Audio(sound).play();
        if(input === curSong.sequence[playIndex]){
            setPlayMap(prevState => prevState.map((noteSlot, noteIndex) => noteIndex === playIndex ? false : noteSlot));
            if(playIndex + 1 < curSong.sequence.length){//more notes to play
                setPlayIndex(prevState => prevState + 1);
            }
            else{ // success sound and reset
                setTimeout(() => {
                    new Audio(soundSuccess).play();
                    setTimeout(() => {
                        resetAll();
                    }, 1000);
                }, 1000);
            }
        } else { //wrong note
            new Audio(soundError).play();
            setWrongNote({row: inputToRowIndex(input), col: playIndex});
            setTimeout(() => {
                setPlayMap(Array(8).fill(true));
                setPlayIndex(0);
                setWrongNote({});
            }, 1500);            
        }     
    }

    return <OcarinaSongs tabIndex={0} onKeyDown={playOcarina} onBlur={resetAll}>
        <SongList>
            {songs.map(s=>{
                return <SongNoteWithHover key={s.name} onClick={() => setSong(s, playModeRef.current)} onHover={()=> ob(s.sequence, playModeRef.current)} disabled={playModeRef.current} name={s.name}>
                    <img src = {songNotes[s.note]} />
                </SongNoteWithHover>
            })}
        </SongList>
        <SongMeasure noteMap = {noteMap} playMap = {playMap} wrongNote={wrongNote}/>
    </OcarinaSongs>
}

export default OcarinaSongsContainer;