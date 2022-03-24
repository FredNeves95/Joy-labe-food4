import React, { useState } from "react";
import GlobalContext from "./GlobalContext"
import { api } from "../api";

export const GlobalState = (props) => {
    const [rest, setRest] = useState([])
    const [cartProducts, setCartProducts] = useState([])

    const states = {
        rest,
        cartProducts
    }

    const setters = {
        setRest,
        setCartProducts
    }

    const getRestaurants = async () => {
        const response = await api.get("/restaurants");

        return response.data.restaurants;
    }

    return (
        <GlobalContext.Provider value={{
            getRestaurants,
            states,
            setters,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
