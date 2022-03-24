import React, { useState, useContext, useEffect } from "react"
import GlobalStateContext from '../global/GlobalContext';
import { Button, Grid, Typography, Modal, Select, MenuItem } from "@mui/material";
import { QuantityDisplay } from './QuantityDisplay'

export const CardProduct = ({ name, image, price, description, idProduct, restaurantId, shipping, quant }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(quant);
  const [activeQuantity, setActiveQuantity] = useState(0);
  const [selected, setSelected] = useState(false)
  const { states, setters } = useContext(GlobalStateContext)
  const { cartProducts } = states
  const { setCartProducts } = setters

  const product = {
    id: idProduct,
    name: name,
    image: image,
    price: price,
    description: description,
    quantity: quantity,
    restaurantId: restaurantId,
    shipping: shipping,
  }

  useEffect(() => {
    setSelected(
      cartProducts.map((item) => {
        return item.id
      }).includes(product.id)
    )
  }, [cartProducts])


  // This function is responsible for get the quantity of the items that were already added to the cart

  useEffect(() => {
    const activeProduct = cartProducts.filter((item) => {
      if (item.id === product.id) {
        setActiveQuantity(item.quantity);
      } else {
        return false
      }
    })
  }, [cartProducts])

  const removeItemFromCart = () => {
    const newCartProducts = cartProducts.filter(product => product.id !== idProduct)
    setCartProducts(newCartProducts)
    setQuantity(0)
  }

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  }

  const handleOpenModal = () => {
    setOpen(true);
  };

  const addToCart = () => {
    setCartProducts([...cartProducts, product]);
    setOpen(false);
  }

  return (
    <Grid style={{ display: 'flex', alignItems: 'center', width: '328px', height: '125px', border: '1px solid #b8b8b8', borderRadius: '8px', marginTop: '8px', position: 'relative' }}>
      <Grid>
        <img src={image} alt={name} style={{ width: '97px', borderRadius: '8px 0 0 8px' }} />
      </Grid>

      {
        selected ?
          activeQuantity ?
            <QuantityDisplay>{activeQuantity}</QuantityDisplay> :
            <QuantityDisplay>{quantity}</QuantityDisplay> :
          <></>
      }

      <Grid style={{ marginLeft: '16px', marginTop: '10px', minWidth: '200px' }}>
        <Typography fontSize="16px" style={{ color: '#e86e5a' }}>
          {name}
        </Typography>

        <Typography fontSize="14px" style={{ color: '#b8b8b8' }}>
          {description}
        </Typography>

        <Grid style={{ display: 'flex' }}>
          <Typography fontSize="16px">
            R$ {price.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>

      {selected ? (
        <Button style={{ position: 'absolute', bottom: '0', right: '0', minWidth: '110px', border: '1px solid', borderRadius: '8px 0 8px 0', fontSize: '12px', color: '#e86e5a' }} onClick={removeItemFromCart} >
          Remover
        </Button>
      ) :
        (
          <Button style={{ position: 'absolute', bottom: '0', right: '0', minWidth: '110px', border: '1px solid', borderRadius: '8px 0 8px 0', fontSize: '12px', color: 'black' }} onClick={handleOpenModal}>
            Adicionar
          </Button>
        )}

      <Modal open={open} onClose={() => setOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid style={{ display: 'flex', flexDirection: 'column', width: '328px', height: '216px', justifyContent: 'center', alignItems: 'center', background: '#fff', padding: '2rem' }}>
          <Typography>
            Selecione a quantidade desejada
          </Typography>

          <Select fullWidth style={{ marginTop: '1rem' }} value={quantity} onChange={handleQuantity} >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>

          <Button style={{ border: 'none', marginTop: '2rem', alignSelf: 'end' }} onClick={addToCart}>
            Adicionar ao carrinho
          </Button>
        </Grid>
      </Modal>


    </Grid>
  );
}