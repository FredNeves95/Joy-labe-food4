import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom";
import { goToFeed } from "../routes/coordinator";
import { goToCar } from "../routes/coordinator";
import { goToProfile } from "../routes/coordinator";
import { Box } from '@mui/material';
import { orange } from '@mui/material/colors';


const Navigation = () => {
    let value = localStorage.getItem("value")
    const history = useHistory()

    return (
        <div>
            <Box sx={{ pb: 7 }}>
                <CssBaseline />
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            localStorage.setItem("value", newValue)
                        }}
                    >
                        <BottomNavigationAction onClick={() => goToFeed(history)} icon={value === "0" ? <HomeIcon sx={{ color: orange[500] }} /> : <HomeIcon />} />
                        <BottomNavigationAction onClick={() => goToCar(history)} icon={value === "1" ? <ShoppingCartIcon sx={{ color: orange[500] }} /> : <ShoppingCartIcon />} />
                        <BottomNavigationAction onClick={() => goToProfile(history)} icon={value === "2" ? <PermIdentityIcon sx={{ color: orange[500] }} /> : <PermIdentityIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box>
        </div>

    )
}

export default Navigation



