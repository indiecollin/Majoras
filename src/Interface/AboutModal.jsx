import React from 'react';
import styled from 'styled-components';
import XIcon from '../svgs/X.jsx';
import Collin from '../../public/Interface/collin.jpg';
import GitHub from '../../public/Interface/github.png';
import LinkedIn from '../../public/Interface/linkedin.png';

const AboutModalContainer = styled.div`
    position: absolute;    
    background-color: #00000080;
    color: #ffffff;
    border-radius: 20px;
    width: 960px;
    min-width: 0;
    max-width: 960px;
    height: 680px;    
    z-index: 2000;
`;


const AboutModalWrapper = styled.div`
    position: relative;
    padding: 20px;
    svg{
        position: absolute;
        right: 20px;
    }
    h2{
        text-align: center;
    }
`;

const About = styled.div`
    margin-bottom: 16px;
`;

const Profile = styled.div`   
    margin-bottom: 12px;
    img{
        width: 160px;
        height: 160px;        
    }
`;

const Description = styled.div`
    display: flex;    
    margin-top: 16px;
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

const AboutModal = (props) => {
    const { setShowAbout } = props;
    return <AboutModalContainer>        
        <AboutModalWrapper>
            <XIcon onClick = {() => { setShowAbout(false) }}/>
            <h2>Majora's Menu</h2>
            <About> The Majora's Menu project is an ongoing artistic endeavor by software engineer Collin Cain to recreate menus
                from his favorite childhood video games, but with a modern UI design and custom features. While developing
                this project Collin was able to connect with Hypatia, an artist with a deep love for Nintendo games like himself,
                and with her help the project was brought to life. There is no purpose for this application currently. It exists
                purely as an artistic expression. Maybe as more features are developed it will gain a purpose, but for now, please enjoy!
            </About>
            <Profile>
                <h4>Collin - Developer</h4>
                <Description>
                    <img src={Collin}></img>
                    <p> Collin is a software engineer who's been working in tech for over 10 years. In that time
                    he's mainly focused on web development originally specializing in backend data integrations
                    before switching focus to designing frontend user interfaces. Nowadays, he continues wearing many hats
                    and is always learning new technologies (usually with a video game related passion project!).
                    </p>
                </Description>
                <Socials>
                    <a href='https://github.com/indiecollin' target="_blank" rel="noopener noreferrer"><img src={GitHub}></img></a>
                    <a href='https://www.linkedin.com/in/collin-cain-5349a98a' target="_blank" rel="noopener noreferrer"><img src={LinkedIn}></img></a>
                </Socials>
            </Profile>
        </AboutModalWrapper>
    </AboutModalContainer>
}

export default AboutModal;