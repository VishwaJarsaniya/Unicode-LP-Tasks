import React from "react";
import { useState , useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useCart } from "./CartContext";
import Navbar from "../Pages/Nav";

function Cart() {

  const {getCartItems, removeFromCart} = useCart();
  const cartItems = getCartItems();
  console.log("Cart - " , cartItems);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      cartItems.forEach((item, index) => {
        console.log(`Item ${index}: `, item);
        console.log(`Image URL for item ${index}: `, item.images);
      });
    }
  }, [cartItems]);

    return(

        <div className="product">

        <Card style={{ border: '8px', borderRadius:'0px', background:'#000000', marginBottom:'30px' , padding:'15px'}}>
        <Navbar />
        </Card>
      
          <Card style={{ border: '8px', borderRadius:'15px', background: 'radial-gradient(circle, rgba(251,243,243,1) 0%, rgba(121,124,124,1) 98%)' , marginTop: '50px', marginBottom:'40px' ,marginLeft:'50px', marginRight:'50px', paddingLeft:'20px', paddingRight:'20px'}}>
          <CardContent>
           <Grid container spacing={3} style={{alignItems:'center', justifyContent:'center'}}>
            {Array.isArray(cartItems) && cartItems.map((item, index) => ( 

          <Card style={{ border: '8px', borderRadius:'15px', background: ' radial-gradient(circle, rgba(0,0,0,1) 42%, rgba(60,65,65,1) 100%)' , marginTop: '2%' ,marginLeft:'50px', marginRight:'50px', paddingLeft:'20px', paddingRight:'20px', width:"100%"}}>
          <CardContent>
            <Grid container>
            <Grid item xs={12} md={3}>
            <img key={index} src={item.images && item.images.length > 0 ? item.images[0] : ''} style={{ border: '2px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width:'250px' , height:'', marginTop:'3%', marginLeft:'20%'}} />
            </Grid>
            <Grid item xs={12} md={9}>
                <Typography style={{marginTop:'3%', marginLeft:'30%',fontFamily: 'Exo+2', fontSize:'20px', color:"#ffffff"}}> {item.title}</Typography>
                <Typography style={{ marginLeft:'30%', fontSize:'15px', color:"#ffffff"}}> {item.brand}</Typography>
                <Typography style={{ marginLeft:'30%', fontSize:'15px', color:"#ffffff"}}> Quantity: {item.quantity}</Typography>
                <Typography style={{ marginLeft:'30%', marginTop:'5%', fontSize:'20px', color:"#ffffff" }}> ${item.price}</Typography>
                <Button sx={{ backgroundColor:'#ffffff', color:'#000000', marginLeft:'80%'}} variant="contained" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </Grid>
            </Grid>
            </CardContent>
            </Card>
            ))}
            </Grid>
          </CardContent>
          </Card>
          </div>
      );
  }

export default Cart;