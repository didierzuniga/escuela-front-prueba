import React from 'react';
import cookie from 'js-cookie';

import BackIcon from '../assets/images/back.png';
import SwitchIcon from '../assets/images/signout.png';
import '../assets/styles/Global.scss';
import '../assets/styles/Header.scss';

const Header = ({ backButton, signoutButton }) => {

  return (
    <div className='Main-header Header'>
      <div>
        <p>Escuela</p>
      </div>
      <div>

        {
          cookie.get('id') ?
            (
              <p className='Header__usernamescreen'>
                {cookie.get('fullname')}
              </p>
            ) : <></>
        }
        {
          cookie.get('id') ?
            (
              <div className='Header__icon-group'>
                <img src={BackIcon} alt='Inicio' title='Inicio' onClick={backButton} />
              </div>
            ) : <></>
        }
        {
          cookie.get('id') ?
            (
              <div className='Header__icon-group'>
                <img src={SwitchIcon} alt='Salir' title='Salir' onClick={signoutButton} />
              </div>
            ) : <></>
        }
      </div>
    </div>
  );
};

export default Header;
