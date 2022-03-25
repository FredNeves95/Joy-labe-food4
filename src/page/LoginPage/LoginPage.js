import React from "react"
import axios from "axios";
import { Base_url } from "../../constants/Urls";
import logo from "../../images/logo-future-eats-invert.png"
import { LoginStyle, StyledButtonCadastro } from './styled';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { goToFeed, goToSingUp, goToAddress } from "../../routes/coordinator"


const LoginPage = () => {
    const history = useHistory()

    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false,
    });

    const body = {
        email: values.email,
        password: values.password
    }

    const login = async () => {
        try {
            const response = await axios.post(`${Base_url}/login`, body, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            localStorage.setItem("token", response.data.token)

            if (response.data.user.hasAddress === true) {
                goToFeed(history)
            } else {
                goToAddress(history)
            }
        } catch (error) {
            alert("Usuário ou senha incorretos")
            console.log(error.message)
        }
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <div>
            <LoginStyle>
                <img src={logo} alt='Logotipo Rappi4' />
                <p>Entrar</p>
                <TextField
                    onChange={handleChange("email")}
                    value={values.email}
                    fullWidth
                    className='input'
                    required
                    label="E-mail"
                    placeholder='email@email.com'
                    sx={{ m: 1, width: '328px', height: '56px' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                    }}
                />
                <TextField
                    onChange={handleChange("password")}
                    value={values.password}
                    fullWidth
                    className='input'
                    required
                    label="Senha"
                    placeholder='Mínimo 6 caracteres'
                    sx={{
                        marginBottom: 3,
                        width: '328px', height: '56px'
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>

                    }}

                    type={values.showPassword ? 'text' : 'password'}
                    margin='normal'
                />
                <button id="button--entrar" onClick={login}>Entrar</button>

                <StyledButtonCadastro onClick={() => goToSingUp(history)}>
                    <p>Não possui cadastro? Clique aqui.</p>
                </StyledButtonCadastro>

            </LoginStyle>
        </div>
    )
}

export default LoginPage
