import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import logo from '../../Assets/logo.PNG';

const NavBar = () => {
    return (<div>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#b66b58' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirectionsm: 'row' }}>

                    {/* Centered logo */}
                    <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                        <img src={logo} alt="logo" style={{ height: 100 }} />
                        <h3 style={{ color: '#fee7d4', margin: '0px' }}>Wholesale</h3>
                    </div>

                    {/* Right-side content */}
                    <div style={{marginBottom: 10, position: 'absolute', right: 15}}>
                        <Button variant="contained" sx={{backgroundColor:"#fee7d4", color:"#b66b58"}}>Login</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )};

export default NavBar;