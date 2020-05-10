/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const loadData = (payload) => ({
  type: 'LOAD_DATA',
  payload,
});

export const signOut = (payload) => ({
  type: 'SIGN_OUT',
  payload,
});

export const requestCreateUser = (payload) => ({
  type: 'REQUEST_CREATE_USER',
  payload,
});

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const createUser = (payload, redirectUrl) => {
  // Este ACTION originalmente es para hacer signup de usuario, pero en este caso voy a usarlo para crear perfiles
  // Se hace la peticio de creacion al API y la respuesta la enviamos al ACTION
  return (dispatch) => {
    axios.post('/users/create', payload)
      .then(({ data }) => dispatch(requestCreateUser(data)))
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => dispatch(setError(error)));
  };
};
