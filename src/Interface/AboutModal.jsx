import React from 'react';
import styled from 'styled-components';
import XIcon from '../svgs/X.jsx';
import Collin from '../../public/Interface/collin.jpg';
import GitHub from '../../public/Interface/github.png';
import LinkedIn from '../../public/Interface/linkedin.png';
import Gmail from '../../public/Interface/gmail.png';
import { questItemYellow } from '../styles/colors.js';

const AboutModalContainer = styled.div`
    position: absolute;    
    background-color: #00000080;
    color: #ffffff;
    border-radius: 20px;
    width: 100%;
    min-width: 0;
    max-width: 960px;
    height: 90%;   
    z-index: 2000;
    top: 5%;
`;


const AboutModalWrapper = styled.div`
    position: relative;
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    @media only screen and (max-width: 720px){
        padding: 16px;
    }
    
    svg{
        position: absolute;
        right: 20px;
    }
    h2{
        text-align: center;
    }
`;

const About = styled.div``;

const Profile = styled.div`
    display: flex;
    margin-top: 16px;
    img{
        max-width: unset;
        width: 160px;
        height: 160px;        
    }
`;

const PicAndLinks = styled.div`
    display: flex;
    flex-direction: column;    
    img{
        margin-right: 16px;
    }
`;

const Socials = styled.div`
    display: flex;
    img{
        width: 32px;
        height: 32px;
        margin-top: 4px;
        margin-right: 4px;
    }
`;

const Credits = styled.div`
    margin-left: auto;
    margin-right: 8px;
    margin-top: auto;
    font-size: 18px;
    a{
        color: ${questItemYellow};        
        font-weight: 500;
    }
`;

const AboutModal = (props) => {
    const { setShowAbout } = props;
    return <AboutModalContainer>        
        <AboutModalWrapper>
            <XIcon onClick = {() => { setShowAbout(false) }}/>
            <h2>Majora's Menu</h2>
            <About> The Majora's Menu project is apart of an artistic endeavor by Collin Cain to recreate menus
                from his favorite childhood video games, but with a modern UI design and custom features.
            </About>
            <Profile>
                <PicAndLinks>
                    <img src={Collin}></img>
                    <Socials>
                        <a href='https://github.com/indiecollin' target="_blank" rel="noopener noreferrer"><img src={GitHub}></img></a>
                        <a href='https://www.linkedin.com/in/collin-cain-5349a98a' target="_blank" rel="noopener noreferrer"><img src={LinkedIn}></img></a>
                        <a href="mailto:collinalexcain@gmail.com"><img src={Gmail}></img></a>
                    </Socials>
                </PicAndLinks>
                <p> Collin is a software engineer who's been working in tech for over 10 years. In that time
                    he's mainly focused on web development originally specializing in backend data integrations
                    before switching focus to designing frontend user interfaces. Nowadays, he continues wearing many hats
                    and is always learning new technologies (usually with a video game related passion project!).
                </p>
            </Profile>
            <Credits>
                <p>Textures by <a href='https://onthegreatsea.tumblr.com/' target="_blank" rel="noopener noreferrer">Hypatia</a> and <a href='https://github.com/GhostlyDark' target="_blank" rel="noopener noreferrer">GhostlyDark</a></p>
            </Credits>
        </AboutModalWrapper>
    </AboutModalContainer>
}

export default AboutModal;
