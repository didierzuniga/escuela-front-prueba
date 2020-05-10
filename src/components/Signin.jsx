import React, { useState } from 'react';
import cookie from 'js-cookie';

import Header from './Header';
import OpacityLayout from './OpacityLayout';
import '../assets/styles/Global.scss';
import '../assets/styles/Signin.scss';

const Signin = (props) => {

  const [all, setAll] = useState({
    isLoading: false,
    isLogged: false,
    unauthorized: false,
  });
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChangesForm = (e) => {
    if (all.unauthorized) {
      setAll({
        ...all,
        unauthorized: false,
      });
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignin = (event) => {
    event.preventDefault();
    setAll({
      ...all,
      isLoading: true,
    });

    fetch(`http://localhost:8000/signin/${form.username}/${form.password}`,
      {
        method: 'get',
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 401) {
          setAll({
            ...all,
            unauthorized: true,
          });
        } else {
          cookie.set('id', data.data.id);
          cookie.set('fullname', `${data.data.firstname} ${data.data.lastname}`);
          cookie.set('profile', data.data.profile);
          setAll({
            ...all,
            isLoading: false,
          });
          window.location.href = '/home';
        }
      })
      .catch((error) => {
        setAll({
          ...all,
          isLoading: false,
        });
        console.log(error);
      });
  };

  if (cookie.get('id')) {
    window.location.href = '/home';
  }

  return (
    <>
      {
        all.isLoading ?
          <OpacityLayout /> :
          <></>
      }
      <div className='Main-container'>
        <Header />
        <div className='Signin__container'>
          <div className='Signin__form'>
            <form onSubmit={handleSignin}>
              <div>
                <input name='username' type='text' className='Input' onChange={handleChangesForm} placeholder='Usuario' />
              </div>
              <div>
                <input name='password' type='password' className='Input' onChange={handleChangesForm} placeholder='Contraseña' />
              </div>
              {
                all.unauthorized ?
                  <p className='Font__warning'>No autorizado</p> :
                  <></>
              }
              <div>
                <button type='submit' className='Button__send'>Ingresar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
