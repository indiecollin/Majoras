import React from 'react';
import styled from 'styled-components';

const MobileNoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: firebrick;
  color: #ffffff;

  @media only screen and (min-width: 501px) {
    display: none;
  }
`;

const MobileNotice = () => {
    return <MobileNoticeContainer>
      <h1>Woops! This experience won't fit on your screen.</h1>
      <p>
        Please rotate your device.
      </p>
    </MobileNoticeContainer>
}

export default MobileNotice;