import React from 'react';

import '../assets/styles/OpacityLayout.scss';
import Loader from 'react-loader-spinner';

const OpacityLayout = () => (
  <div className='OpacityLayout'>
    <Loader
      type='TailSpin'
      color='#40bad5'
      height={100}
      width={100}
    />
  </div>
);

export default OpacityLayout;
