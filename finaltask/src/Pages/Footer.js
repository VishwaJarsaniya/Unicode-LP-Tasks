import React from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Pagination, Button } from "@mui/material";
import logo from '../pics/black white Shop logo.png'

function Footer()  {

    return(
        <Grid container style={{color:'#ffffff'}}>
            <Grid item>
                <Link to="/">
                <img src={logo} style={{width:'200px', marginTop:'15%', marginLeft:'15%'}} />
                </Link>
            </Grid>
            <Grid item style={{marginLeft:'15%', cursor:'pointer'}}>
                <Typography h4 style={{fontSize:'15px', textDecoration:'underline'}}>
                    CONSUMER POLICY
                </Typography>
                <Typography style={{marginTop:'7%'}}>Terms of Use</Typography>
                <Typography>Returns & Cancellations</Typography>
                <Typography>Security</Typography>
                <Typography>Privacy</Typography>
                <Typography>Sitemap</Typography>
            </Grid>
            <Grid item style={{marginLeft:'8%', cursor:'pointer'}}>
                <Typography h4 style={{fontSize:'15px', textDecoration:'underline'}}>
                    HELP
                </Typography>
                <Typography style={{marginTop:'7%'}}>Payments</Typography>
                <Typography>Shipping</Typography>
                <Typography>FAQs</Typography>
            </Grid>
            <Grid item style={{marginLeft:'9%', cursor:'pointer'}}>
                <Typography h4 style={{fontSize:'15px', textDecoration:'underline'}}>
                    SOCIAL
                </Typography>
                <Typography style={{marginTop:'7%'}}>Facebook</Typography>
                <Typography>Instagram</Typography>
                <Typography>Twitter</Typography>
                <Typography>Youtube</Typography>
            </Grid>
            <Grid item style={{marginLeft:'10%'}}>
                <Typography style={{fontSize:'15px', textDecoration:'underline'}}>
                    REGISTERED OFFICE ADDRESS
                </Typography>
                <Typography style={{marginTop:'5%'}}>E-Shop Internet Private Limited,</Typography>
                <Typography>Building Satellite, Begonia &</Typography>
                <Typography>Clove Embassy Tech Village,</Typography>
                <Typography>Outer Ring Road,</Typography>
                <Typography>Ahmedabad, 380006,</Typography>
                <Typography>Gujarat, India</Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;