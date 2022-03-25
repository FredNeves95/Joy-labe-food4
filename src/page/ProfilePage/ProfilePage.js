import React from "react"
import useProtectedPage from "../../hooks/useProtectedPage"
import { Header } from '../../components/Header'
import Navigation from '../../components/Navigation'
import { goToEdit, goToAddress } from "../../routes/coordinator";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Base_url } from "../../constants/Urls";
import { useState, useEffect } from 'react';
import CardHistory from "../../components/CardHistory";
import { Container, HistContainer, HistTitle, PersonalData, UserAddress } from "./styled";
import edit from '../../images/edit.svg'

const ProfilePage = () => {
  useProtectedPage()
  const [user, setUser] = useState({});
  const [hist, setHist] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getProfile()
    getHistory()

  }, [])

  const getProfile = () => {

    axios
      .get(`${Base_url}/profile`,
        {
          headers: {
            auth: localStorage.getItem('token')
          }
        })
      .then((response) => {
        setUser(response.data.user)
      })
      .catch((err) => {
        alert(err.data)
      })
  }

  const getHistory = () => {

    axios
      .get(`${Base_url}/orders/history`,
        {
          headers: {
            auth: localStorage.getItem('token')
          }
        })
      .then((response) => {
        setHist(response.data.orders)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return (
    <div>
      <Header text='Meu perfil' />
      <Container>

        <PersonalData>
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.cpf}</p>
          </div>
          <div onClick={() => goToEdit(history)}>
            <img src={edit} alt='Botão de editar usuário' />
          </div>

        </PersonalData>

        <UserAddress>
          <div>
            <p id="address-title">Endereço cadastrado</p>
            <p id="user-address">{user.address}</p>
          </div>
          <div onClick={() => goToAddress(history)}>
            <img src={edit} alt='Botão de editar endereço' />
          </div>
        </UserAddress>

        <HistTitle>
          <p>Histórico de pedidos</p>
          <hr />
        </HistTitle>
        <HistContainer>
          {
            hist ?
              hist.map((item) => {
                return (
                  <CardHistory
                    key={item.createdAt}
                    title={item.restaurantName}
                    date={item.date}
                    subtotal={item.totalPrice}
                  />
                )
              }) :
              <p>Você não realizou nenhum pedido</p>
          }
        </HistContainer>
      </Container>
      <Navigation />
    </div>



  );
}

export default ProfilePage