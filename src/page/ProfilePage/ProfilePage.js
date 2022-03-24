import React from "react"
import useProtectedPage from "../../hooks/useProtectedPage"
import { Header } from '../../components/Header'
import Navigation from '../../components/Navigation'
import { goToEdit } from "../../routes/coordinator";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Base_url } from "../../constants/Urls";
import { useState, useEffect } from 'react';



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

  console.log(user)

  const getHistory = () => {

    axios
      .get(`${Base_url}/orders/history`,
        {
          headers: {
            auth: localStorage.getItem('token')
          }
        })
      .then((response) => {
        console.log(response.data.orders)
      })
      .catch((err) => {
        alert(err.data)
      })
  }

  return (
    <div>

      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.cpf}</p>
      <Navigation />
    </div>



  );
}

export default ProfilePage