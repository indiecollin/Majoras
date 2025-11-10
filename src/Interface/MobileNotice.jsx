import React from 'react';
import styled from 'styled-components';
import HappyMaskSalesman from '../../public/Interface/happy-mask-salesman.png';
import Rotate from '../../public/Interface/rotate.png';
import { background } from '../styles/colors';

const MobileNoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 30000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 120vh;
  background-color: ${background};
  color: #ffffff;
  padding: 16px;

  h1{
    text-align: center;
  }

  img{
    width: 66%;
  }

  @media only screen and (min-width: 480px) {
    display: none;
  }
`;

const RotateIcon = styled.img`
  margin-top: 12px;
  width: 100px;
  height: 100px;
`;

const MobileNotice = () => {
    return <MobileNoticeContainer>
      <h1>Please rotate your device.</h1>
      {/* <h1>Sorry! This experience won't fit on your screen.</h1>       */}
      <img src={HappyMaskSalesman}/>
      <RotateIcon src={Rotate}></RotateIcon>
    </MobileNoticeContainer>
}

export default MobileNotice;