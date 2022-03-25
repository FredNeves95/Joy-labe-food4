import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const PersonalData = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    p{
        margin: 4px 0;
        font-family: Heebo;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        color: #000;    
    }
`

export const UserAddress = styled.div`
    width: 100%;
    padding: 16px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
        margin: 4px 0;
    }

    #address-title{
        font-family: Heebo;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        color: #b8b8b8;
    }

    #user-address{
        font-family: Heebo;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        color: #000;
    }
`

export const HistTitle = styled.div`
    width: 100%;
    padding: 0 16px;
    margin: 8px 0 0 0;

    p{
        margin: 4px 0;
        font-family: Heebo;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        color: #000;
    }

    hr{
        border: solid 1px #000;
        margin: 0;
    }
`

export const HistContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
`