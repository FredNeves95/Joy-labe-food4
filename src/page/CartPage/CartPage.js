import React, { useEffect, useState, useContext } from 'react'

import { Button, Divider, Grid, Radio, Typography } from '@mui/material'
import { Header } from '../../components/Header'
import Navigation from '../../components/Navigation'
import { CardProduct } from "../../components/CardProduct"
import GlobalStateContext from '../../global/GlobalContext';
import useProtectedPage from '../../hooks/useProtectedPage'
import { api } from '../../api'

const CartPage = () => {
  useProtectedPage();

  const [profile, setProfile] = useState({})
  const [money, setMoney] = useState(true)
  const [creditCard, setCreditCard] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('money')
  const [activeOrder, setActiveOrder] = useState(false)
  const [shippingValue, setShippingValue] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const { states } = useContext(GlobalStateContext)
  const cartProducts = states.cartProducts

  // This function receives the products from cartProducts and returns the shipping value.
  // If there are more then one item from one restaurant, it will sum only once the value.
  // For example, to buy two different burgers from McDonalds you must pay the same shipping 
  // value that you should pay if you have bought only one.

  const sumShippingValue = () => {
    let value = 0;
    if (cartProducts) {
      for (let i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i + 1] && cartProducts[i].restaurantId === cartProducts[i + 1].restaurantId) {
          value = value + cartProducts[i + 1].shipping
          i++
        } else {
          value = value + cartProducts[i].shipping
        }
      }
      setShippingValue(value)
    } else {
      setShippingValue(0)
    }

  }

  // This function receives the products from cartProducts and returns the sub total value.
  // It will sum the shipping value with the product price multiplied by the quantity.

  const sumSubTotal = () => {
    if (cartProducts) {
      let productsPrice = cartProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0)
      let total = productsPrice + shippingValue
      setSubTotal(total)
    }
    else {
      setSubTotal(0)
    }
  }

  useEffect(() => {
    sumShippingValue()
  }, [cartProducts])

  useEffect(() => {
    sumSubTotal()
  }, [shippingValue, cartProducts])




  const handlePaymentMethod = (e) => {
    if (e === 'creditcard') {
      setCreditCard(true)
      setMoney(false)
      setPaymentMethod('creditcard')
    } else if (e === 'money') {
      setCreditCard(false)
      setMoney(true)
      setPaymentMethod('money')
    }
  }

  const handlePlaceOrder = async () => {
    window.event.preventDefault()

    const products = cartProducts.map((product) => {
      return { id: product.id, quantity: product.quantity }
    })

    try {
      await api.post(`/restaurants/${cartProducts[0].restaurantId}/order`, {
        paymentMethod,
        products: products,
      })
      alert('Pedido realizado com sucesso!')
      cartProducts.forEach(product => {
        product.quantity = 0
      })
      window.location.href = '/restaurantes'
    } catch (error) {
      alert("Já existe um pedido em andamento")
    }
  }

  const getActiveOrder = async () => {
    const response = await api.get('/active-order')
    try {
      setActiveOrder(response.data.order?.length > 0 ? true : false)
    } catch (error) {
      alert(error.message)
    }
  }

  const getProfile = async () => {
    const response = await api.get("/profile")
    try {
      setProfile(response.data.user)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getActiveOrder()
    getProfile()
  }, [activeOrder]);

  return (
    <Grid style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Header text="Meu carrinho" style={{ width: '100%' }} />

      <Grid style={{ background: '#eeeeee', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', height: '76px', width: '360px', padding: '1rem' }}>
        <Typography style={{ color: '#b8b8b8' }} >
          Endereço de entrega
        </Typography>
        <Typography fontSize={16} style={{ marginTop: '8px' }}>
          {profile.address}
        </Typography>
      </Grid>

      {cartProducts.length > 0 ? (
        <>
          <Grid style={{ width: '100%', marginTop: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {cartProducts.map((item, index) => (
              <CardProduct key={index} idProduct={item.id} image={item.image} name={item.name} price={item.price} description={item.description} quant={item.quantity} />
            ))}
          </Grid>

          <Grid style={{ width: '100%', padding: '1rem' }}>

            <Typography style={{ display: 'flex', justifyContent: 'flex-end' }}>
              Frete R$ {shippingValue.toFixed(2)}
            </Typography>

            <Grid style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <Typography>
                SUBTOTAL
              </Typography>
              <Typography style={{ color: '#e86e5a' }}>
                R$ {subTotal.toFixed(2)}
              </Typography>
            </Grid>

            <Grid style={{ width: '360px', marginTop: '25px' }}>
              <Typography>
                Forma de pagamento
              </Typography>
              <Divider />

              <Grid>
                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                  <Radio checked={money} value={"money"} onClick={(e) => handlePaymentMethod(e.target.value)} />
                  <Typography>
                    Dinheiro
                  </Typography>
                </Grid>

                <Grid style={{ display: 'flex', alignItems: 'center' }}>
                  <Radio checked={creditCard} value={"creditcard"} onClick={(e) => handlePaymentMethod(e.target.value)} />
                  <Typography>
                    Cartão de crédito
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Button onClick={handlePlaceOrder} style={{ background: '#e86e5a', color: 'black', width: '100%', marginTop: '19px' }}>
              Confirmar
            </Button>

          </Grid>
        </>
      ) : (
        <Grid style={{ width: '100%', height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>
            Seu carrinho está vazio :(
          </Typography>

          <Button variant='contained' style={{ background: '#e86e5a', marginTop: '0.5rem' }} onClick={
            () => {
              window.location.href = '/restaurantes'
            }
          }>
            Ir para home
          </Button>
        </Grid>
      )}

      <Navigation />
    </Grid>
  )
}

export default CartPage