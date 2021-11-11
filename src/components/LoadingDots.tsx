import React, { FC } from 'react';
import { Loading } from 'react-loading-dot';
const LoadingDots: FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Loading background={'rgb(236,253,245)'} margin={'0.5rem'} />
    </div>
  );
};

export default LoadingDots;
