import React from 'react';
import styled from 'styled-components';
import { strongTextRed } from '../styles/colors';

const StrongText = styled.span`
    color: ${strongTextRed};
    font-weight: 700;
`;

const Strong = ({children}) => {
    return <StrongText>{children}</StrongText>
}

export default Strong;