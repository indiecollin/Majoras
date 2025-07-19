import React from 'react';

import Anju from '../../public/QuestStatus/BombersNotebook/anju.png';
import AnjusGrandmother from '../../public/QuestStatus/BombersNotebook/anjus-grandma.png';
import Bombers from '../../public/QuestStatus/BombersNotebook/bombers.png';
import Cremia from '../../public/QuestStatus/BombersNotebook/cremia.png';
import CuriosityShopkeep from '../../public/QuestStatus/BombersNotebook/curiosity-shopkeep.png';
import Gorman from '../../public/QuestStatus/BombersNotebook/gorman.png';
import GormanBrothers from '../../public/QuestStatus/BombersNotebook/gorman-brothers.png';
import Grog from '../../public/QuestStatus/BombersNotebook/grog.png';
import GuruGuru from '../../public/QuestStatus/BombersNotebook/guru-guru.png';
import Kafei from '../../public/QuestStatus/BombersNotebook/kafei.png';
import Kamaro from '../../public/QuestStatus/BombersNotebook/kamaro.png';
import MadameAroma from '../../public/QuestStatus/BombersNotebook/madame-aroma.png';
import MrDotour from '../../public/QuestStatus/BombersNotebook/mr-dotour.png';
import OldLady from '../../public/QuestStatus/BombersNotebook/old-lady.png';
import Postman from '../../public/QuestStatus/BombersNotebook/postman.png';
import Romani from '../../public/QuestStatus/BombersNotebook/romani.png';
import RosaSisters from '../../public/QuestStatus/BombersNotebook/rosa-sisters.png';
import Shiro from '../../public/QuestStatus/BombersNotebook/shiro.png';
import Toto from '../../public/QuestStatus/BombersNotebook/toto.png';
import Question from '../../public/QuestStatus/BombersNotebook/hand.png';

import Notebook from '../../public/QuestStatus/bombers-notebook.png';
import RoomKey from '../../public/Items/room-key.png';
import LetterToKafei from '../../public/Items/letter-to-kafei.png';
import Pendant from '../../public/Items/pendant.png';
import LetterToMama from '../../public/Items/letter-to-mama.png';
import ChateauRomani from '../../public/Items/chateau-romani.png';
import MilkBottle from '../../public/Items/bottle1.png';
import HeartPiece from '../../public/QuestStatus/heart-piece.png';

import PostmansHat from '../../public/Masks/postman-hat.png';
import BunnyHood from '../../public/Masks/bunny-hood.png';
import AllNightMask from '../../public/Masks/all-night.png';
import BlastMask from '../../public/Masks/blast.png';
import StoneMask from '../../public/Masks/stone.png';
import KeatonMask from '../../public/Masks/keaton.png';
import BremenMask from '../../public/Masks/bremen.png';
import RomanisMask from '../../public/Masks/romanis.png';
import CircusLeadersMask from '../../public/Masks/circus-leaders.png';
import KafeisMask from '../../public/Masks/kafeis.png';
import CouplesMask from '../../public/Masks/couples.png';
import KamarosMask from '../../public/Masks/kamaros.png';
import GarosMask from '../../public/Masks/garos.png';

