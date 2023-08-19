import React from 'react';

const Loading = ({ center }) => {
  return (
    <div className={`loading ${center ? 'loading-center' : ''}`}>Loading</div>
  );
};

export default Loading;
