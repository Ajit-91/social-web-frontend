import React from 'react';
import { CircularProgress } from '@mui/material';


const Loading = () => {
  return <div style={{position : "absolute", top : "50%", right : "50%"}}>
      <CircularProgress size={60} thickness={3} />
  </div>;
};

export default Loading;
