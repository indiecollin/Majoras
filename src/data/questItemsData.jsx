import React from 'react';
import Strong from '../helpers/StrongText.jsx';
import Odalwa from '../../public/QuestStatus/odalwa.png';
import Goht from '../../public/QuestStatus/goht.png';
import Gyorg from '../../public/QuestStatus/gyorg.png';
import Twinmold from '../../public/QuestStatus/twinmold.png';
import GildedSword from '../../public/QuestStatus/gilded-sword.png';
import MirrorShield from '../../public/QuestStatus/mirror-shield.png';
import Quiver from '../../public/QuestStatus/quiver.png';
import BombBag from '../../public/QuestStatus/bomb-bag.png';
import Notebook from '../../public/QuestStatus/bombers-notebook.png';
import InfoBarA from '../../public/Interface/info-bar-A.png';

export const questItems = {
    bombersNotebook:{
        img: Notebook,
        name: "Bombers' Notebook",
        instructions: <><img src={InfoBarA}/>to View Notebook</>
    },
    odalwa: {
        img: Odalwa, 
        name: "Odalwa's Remains",
        short: "odalwa",
        prompts: [
            <>The remains of the boss in Woodfall Temple.</>
        ]  
    },
    goht: {
        img: Goht, 
        name: "Goht's Remains",
        short: "goht",
        prompts: [
            <>The remains of the boss in Snowhead Temple.</>
        ]  
    },
    gyorg: {
        img: Gyorg, 
        name: "Gyorg's Remains",
        short: "gyorg",
        prompts: [
            <>The remains of the boss in Great Bay Temple.</>
        ]  
    },
    twinmold: {
        img: Twinmold, 
        name: "Twinmold's Remains",
        short: "twinmold",
        prompts: [
            <>The remains of the boss in Stone Tower Temple.</>
        ]  
    },
    sword: {
        img: GildedSword, 
        name: 'Gilded Sword',
        prompts: [
            <>Forged from gold dust and the Razor Sword, it's <Strong>unbreakable</Strong>.</>
        ]  
    },
    shield: {
        img: MirrorShield, 
        name: 'Mirror Shield',
        prompts: [
            <>Used like the <Strong>Hero's Shield</Strong>, it can reflect certain rays of <Strong>light</Strong>.</>
        ]  
    },
    quiver: {
        img: Quiver, 
        name: 'Biggest Quiver',
        alternate: 'Quiver (Holds 50)',
        prompts: [
            <>This can hold up to a maximum of <Strong>50 arrows</Strong>.</>
        ]  
    },
    bombBag: {
        img: BombBag, 
        name: 'Biggest Bomb Bag',
        alternate: 'Bomb Bag (Holds 40)',
        prompts: [
            <>This can hold up to a maximum of <Strong>40 Bombs</Strong>.</>
        ]  
    }
};