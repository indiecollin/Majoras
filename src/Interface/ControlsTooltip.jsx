import React from 'react';
import styled from 'styled-components';
import KeyW from '../../public/Interface/key-w.png';
import KeyA from '../../public/Interface/key-a.png';
import KeyS from '../../public/Interface/key-s.png';
import KeyD from '../../public/Interface/key-d.png';
import KeyZ from '../../public/Interface/key-z.png';
import ControlA from '../../public/Interface/a.png';
import ControlLeft from '../../public/Interface/left.png';
import ControlUp from '../../public/Interface/up.png';
import ControlRight from '../../public/Interface/right.png';
import ControlDown from '../../public/Interface/down.png';

const Tooltip = styled.div`
    position: absolute;
    top: 32px;
    left: -68px;
    background-color: #00000080;
    border-radius: 5px;
    color: #FFFFFF;
    width: 300px;
    padding: 12px;
    z-index: 2000;
    text-align: center;
`;

const LegendEntryWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 8px;
`;

const LegendEntry = styled.div`
    display: flex;
`;

const LegendInput = styled.img`
    background-color: ${props => props.color};
    border-radius: 50%;
    width: 32px;
    height: 32px;
`;

const KeyboardKey = styled.img`
    width: 32px;
    height: 32px;
`;

const ControlsTooltip = () => {
    return <Tooltip>
            <p>To equip an item or mask hover it and press a corresponding input key.</p>
            <LegendEntryWrapper><LegendEntry><LegendInput src={ControlUp} color='yellow'/><KeyboardKey src={KeyW}/></LegendEntry></LegendEntryWrapper>
            <LegendEntryWrapper>
                <LegendEntry><LegendInput src={ControlLeft} color='yellow'/><KeyboardKey src={KeyA}/></LegendEntry>
                <LegendEntry><LegendInput src={ControlDown} color='yellow'/><KeyboardKey src={KeyS}/></LegendEntry>
                <LegendEntry><LegendInput src={ControlRight} color='yellow'/><KeyboardKey src={KeyD}/></LegendEntry>
            </LegendEntryWrapper>
            <LegendEntryWrapper><LegendEntry><LegendInput src={ControlA} color='blue'/><KeyboardKey src={KeyZ}/></LegendEntry></LegendEntryWrapper>
        </Tooltip>
};

export default ControlsTooltip;