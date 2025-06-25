import React, {useContext} from 'react';
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
import { strongTextRed } from './styles/colors.js';

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
    background-color: wheat;
    display: flex;
    flex-direction: column;    
    h1{
        margin: 0 auto;
        text-transform: uppercase;
        padding: 16px 20px;
        font-size: 50px;
    }
    &>div{        
        padding: 0 120px 60px;

        &>div{
            background-color: #0B0B0F;
            display: flex;
            flex-direction: column;
            position: relative;
        }
    }    
`;

const MaskRow = styled.div`
    display: flex;
    justify-content: space-between;              
      padding: 8px;
      button{
        background-color: unset;
        border: unset;
      }
    img{
        width: 148px;
        z-index: 200;
    }
`;

const MaskWrapper = styled.button`
    position: relative;
`;
const Mask = styled.img`
    top: 0;
    left: 0;
`;

const ArrowBar = styled.div`
    position: absolute;
    background-color: darkgoldenrod;
    width: 100px;
    height: 32px;
    top: 32px;
    left: 380px;
    z-index: 100;
    span{
        
    }
`;
const BottleBar = styled.span`
    position: absolute;
`;
const QuestBar = styled.span`
    position: absolute;
`;

const Masks = () => {
    const { setInfoBar, setToEquip, setDescription } = useContext(MenuContext);
    // const MaskWithHover = AddHoverEffect(Mask, 156, setInfoBar, setToEquip);
    return <MasksContainer>
        <h1>masks</h1>
        <div>
            {/* <div>{
                masks.map(row => {
                    return <MaskRow>{
                        row.map(mask => {
                            mask.equippable = true;
                            return <MaskWrapper onClick = {() => setDescription(mask)}>
                                 <MaskWithHover src = {mask.img} name={mask.name} />
                            </MaskWrapper>
                        })
                    }
                    </MaskRow>
                })}               
                <ArrowBar/>
                <BottleBar/>
                <QuestBar/>
            </div>             */}
        </div>
    </MasksContainer>
}

export default Masks;