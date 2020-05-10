import React from 'react';
import cookie from 'js-cookie';

import '../assets/styles/Global.scss';
import '../assets/styles/GiveRate.scss';

const GiveRate = ({ onChange, onClick, onSubmit }) => {

  return (
    <div className='GiveRate'>
      <div className='GiveRate__containt'>
        <div className='GiveRate__title'>
          <p>Calificar a {cookie.get('studentName')}</p>
        </div>
        <form className='GiveRate__form' onSubmit={onSubmit}>
          <div>
            <p>Nota de {cookie.get('moduleName')}</p>
            <input type='number' className='Input' onChange={onChange} placeholder='5.0' step='0.1' min='0' max='5' required />
          </div>
          <div>
            <button type='button' className='Button__calculate' onClick={onClick}>Cancelar</button>
            <button type='submit' className='Button__calculate'>Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveRate;
