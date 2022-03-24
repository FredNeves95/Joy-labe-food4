import React from 'react';
import { goToResult } from "../routes/coordinator";

import { Grid, Typography } from '@mui/material';

export const CardRestaurant = (props) => {
    return (
        <Grid onClick={() => goToResult(props.history, props.id)} container style={{ border: 'solid 1px #b8b8b8', borderRadius: '8px', width: '328px', height: '188px', display: 'flex', marginTop: '1rem', cursor: 'pointer' }}>
            <Grid item style={{ width: '100%', borderRadius: '8px' }}>
                <img src={props.logo} alt="foto do restaurante" style={{ width: '100%', height: '120px', borderRadius: '8px 8px 0 0' }} />
            </Grid>
            <Grid item style={{ width: '100%', padding: '0 16px' }}>
                <Grid item container style={{ width: '100%' }}>
                    <Typography fontSize="16px" style={{ color: '#e86e5a' }}>
                        {props.name}
                    </Typography>
                </Grid>
                <Grid style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Typography fontSize="16px" style={{ color: '#b8b8b8' }}>
                        {props.time} min
                    </Typography>
                    <Typography fontSize="16px" style={{ color: '#b8b8b8' }}>
                        Frete R$ {props.shipping},00
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}