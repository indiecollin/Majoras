import React, { useContext, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import AddHoverEffect from './helpers/AddHoverEffect.jsx';
// import AddHoverEffect from './helpers/AddHoverEffectBeta.jsx';
import MenuContext from './MenuContext.jsx';
import Strong from './helpers/StrongText.jsx';
import Ocarina from '../public/Items/ocarina-of-time.png';
import Bow from '../public/Items/heros-bow.png';
import FireArrow from '../public/Items/fire-arrow.png';
import IceArrow from '../public/Items/ice-arrow.png';
import LightArrow from '../public/Items/light-arrow.png';
import Bomb from '../public/Items/bomb.png';
import Bombchu from '../public/Items/bombchu.png';
import DekuStick from '../public/Items/deku-stick.png';
import DekuNut from '../public/Items/deku-nut.png';
import MagicBeans from '../public/Items/magic-beans.png';
import PowderKeg from '../public/Items/powder-keg.png';
import Pictograph from '../public/Items/pictograph-box.png';
import LensOfTruth from '../public/Items/lens-of-truth.png';
import Hookshot from '../public/Items/hookshot.png';
import FairySword from '../public/Items/great-fairys-sword.png';
import BottleMilk from '../public/Items/bottle1.png';
import BottleMagic  from '../public/Items/bottle2.png';
import BottleFairy from '../public/Items/bottle3.png';
import BottleFish from '../public/Items/bottle4.png';
import BottleGold from '../public/Items/bottle5.png';
import Bottle from '../public/Items/bottle6.png';
import A from '../public/Interface/promptA.png';
import B from '../public/Interface/promptB.png';
import C from '../public/Interface/promptC.png';
import Stick from '../public/Interface/promptStick.png';
import { strongTextRed } from './styles/colors.js';

const InputImage = styled.img`
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
    return <InputImage src = {src}/>
};

const items = [
    [
        {
            img: Ocarina, 
            name: 'Ocarina of Time',
            prompts: [
                <>This musical instrument is filled with memories of Princess Zelda.</>,
                <>Play it with <Input>A</Input> and the four <Input>C</Input> Buttons. Press <Input>B</Input> to stop.</>
            ]
        }, 
        {
            img: Bow,
            name: "Hero's Bow",
            prompts: [
                <>Press <Input>C</Input> to shoot an <Strong>arrow</Strong>. Use <Input>S</Input> to aim.</>
            ]
        },
        {
            img: FireArrow,
            name: "Fire Arrow",
            prompts: [
                <>Set to it to <Input>C</Input> to arm your bow with arrows that burst into flame.</>
            ]
        },
        {
            img: IceArrow,
            name: "Ice Arrow",
            prompts: [
                <>Set it to <Input>C</Input> to arm your bow with arrows that freeze.</>
            ]
        },
        {
            img: LightArrow,
            name: "Light Arrow",
            prompts: [
                <>Set it to <Input>C</Input> to arm your bow. Aim its sacred light at evil.</>
            ]
        },
        {
            img: '', 
            prompts: [<p></p>]
        }
    ],
    [
        {
            img: Bomb, 
            name: 'Bomb',
            prompts: [
                <>Light and place it with <Input>C</Input>. Press <Input>C</Input> while running to throw it!</>,            
            ]
        }, 
        {
            img: Bombchu,
            name: "Bombchu",
            prompts: [
                <> Arm and launch this wall-crawling bomb with <Input>C</Input>.</>
            ]
        },
        {
            img: DekuStick,
            name: "Deku Stick",
            prompts: [
                <>Use <Input>C</Input> to swing it. Stand still and press <Input>A</Input> to put it away.</>
            ]
        },
        {
            img: DekuNut,
            name: "Deku Nut",
            prompts: [
                <>Press <Input>C</Input> to throw it.</>,
                <>Upon impact, its flash blinds enemies, stopping them in their tracks.</>
            ]
        },
        {
            img: MagicBeans,
            name: "Magic Beans",
            prompts: [
                <>Use <Input>C</Input> to plant them. Plant them in <Strong>soft soil</Strong>.</>
            ]
        },
        {
            img: '', 
            prompts: [<p></p>]
        }
    ],
    [
        {
            img: PowderKeg, 
            name: 'Powder Keg',
            prompts: [
                <>Carry and place it with <Input>C</Input>.</>,
                <>Both its power and size are immense!</>
            ]
        }, 
        {
            img: Pictograph,
            name: "Pictograph Box",
            prompts: [
                <>Use it with <Input>C</Input> and snap pictographs with <Input>A</Input>.</>,
                <>You can keep only one shot at a time.</>
            ]
        },
        {
            img: LensOfTruth,
            name: "Lens of Truth",
            prompts: [
                <>Use <Input>C</Input> and magic to see what the naked eye cannot. </>,
                <>Press <Input>C</Input> again to stop gazing and stop using up magic.</>
            ]
        },
        {
            img: Hookshot,
            name: "Hookshot",
            prompts: [
                <>Aim with <Input>S</Input>. Press <Input>C</Input> to fire the hook and grapple objects.</>
            ]
        },
        {
            img: FairySword,
            name: "Great Fairy's Sword",
            prompts: [
                <>The <Strong>most powerful</Strong> sword has black roses etched in its blade.</>,
                <>Brandish it with <Input>C</Input>.</>
            ]
        },
        {
            img: '', 
            prompts: [<p></p>]
        }
    ],
    [
        {
            img: Bottle, 
            name: 'Empty Bottle',
            prompts: [<>Carry various items in this. Contain or release them with <Input>C</Input>.</>]
        },
        {
            img: Bottle, 
            name: 'Empty Bottle',
            prompts: [<>Carry various items in this. Contain or release them with <Input>C</Input>.</>]
        },
        {
            img: Bottle, 
            name: 'Empty Bottle',
            prompts: [<>Carry various items in this. Contain or release them with <Input>C</Input>.</>]
        },
        {
            img: Bottle, 
            name: 'Empty Bottle',
            prompts: [<>Carry various items in this. Contain or release them with <Input>C</Input>.</>]
        },
        {
            img: Bottle, 
            name: 'Empty Bottle',
            prompts: [<>Carry various items in this. Contain or release them with <Input>C</Input>.</>]
        },
        {
            img: Bottle, 
            name: 'Empty Bottle',
            prompts: [<>Carry various items in this. Contain or release them with <Input>C</Input>.</>]
        }
    ]
];

const ItemsContainer = styled.div`
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

const ItemRow = styled.div`
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
const ItemWrapper = styled.button`
    position: relative;
`;

const Item = styled.img`
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
`;
const BottleBar = styled.span`
    position: absolute;
`;
const QuestBar = styled.span`
    position: absolute;
`;

const Items = () => {
    const itemsRefs = useRef({});    
    const { setInfoBar, setToEquip, setDescription } = useContext(MenuContext);    
    const parentWidth = 156;    
    const ItemWithHover = forwardRef(AddHoverEffect);
    return <ItemsContainer>
        <h1>select item</h1>
        <div>
            <div>{
                items.map(row => {
                    return <ItemRow>{
                        row.map(item => {
                            item.equippable = true;                                          
                            return <ItemWrapper onClick = {() => setDescription(item)}>
                                <ItemWithHover ref={itemsRefs}><Item src = {item.img} name = {item.name} parentWidth={parentWidth} setInfoBar={setInfoBar} setToEquip={setToEquip}/></ItemWithHover>                                 
                            </ItemWrapper>
                        })
                    }
                    </ItemRow>
                })}
                <ArrowBar/>
                <BottleBar/>
                <QuestBar/>
            </div>            
        </div>
    </ItemsContainer>
};

export default Items;