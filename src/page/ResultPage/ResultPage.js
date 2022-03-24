import React, { useEffect, useState } from "react"

import { Divider, Grid, Typography } from "@mui/material"
import { Header } from "../../components/Header"
import Navigation from '../../components/Navigation'

import { api } from "../../api"

import { useLocation } from 'react-router-dom'
import useProtectedPage from "../../hooks/useProtectedPage"
import { CardRestaurantDetail } from "../../components/CardRestaurantDetail"
import { CardProduct } from "../../components/CardProduct"
import Loading from '../../images/loading.gif'

const ResultPage = () => {
  const [restaurant, setRestaurant] = useState([])
  const location = useLocation();
  const restaurantId = location.pathname.replace("/restaurantes/", "");
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const getRestaurantInfo = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/restaurants/${restaurantId}`, {
        headers: {
          auth: token,
        },
      })
      setRestaurant(response.data.restaurant);
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }

  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  useProtectedPage();

  return (
    <>
      <Grid style={{ margin: '0 auto' }}>
        <Header text="Restaurante" icon />

        <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {isLoading ? (
            <Grid style={{ height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={Loading} alt="Loading" />
            </Grid>
          ) :
            (
              <>
                <CardRestaurantDetail image={restaurant.logoUrl} name={restaurant.name} category={restaurant.category} deliveryTime={restaurant.deliveryTime} shippingValue={restaurant.shipping} address={restaurant.address} />

                <Grid style={{ width: '360px', marginTop: '1rem' }}>
                  <Typography>
                    Produtos
                  </Typography>
                  <Divider />
                </Grid>

                <Grid>
                  {restaurant?.products?.map((product) => (
                    <Grid style={{ marginTop: '1rem' }} key={product.id}>
                      <CardProduct idProduct={product.id} name={product.name} image={product.photoUrl} price={product.price} description={product.description} restaurantId={restaurantId} shipping={restaurant.shipping} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

        </Grid>

        <Navigation />

      </Grid>
    </>
  )
}

export default ResultPage