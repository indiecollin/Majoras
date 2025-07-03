import React, { useContext, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import AddHoverEffect from './helpers/AddHoverEffect.jsx';
import MenuContext from './MenuContext.jsx';
import Strong from './helpers/StrongText.jsx';
import PostmansHat from '../public/Masks/postman-hat.png';
import AllNight from '../public/Masks/all-night.png';
import Blast from '../public/Masks/blast.png';
import Stone from '../public/Masks/stone.png';
import GreatFairys from '../public/Masks/great-fairys.png';
import Deku from '../public/Masks/deku.png';
import Keaton from '../public/Masks/keaton.png';
import Bremen from '../public/Masks/bremen.png';
import BunnyHood from '../public/Masks/bunny-hood.png';
import DonGeros from '../public/Masks/don-geros.png';
import Scents from '../public/Masks/scents.png';
import Goron from '../public/Masks/goron.png';
import Romanis from '../public/Masks/romanis.png';
import CircusLeaders from '../public/Masks/circus-leaders.png';
import Kafei from '../public/Masks/kafei.png';
import Couples from '../public/Masks/couples.png';
import Truth from '../public/Masks/truth.png';
import Zora from '../public/Masks/zora.png';
import Kamaros from '../public/Masks/kamaros.png';
import Gibdo from '../public/Masks/gibdo.png';
import Garos from '../public/Masks/garos.png';
import CaptainsHat from '../public/Masks/captains-hat.png';
import Giants from '../public/Masks/giants.png';
import FierceDeitys from '../public/Masks/fierce-deitys.png';
import A from '../public/Interface/promptA.png';
import B from '../public/Interface/promptB.png';
import C from '../public/Interface/promptC.png';
import Stick from '../public/Interface/promptStick.png';
import { frame } from './styles/colors.js';

const PromptImage = styled.img`
    height: 22px;
    width: 22px;
`;

const Input = ({children}) => {
    let src;
    switch(children){
        case 'A':
            src = A;
            break;
        case 'B':
            src = B;
            break;
        case 'C':
            src = C;
            break;
        case 'S':
            src = Stick;
            break;
        default:
            return;
    }
    return <PromptImage src = {src}/>
};

const masks = [
    [
        {
            img: PostmansHat, 
            name: "Postman's Hat",
            prompts: [
                <>You can look in mailboxes when you wear this with <Input>C</Input>.</>                
            ]
        }, 
        {
            img: AllNight,
            name: "All Night Mask",
            prompts: [
                <>When you wear it with <Input>C</Input>, you don't get sleepy.</>
            ]
        },
        {
            img: Blast,
            name: "Blast Mask",
            prompts: [
                <> Wear it with <Input>C</Input>, then <Strong>detonate</Strong> it with <Input>B</Input>...</>,
                <> Losing hearts from the explosion is a side effect.</>
            ]
        },
        {
            img: Stone,
            name: "Stone Mask",
            prompts: [
                <>Become as plain as stone so you can blend into your surroundings.</>
            ]
        },
        {
            img: GreatFairys,
            name: "Great Fairy's Mask",
            prompts: [
                <>The mask's hair will shimmer when you're close to a Stray Fairy.</>
            ]
        },
        {
            img: Deku,
            name: "Deku Mask",
            prompts: [
                <>Wear it with <Input>C</Input> to assume Deku form. Use <Input>C</Input> to change back.</>
            ]
        }
    ],
    [
        {
            img: Keaton, 
            name: 'Keaton Mask',
            prompts: [
                <>The mask of the ghost fox, Keaton. Wear it with <Input>C</Input>.</>,            
            ]
        }, 
        {
            img: Bremen,
            name: "Bremen Mask",
            prompts: [
                <>Wear it with <Input>C</Input> so young animals will mistake you for their leader.</>
            ]
        },
        {
            img: BunnyHood,
            name: "Bunny Hood",
            prompts: [
                <>Wear it with <Input>C</Input> to be filled with the speed and hearing of the <Strong>wild</Strong>.</>
            ]
        },
        {
            img: DonGeros,
            name: "Don Gero's Mask",
            prompts: [
                <>When you wear it, you can call the Frog Choir members together.</>                
            ]
        },
        {
            img: Scents,
            name: "Mask of Scents",
            prompts: [
                <>Wear it with <Input>C</Input> to heighten your sense of smell.</>
            ]
        },
        {
            img: Goron,
            name: "Goron Mask",
            prompts: [
                <>Wear it with <Input>C</Input> to assume Goron form. Use <Input>C</Input> to change back.</>
            ]
        }
    ],
    [
        {
            img: Romanis, 
            name: "Romani's Mask",
            prompts: [
                <>Wear it with <Input>C</Input> to show you're a member of the Milk Bar, Latte.</>
            ]
        }, 
        {
            img: CircusLeaders,
            name: "Circus Leader's Mask",
            prompts: [
                <>People related to Gorman will react to this.</>                
            ]
        },
        {
            img: Kafei,
            name: "Kafei's Mask",
            prompts: [
                <>Wear it with <Input>C</Input> to inquire about Kafei's whereabouts.</>
            ]
        },
        {
            img: Couples,
            name: "Couple's Mask",
            prompts: [
                <>When you wear it with <Input>C</Input>, you can soften people's hearts.</>
            ]
        },
        {
            img: Truth,
            name: "Mask of Truths",
            prompts: [
                <>Wear it to read the thoughts of Gossip Stones and animals.</>,
            ]
        },
        {
            img: Zora,
            name: "Zora Mask",
            prompts: [
                <>Wear it with <Input>C</Input> to assume Zora form. Use <Input>C</Input> to change back.</>
            ]
        }
    ],
    [
        {
            img: Kamaros, 
            name: "Kamaro's Mask",
            prompts: [
                <>Wear this with <Input>C</Input> to perform a mysterious dance.</>
            ]
        },
        {
            img: Gibdo, 
            name: "Gibdo Mask",
            prompts: [
                <>Use it with <Input>C</Input>. Even a real Gibdo will mistake you for its own kind.</>
            ]
        },
        {
            img: Garos, 
            name: "Garo's Mask",
            prompts: [
                <>This mask can summon the hidden Garo ninjas. Wear it with <Input>C</Input>.</>
            ]
        },
        {
            img: CaptainsHat, 
            name: "Captain's Hat",
            prompts: [
                <>Wear it with <Input>C</Input> to pose as Captain Keeta.</>
            ]
        },
        {
            img: Giants, 
            name: "Giant's Mask",
            prompts: [
                <>If you wear it in a certain room, you'll grow into a giant.</>
            ]
        },
        {
            img: FierceDeitys, 
            name: "Fierce Deity's Mask",
            prompts: [
                <>Wear it with <Input>C</Input>. Its dark power can be used only in boss rooms.</>
            ]
        }
    ]
];

const MasksContainer = styled.div`    
    display: flex;
    flex-direction: column;    
    h1{
        display: flex;
        justify-content: center;        
        text-transform: uppercase;        
        font-size: 50px;
        background-color: ${frame};        
    }
    &>div{        
        display: flex;
    }    
`;

const MaskGrid = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`;

const MaskRow = styled.div`
    display: flex;
    justify-content: space-between;              
      padding: 8px;

    img{
        width: 148px;
        z-index: 200;
    }
`;

const MaskWrapper = styled.button`
    position: relative;
    background-color: unset;
    border: 1px solid transparent;
    border-radius: 5px;

    &.equipped{
        border: 1px solid black;
        &:before{
            position: absolute;
            display: block;
            content: '';
            border: 7px solid black;
            border-radius: 5px;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
         }

        &:after{
            position: absolute;
            display: block;
            content: '';
            border: 6px solid white;
            border-radius: 5px;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
        }
    } 
`;

const Mask = styled.img`
    position: relative;
    top: 0;
    left: 0;
`;

const Frame = styled.div`
    background-color: ${frame};
    width: 72px;
`;

const Base = styled.div`
    background-color: ${frame};    
    height: 36px; 
    z-index: -1;
`;

const Masks = (props) => {
    const masksRefs = useRef({});
    masksRefs.current = masks.reduce((acc, cur)=>{
        cur.forEach(mask => {
            acc[mask.name] = useRef(null);
        })
        return acc;
    },{});
    const {isEquipped} = props;
    const { setDescription } = useContext(MenuContext);
    const parentWidth = 156;
    const AddHoverEffectWithRef = forwardRef(AddHoverEffect);
    return <MasksContainer>
        <h1>masks</h1>
        <div>
            <Frame/>
            <MaskGrid>{
                masks.map(row => {
                    return <MaskRow>{
                        row.map(mask => {
                            mask.equip = true;
                            return <MaskWrapper className ={isEquipped(mask.name) ? 'equipped' : ''} onClick = {() => setDescription(mask)} disabled={!mask.name}>                                
                                <AddHoverEffectWithRef ref={masksRefs.current[mask.name]}>
                                    <Mask src = {mask.img} name={mask.name} parentWidth={parentWidth} equip/>
                                </AddHoverEffectWithRef>
                            </MaskWrapper>
                        })
                    }
                    </MaskRow>
                })}               
            </MaskGrid>
            <Frame/>          
        </div>
        <Base/>
    </MasksContainer>
}

export default Masks;