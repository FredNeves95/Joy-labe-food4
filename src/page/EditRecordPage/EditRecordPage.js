import React from "react"
import useProtectedPage from "../../hooks/useProtectedPage"
import { useState } from 'react';
import axios from 'axios';
import { Base_url } from '../../constants/Urls';

import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { SignUpStyle } from './styled';
import { Header } from './styled';

import { goToProfile } from '../../routes/coordinator';
import { useHistory } from 'react-router-dom';

const EditRecordPage = () => {
  useProtectedPage()

  const history = useHistory()
  const token = localStorage.getItem('token')

  const [values, setValues] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  const body = {
    name: values.name,
    email: values.email,
    cpf: values.cpf,
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const updateProfile = async () => {
    if (values.name.length === 0 || values.email.length === 0 || values.cpf.length === 0) {
      alert('Preencha todos os campos')
    } else {
      try {
        await axios.put(`${Base_url}/profile`, body, {
          headers: {
            "auth": token,
            "Content-Type": "application/json"
          }
        })

        alert('Perfil atualizado com sucesso!')
        goToProfile(history)

      }
      catch (err) {
        console.log(err.message);
      }
    }
  }

  return (
    <SignUpStyle>
      <Header>
        <ArrowBackIosIcon className='icon' onClick={() => history.goBack()} />
      </Header>

      <h4>Editar</h4>

      <TextField
        type='text'
        onChange={handleChange("name")}
        value={values.name}
        fullWidth
        className='input'
        required
        label="Nome"
        placeholder='Nome e sobrenome'
        id="outlined-start-adornment"
        sx={{ m: 1, width: '328px', height: '56px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />
      <TextField
        type='email'
        onChange={handleChange("email")}
        value={values.email}
        fullWidth
        className='input'
        required
        label="E-mail"
        placeholder='email@email.com'
        id="outlined-start-adornment"
        sx={{ m: 1, width: '328px', height: '56px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />
      <TextField
        type='text'
        onChange={handleChange("cpf")}
        value={values.cpf}
        fullWidth
        className='input'
        required
        label="CPF"
        placeholder='000.000.000-00'
        id="outlined-start-adornment"
        sx={{ m: 1, width: '328px', height: '56px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />

      <button id="button--criar" onClick={updateProfile}>Salvar</button>
    </SignUpStyle>
  )
}


export default EditRecordPage