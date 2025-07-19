import React from 'react';
import styled from 'styled-components';
import { magicDarkGreen, magicGreen } from './styles/colors';

const MagicContainer = styled.div`
    position: relative;
    border: 2px solid white;
    background-color: ${magicDarkGreen};
    width: 260px;
    height: 20px;
    margin-top: 2px;
    &:before{
        content: '';
        position: absolute;
        inset: 0;
        width: ${props => props.magic}%;
        height: 100%;
        background-color: ${magicGreen};
    }
`;

const Magic = (props) => {
    const {magic} = props;
    return <MagicContainer magic={magic}>

    </MagicContainer>
};

export default Magic;