import * as React from 'react';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';

const override = css`
   
    display: block;
    margin: 0 auto;
`;

const Spinner = () => {
  return  <ScaleLoader
    className={override}
    sizeUnit={"px"}
    size={150}
    color={'#CEAE00'}
    />
}

export default Spinner;