import React, { useContext, useEffect, useState } from "react"
import { CardRestaurant } from '../../components/CardRestaurant';
import GlobalStateContext from '../../global/GlobalContext';
import { useHistory } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { Header } from "../../components/Header";
import { Tab } from "./styledMaterialUI";
import { Tabs } from "./styledMaterialUI";
import { CardContainer } from './styled'
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Box, TextField, Typography, Grid } from '@mui/material';
import useProtectedPage from "../../hooks/useProtectedPage";
import { api } from "../../api";
import Clock from '../../images/clock.png';

const FeedPage = () => {
  useProtectedPage()
  const [value, setValue] = useState(0);
  const [restaurantsFiltered, setRestaurantsFiltered] = useState([])
  const [text, setText] = useState('')
  const [activeOrder, setActiveOrder] = useState(false)

  const { states, setters } = useContext(GlobalStateContext)
  const { rest } = states
  const { setRest } = setters
  const history = useHistory()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getRest = () => {
    api
      .get(`/restaurants`,
        {
          headers: {
            auth: localStorage.getItem('token')
          }
        })
      .then((response) => {
        setRest(response.data.restaurants)
      })
      .catch((err) => {
        alert(err.data)
      })
  }

  const getActiveOrder = async () => {
    const response = await api.get('/active-order')
    try {
      setActiveOrder(response.data.order)
    } catch (error) {
      alert(error.message)
    }
  }


  useEffect(() => {
    getRest()
    getActiveOrder()
  }, [])

  const filterRestt = (typ) => {
    const filterR = rest.filter((restaurant) => {
      return restaurant.category === typ
    })
    setRestaurantsFiltered(filterR)
  }

  const searchRestaurants = (e) => {
    setValue(0)
    const search = e.target.value;

    const searchRestaurants = rest.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(search.toLowerCase())
    })

    if (search.length > 0 && searchRestaurants.length === 0) {
      setText('Não encontramos :(')
      setRestaurantsFiltered([])
    }
    if (search.length === 0) {
      setRestaurantsFiltered([])
      setText('')
    } else {
      setRestaurantsFiltered(searchRestaurants)
    }
  }

  const renderL = () => {
    if (restaurantsFiltered.length === 0) {
      return (
        <CardContainer>
          {text}
          {
            text === 'Não encontramos :(' ? <></> :
              rest.map((restaurants) => {
                return (
                  <CardRestaurant key={restaurants.id} logo={restaurants.logoUrl} name={restaurants.name} time={restaurants.deliveryTime} shipping={restaurants.shipping} history={history} id={restaurants.id} />
                )
              })}
        </CardContainer>
      )
    } else {
      return (
        <CardContainer>
          {
            restaurantsFiltered.map((item) => {
              return (
                <CardRestaurant key={item.id} logo={item.logoUrl} name={item.name} time={item.deliveryTime} shipping={item.shipping} history={history} id={item.id} />
              )
            })}
        </CardContainer>
      )
    }
  }



  return (
    <div>
      <div>
        <Header text="Home" />
      </div>
      <Grid style={{ display: 'flex', flexDirection: 'column', maxWidth: '360px', margin: '0 auto' }}>
        <div>
          <Box>
            <form variant="outlined">
              <TextField
                autoFocus
                name="search"
                fullWidth
                margin="normal"
                onChange={(e) => searchRestaurants(e)}
                placeholder="Restaurante"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="baseColor" />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Box>
        </div>
        <div>
          <Box sx={{ maxWidth: 480, bgcolor: 'background.paper' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              aria-label="scrollable prevent tabs example"
            >
              <Tab label="Árabe" value="Árabe" onClick={() => filterRestt("Árabe")} >Árabe</Tab>
              <Tab label="Asiática" value="Asiática" onClick={() => filterRestt("Asiática")} >Asiática</Tab>
              <Tab label="Hamburguer" value="Hamburguer" onClick={() => filterRestt("Hamburguer")} >Hamburguer</Tab>
              <Tab label="Italiana" value="Italiana" onClick={() => filterRestt("Italiana")} >Italiana</Tab>
              <Tab label="Carnes" value="Carnes" onClick={() => filterRestt("Carnes")} >Carnes</Tab>
              <Tab label="Sorvetes" value="Sorvetes" onClick={() => filterRestt("Sorvetes")} >Sorvetes</Tab>
              <Tab label="Baiana" value="Baiana" onClick={() => filterRestt("Baiana")} >Baiana</Tab>
              <Tab label="Petiscos" value="Petiscos" onClick={() => filterRestt("Petiscos")} >Petiscos</Tab>
              <Tab label="Mexicana" value="Mexicana" onClick={() => filterRestt("Mexicana")} >Mexicana</Tab>
            </Tabs>
          </Box>
        </div>
        <div>
          <div>
            {renderL()}
          </div>
          <div>
            {activeOrder ? (
              <Grid style={{ display: 'flex', padding: '1rem', height: '118px', width: '100%', background: '#e86e5a', alignItems: 'center', zIndex: '9999', position: 'fixed', bottom: '55px', left: 0, right: 0 }}>
                <Grid>
                  <img src={Clock} alt="relógio" />
                </Grid>

                <Grid style={{ marginLeft: '2rem' }}>
                  <Typography fontSize="16px" style={{ color: '#fff' }}>
                    Pedido em andamento
                  </Typography>

                  <Typography fontSize="16px" style={{}}>
                    {activeOrder.restaurantName}
                  </Typography>

                  <Typography fontSize="16px" style={{}}>
                    SUBTOTAL R$ {activeOrder.totalPrice}
                  </Typography>

                </Grid>
              </Grid>
            ) : <></>}

          </div>
        </div>
      </Grid>
      <Navigation />
    </div>

  )
}
export default FeedPage

