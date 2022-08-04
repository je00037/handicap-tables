import React, { FC } from 'react';
import { Loading } from 'react-loading-dot';
const LoadingDots: FC = () => {
  return (
    <div>
      <Loading
        background={'rgb(165,180,252)'}
        margin={'0.5rem'}
        size={'1.5rem'}
      />
    </div>
  );
};

export default LoadingDots;