export const people = [
    {
        name: "Bombers",//straight into description
        type: 'profileLong',
        description: ", Secret Society of Justice Helping people 24 hours a day",
        image: Bombers,
        events: {
            first: [
            {                
                title: "Secret code:",
                location: "North of town",
                description: "Code for entering Bomber's hideout",
                type: 'quest', 
                start: 1,
                end: 2400
            },
            {
                image: Notebook,
                title: "Bombers' Notebook",
                location: 'North of Town',
                description: 'Members-only schedule book',
                type: 'gift', 
                start: 1,
                end: 2400
            }
        ],
            second: [
            {                
                title: "Secret code:",
                location: "North of town",
                description: "Code for entering Bomber's hideout",
                type: 'quest', 
                start: 1,
                end: 2400
            },
            {
                image: Notebook,
                title: "Bombers' Notebook",
                location: 'North of Town',
                description: 'Members-only schedule book',
                type: 'gift', 
                start: 1,
                end: 2400
            }
        ],
            final: [
            {                
                title: "Secret code:",
                location: "North of town",
                description: "Code for entering Bomber's hideout",
                type: 'quest', 
                start: 1,
                end: 2400
            },
            {
                image: Notebook,
                title: "Bombers' Notebook",
                location: 'North of Town',
                description: 'Members-only schedule book',
                type: 'gift', 
                start: 1,
                end: 2400
            }
        ]
        },
    },
    {
        name: "Anju",//straight into description
        type: 'profileLong',
        description: ", Stock Pot Inn's innkeeper A courteous woman",
        image: Anju,
        events: {
            first: [
            {
                image: RoomKey,
                title: "Received Room Key",
                location: "Inn Lobby",
                description: "Got it by mistake. Enter at night.",
                type: 'quest', 
                start: 783,
                end: 1000
            },
            {                
                title: "Secret Night Meeting",
                location: "Inn Lobby",
                description: "Promised to meet in kitchen at 11:30",
                type: 'quest', 
                start: 850,
                end: 1383
            },
            {                
                title: "Promised to meet Kafei",
                location: "Inn Kitchen",
                description: "Promised to meet Anju's boyfriend",
                type: 'quest', 
                start: 1750,
                end:  2399
            },
            {
                image: LetterToKafei,
                title: "Received Letter to Kafei",
                location: "Inn Kitchen",
                description: "Asked to drop in postbox in morning",
                type: 'quest', 
                start: 1750,
                end:  2400
            }],
            second: [
            {
                image: Pendant,
                title: "Delivered Pendant",
                location: "Inn",
                description: "Conveyed Kafei's intentions to Anju",
                type: 'quest', 
                start: 1150,//guess
                end: 1500
            }],
            final: [
            {
                image: Pendant,
                title: "Delivered Pendant",
                location: "Inn",
                description: "Conveyed Kafei's intentions to Anju",
                type: 'quest', 
                start: 1,//guess
                end: 600
            },
            {
                image: CouplesMask,
                title: "Couple's Mask",
                location: "Inn's Employee Room",
                description: "Sign of Anju and Kafei's happiness",
                type: 'mask', 
                start: 2350,//guess
                end: 2400
            }]
        },
    },
    {
        name: "Kafei",//skips after name
        type: 'profileShort',
        description: "Strange youth seen near Laundry Pool",
        image: Kafei,
        events: {
            first: [],
            second: [
            {
                image: Pendant,
                title: "Pendant of Memories",
                location: "Backroom",
                description: "Promised to deliver it to Anju",
                type: 'mask', 
                start: 1100,//guess
                end: 1550
            }],
            final: [
            {                
                title: "Escaped from Sakon's Hideout",
                location: "Ikana",
                description: "Helped Kafei recover stolen mask",
                type: 'mask', 
                start: 1200,
                end: 1225
            },
            {
                image: CouplesMask,
                title: "Couple's Mask",
                location: "Inn's Employee Room",
                description: "Sign of Anju and Kafei's happiness",
                type: 'mask', 
                start: 2350,//guess
                end: 2400
            }]
        },
    },
    {
        name: "Man from Curiosity Shop",//straight into description
        type: 'profileLong',
        description: ", buys and sells stolen goods. Open at night only.",
        image: CuriosityShopkeep,
        events: {
            first: [],
            second: [],
            final: [{
                image: KeatonMask,
                title: "Keaton Mask",
                location: "Backroom",
                description: "Kafei and Curiosity Shop's mask",
                type: 'mask', 
                start: 800,
                end: 1599
            },
            {
                image: LetterToMama,
                title: "Letter To Mama",
                location: "Backroom",
                description: "Letter to Kafei's mom: High Priority",
                type: 'quest', 
                start: 800,
                end: 1599
            },
            {
                image: AllNightMask,
                title: "All-Night Mask",
                location: "Curiosity Shop",
                description: "Strange mask at a bargain. Valuable.",
                type: 'mask', 
                start: 1600,//guess
                end: 2400
            }]
        },
    },
    {
        name: "Old Lady from Bomb Shop",
        type: 'profileShort',
        description: "Runs town Bomb Shop. Always open.",//skips after name
        image: OldLady,
        events: {
            first: [
            {
                image: BlastMask,
                title: "Blast Mask",
                location: "North of Town",
                description: "Thanks for guarding bag from thief",
                type: 'mask', 
                start: 1800,
                end: 1825
            }
        ],
            second: [],
            final: []
        },
    },
    {
        name: "Romani",//skips after name
        type: 'profileShort',
        description: "Young girl living at ranch with sister",
        image: Romani,
        events: {
            first: [
            {                
                title: "Became ranch hand",
                location: "Romani Ranch",
                description: "Help get rid of ghosts at 2:30 a.m.",
                type: 'quest', 
                start: 1,
                end: 1200
            },
            {                
                title: 'Saved cow from "them"',
                location: "Romani Ranch",
                description: "Protected cows and Romani 'til morn",
                type: 'quest', 
                start: 2050,
                end: 2400
            },
            {
                image: MilkBottle,
                title: "Milk Bottle",
                location: "Romani Ranch",
                description: "Thanks for saving cows from ghosts",
                type: 'gift', 
                start: 2050,
                end: 2400
            }],
            second: [],
            final: []
        },
    },
    {
        name: "Cremia",//straight into description
        type: 'profileLong',
        description: ", manager of Romani Ranch Milk is her specialty",
        image: Cremia,
        events: {
            first: [],
            second: [
            {                
                title: "Protected milk delivery",
                location: "Romani Ranch",
                description: "Saved milk from bandits",
                type: 'quest', 
                start: 1200,
                end: 1450
            },
            {
                image: RomanisMask,
                title: "Romani's Mask",
                location: "Romani Ranch",
                description: "Shows Cremia considers you an adult",
                type: 'mask', 
                start: 1200,
                end: 1450
            }],
            final: []
        },
    },
    {
        name: "Mr. Dotour",
        type: 'profileShort',
        description: "Mayor of Clock Town.  V.I.P.",//skips after name
        image: MrDotour,
        events: {
            first: [
            {
                image: HeartPiece,
                title: "Dotour's Thanks",
                location: "Mayor's Residence",
                description: "Thanks for ending a looong meeting",
                type: 'gift', 
                start: 400,
                end: 1400
            }],
            second: [
                {
                image: HeartPiece,
                title: "Dotour's Thanks",
                location: "Mayor's Residence",
                description: "Thanks for ending a looong meeting",
                type: 'gift', 
                start: 400,
                end: 1400
            }],
            final: [
                {
                image: HeartPiece,
                title: "Dotour's Thanks",
                location: "Mayor's Residence",
                description: "Thanks for ending a looong meeting",
                type: 'gift', 
                start: 400,
                end: 1400
            }]
        },
    },
    {
        name: "Madame Aroma",//straight into description
        type: 'profileLong',
        description: ", the Mayor's Wife In charge of town performances",
        image: MadameAroma,
        events: {
            first: [
            {
                image: KafeisMask,
                title: "Kafei's Mask",
                location: "Mayor's Drawing Room",
                description: "Show it to help with the search",
                type: 'mask', 
                start: 400,
                end: 1400
            }],
            second: [
               {
                image: KafeisMask,
                title: "Kafei's Mask",
                location: "Mayor's Drawing Room",
                description: "Show it to help with the search",
                type: 'mask', 
                start: 400,
                end: 1400
            }],
            final: [
                {
                image: ChateauRomani,
                title: "Chateau Romani",
                location: "Milk Bar",
                description: "Thanks for delivering letter to mom",
                type: 'gift', 
                start: 1200,
                end: 2400
            }]
        },
    },
    {
        name: "Toto",//skips after name
        type: 'profileShort',
        description: "Famed manager of The Indigo-Go's",
        image: Toto,
        events: {
            first: [
            {
                image: CircusLeadersMask,
                title: "Circus Leader's Mask",
                location: "Milk Bar",
                description: "Thanks for moving Gorman with song",
                type: 'mask', 
                start: 1600,
                end: 2400
            }
        ],
            second: [
            {
                image: CircusLeadersMask,
                title: "Circus Leader's Mask",
                location: "Milk Bar",
                description: "Thanks for moving Gorman with song",
                type: 'mask', 
                start: 1600,
                end: 2400
            }],
            final: []
        },
    },
    {
        name: "Gorman",//straight into description
        type: 'profileLong',
        description: ", leader of a traveling troupe Has fine clothes, but a frightful face",
        image: Gorman,
        events: {
            first: [
            {
                image: CircusLeadersMask,
                title: "Circus Leader's Mask",
                location: "Milk Bar",
                description: "Thanks for moving Gorman with song",
                type: 'mask', 
                start: 1600,
                end: 2400
            }
        ],
            second: [
            {
                image: CircusLeadersMask,
                title: "Circus Leader's Mask",
                location: "Milk Bar",
                description: "Thanks for moving Gorman with song",
                type: 'mask', 
                start: 1600,
                end: 2400
            }],
            final: []
        },
    },
    {
        name: "Postman",//straight into description
        type: 'profileLong',
        description: ", town's postal carrier A very serious public servant",
        image: Postman,
        events: {
            first: [
            {
                image: HeartPiece,
                title: "Training Award",
                location: "Post Office",
                description: "Prize for getting time exactly right",
                type: 'gift', 
                start: 900,
                end: 1800
            },
            {
                image: LetterToKafei,
                title: "Deposit Letter to Kafei",
                location: "Postbox",
                description: "Deposited letter for delivery",
                type: 'quest', 
                start: 1801,
                end: 2400
            }],
            second: [{
                image: LetterToKafei,
                title: "Deposit Letter to Kafei",
                location: "Postbox",
                description: "Deposited letter for delivery",
                type: 'quest', 
                start: 1,
                end: 600
            },
            {
                image: HeartPiece,
                title: "Training Award",
                location: "Post Office",
                description: "Prize for getting time exactly right",
                type: 'gift', 
                start: 900,
                end: 1800
            }],
            final: [
            {
                image: PostmansHat,
                title: "Postman's Hat",
                location: "Town: Near Milk Bar",
                description: "Thanks for enabling him to flee",
                type: 'mask', 
                start: 1801,
                end: 2400
            }]
        },
    },
    {
        name: "Rosa Sisters", //straight into description
        type: 'profileLong',
        description: ", twin dancers Members of the Gorman Troupe",
        image: RosaSisters,
        events: {
            first: [
            {
                image: HeartPiece,
                title: "Rosa sisters' thanks",
                location: "West of Town",
                description: "Thanks for teaching the dance",
                type: 'gift', 
                start: 1201,
                end: 2400
            }
            ],
            second: [
            {
                image: HeartPiece,
                title: "Rosa sisters' thanks",
                location: "West of Town",
                description: "Thanks for teaching the dance",
                type: 'gift', 
                start: 1201,
                end: 2400
            }],
            final: []
        },
    },
    {
        name: "???",//straight into description
        type: 'profileLong',
        description: "(Person living in the inn's restroom) Details are unknown.",
        image: Question,
        events: {
            first: [
            {
                image: HeartPiece,
                title: "Thanks for the paper",
                location: "Inn Restrom",
                description: "Thanks for helping person in toilet",
                type: 'gift', 
                start: 1801,
                end: 2400
            }],
            second: [
            {
                image: HeartPiece,
                title: "Thanks for the paper",
                location: "Inn Restrom",
                description: "Thanks for helping person in toilet",
                type: 'gift', 
                start: 1801,
                end: 2400
            }],
            final: [
            {
                image: HeartPiece,
                title: "Thanks for the paper",
                location: "Inn Restrom",
                description: "Thanks for helping person in toilet",
                type: 'gift', 
                start: 1801,
                end: 2400
            }]
        },
    },
    {
        name: "Anju's Grandmother",
        type: 'profileShort',
        description: "Storyteller and grandmother at inn",//skips after name
        image: AnjusGrandmother,
        events: {
            first: [
            {
                image: HeartPiece,
                title: "Reading Prize 1",
                location: "Inn Study",
                description: "Prize for not sleeping through story",
                type: 'gift', 
                start: 201,
                end: 1200
            },
            {
                image: HeartPiece,
                title: "Reading Prize 2",
                location: "Inn Study",
                description: "Prize for not sleeping through story",
                type: 'gift',
                start: 201,
                end: 1200
            }],
            second: [
            {
                image: HeartPiece,
                title: "Reading Prize 1",
                location: "Inn Study",
                description: "Prize for not sleeping through story",
                type: 'gift',
                start: 201,
                end: 1200
            },
            {
                image: HeartPiece,
                title: "Reading Prize 2",
                location: "Inn Study",
                description: "Prize for not sleeping through story",
                type: 'gift',
                start: 201,
                end: 1200
            }],
            final: []
        },
    },
    {
        name: "Kamaro",//straight into description
        type: 'profileLong',
        description: ", ghost of a charismatic dancer. Enjoys moonlight.",
        image: Kamaro,
        events: {
            first: [
            {
                image: KamarosMask,
                title: "Kamaro's Mask",
                location: "Termina Field",
                description: "Sign of taking over for ghost dancer",
                type: 'mask', 
                start: 1801,
                end: 2400
            }],
            second: [{
                image: KamarosMask,
                title: "Kamaro's Mask",
                location: "Termina Field",
                description: "Sign of taking over for ghost dancer",
                type: 'mask', 
                start: 1801,
                end: 2400
            }],
            final: [
            {
                image: KamarosMask,
                title: "Kamaro's Mask",
                location: "Termina Field",
                description: "Sign of taking over for ghost dancer",
                type: 'mask', 
                start: 1801,
                end: 2400
            }]
        },
    },
    {
        name: "Grog",//straight into description
        type: 'profileLong',
        description: ", Cucco Shack's breeder His crest is frightful.",
        image: Grog,
        events: {
            first: [
            {
                image: BunnyHood,
                title: "Bunny Hood",
                location: "Cucco Shack",
                description: "Thanks for turning chicks into cuccos",
                type: 'mask', 
                start: 1,//guess
                end: 1400
            }],
            second: [
            {
                image: BunnyHood,
                title: "Bunny Hood",
                location: "Cucco Shack",
                description: "Thanks for turning chicks into cuccos",
                type: 'mask', 
                start: 1,//guess
                end: 1400
            }],
            final: [
            {
                image: BunnyHood,
                title: "Bunny Hood",
                location: "Cucco Shack",
                description: "Thanks for turning chicks into cuccos",
                type: 'mask', 
                start: 1,//guess
                end: 1400
            }]
        },
    },
    {
        name: "Gorman Brothers",
        type: 'profileShort',
        description: "Horse trainers. Suspicious...",//skips after name
        image: GormanBrothers,
        events: {
            first: [
            {
                image: GarosMask,
                title: "Garo's Mask",
                location: "Gorman Track",
                description: "Prize for winning Gorman horserace",
                type: 'mask', 
                start: 1,
                end: 1200
            }],
            second: [
            {
                image: GarosMask,
                title: "Garo's Mask",
                location: "Gorman Track",
                description: "Prize for winning Gorman horserace",
                type: 'mask', 
                start: 1,
                end: 1200
            },
            {                
                title: "Protected milk delivery",
                location: "Romani Ranch",
                description: "Saved milk from bandits",
                type: 'quest', 
                start: 1201,
                end: 1450
            }],
            final: [
            {
                image: GarosMask,
                title: "Garo's Mask",
                location: "Gorman Track",
                description: "Prize for winning Gorman horserace",
                type: 'mask', 
                start: 1,
                end: 1200
            }]
        },
    },
    {
        name: "Shiro",//straight into description
        type: 'profileLong',
        description: ", the inconspicuous soldier He really doesn't stand out",
        image: Shiro,
        events: {
            first: [
            {
                image: StoneMask,
                title: "Stone Mask",
                location: "Road to Ikana",
                description: "Thanks for giving strength to a soldier",
                type: 'mask', 
                start: 1,
                end: 2400
            }],
            second: [
            {
                image: StoneMask,
                title: "Stone Mask",
                location: "Road to Ikana",
                description: "Thanks for giving strength to a soldier",
                type: 'mask', 
                start: 1,
                end: 2400
            }],
            final: [
            {
                image: StoneMask,
                title: "Stone Mask",
                location: "Road to Ikana",
                description: "Thanks for giving strength to a soldier",
                type: 'mask', 
                start: 1,
                end: 2400
            }]
        },
    },
    {
        name: "Guru-Guru",//skips after name
        type: 'profileShort',
        description: "Musician in the Gorman Troupe",
        image: GuruGuru,
        events: {
            first: [
            {
                image: BremenMask,
                title: "Bremen Mask",
                location: "Town Laundry Pool",
                description: "Thanks for hearing confession",
                type: 'mask', 
                start: 1201,
                end: 2400
            }
        ],
            second: [
            {
                image: BremenMask,
                title: "Bremen Mask",
                location: "Town Laundry Pool",
                description: "Thanks for hearing confession",
                type: 'mask', 
                start: 1201,
                end: 2400
            }],
            final: []
        },
    }
];