import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 102px;
    margin: 7px 0 0;
    padding: 16px;
    border: solid 1px #b8b8b8;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    .title{
        font-family: Heebo;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        color: #E86E5A;
        margin: 0;
    }

    .subtotal{
        font-family: Heebo;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        color: #000;
        margin: 0;
    }
`

const CardHistory = (props) => {
    return (
        <Container>
            <p className='title'>{props.title}</p>
            <p className='subtotal'>SUBTOTAL R$ {props.subtotal.toFixed(2)}</p>
        </Container>
    )
}

export default CardHistory