import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


import { Base_url } from '../../constants/Urls';


import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { SignUpStyle } from './styled';
import { Header } from './styled';
import axios from 'axios';
import { goToFeed } from '../../routes/coordinator';
import useProtectedPage from '../../hooks/useProtectedPage';

const AdressPage = () => {
  useProtectedPage()
  const [values, setValues] = useState({
    street: '',
    number: '',
    neighbourhood: '',
    city: '',
    state: '',
    complement: '',
  });

  const history = useHistory()

  const token = localStorage.getItem("token")


  const addAddress = () => {
    if (values.street.length !== 0 && values.number.length !== 0 && values.neighbourhood.length !== 0 && values.city.length !== 0 && values.state.length !== 0) {
      axios.put(`${Base_url}/address`, values, {
        headers: {
          "auth": token,
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          localStorage.setItem("token", res.data.token)
          alert('Endereço cadastrado com sucesso!')
          goToFeed(history)
        })
        .catch((err) => {
          console.log(err.message);
        })
    } else {
      alert("Preencha todos os campos com *")
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <SignUpStyle>
      <Header>
        <ArrowBackIosIcon className='icon' onClick={() => history.goBack()} />
      </Header>

      <h4>Meu endereço</h4>

      <TextField
        onChange={handleChange("street")}
        fullWidth
        className='input'
        required
        label="Logradouro"
        placeholder='Rua / Av.'
        id="outlined-start-adornment"
        sx={{ m: 1, width: '328px', height: '56px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />
      <TextField
        onChange={handleChange("number")}
        fullWidth
        className='input'
        required
        label="Número"
        placeholder='Número'
        id="outlined-start-adornment"
        sx={{ m: 1, width: '328px', height: '56px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />
      <TextField
        onChange={handleChange("complement")}
        fullWidth
        className='input'
        label="Complemento"
        placeholder='Apto. / Bloco'
        id="outlined-start-adornment"
        sx={{ m: 1, width: '328px', height: '56px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />

      <TextField
        onChange={handleChange("neighbourhood")}
        fullWidth
        className='input'
        required
        label="Bairro"
        placeholder='Bairro'
        id="outlined-start-adornment"
        sx={{ m: 1, width: '328px', height: '56px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />

      <TextField
        onChange={handleChange("city")}
        fullWidth
        className='input'
        required
        label="Cidade"
        placeholder='Cidade'
        id="outlined-start-adornment"
        sx={{ m: 1, width: '328px', height: '56px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />

      <TextField
        onChange={handleChange("state")}
        fullWidth
        className='input'
        required
        label="Estado"
        placeholder='Estado'
        id="outlined-start-adornment"
        sx={{ m: 1, width: '328px', height: '56px' }}
        InputProps={{
          startAdornment: <InputAdornment position="start" />,
        }}
      />
      <button id="button--criar" onClick={addAddress}>Salvar</button>
    </SignUpStyle>
  )

}

export default AdressPage