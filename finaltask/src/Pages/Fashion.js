import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Pagination, Button, CardMedia } from "@mui/material";
import "./Homee.css";
import Navbar from './Nav';
import menFashion from '../pics/men-fashion.png';
import womenFashion from '../pics/women-fashion.png';
import pic1 from '../pics/1.png';
import pic3 from '../pics/3.png';
import pic4 from '../pics/4.png';
import both from '../pics/both.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import pic5 from '../pics/5.png';
import icondis from '../pics/icondis.png';
import quote from "../pics/quote.png";
import Footer from "./Footer";
import img from "../pics/img.png";
import Aos from "aos";
import "aos/dist/aos.css";

function Product({ product, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product);
  };}


function Fashion() {

  const [products,setProducts] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    border:'#212A3E',
    padding:'10px',
  };
  
   //Pagination
   const [currentPage , setCurrentPage ] = useState(1)
   const itemsPerPage = 15;
   const firstIndex = (currentPage - 1) * itemsPerPage;
   const lastIndex = firstIndex + itemsPerPage;
   
   const npage = Math.ceil(products.length / itemsPerPage);

   const handlePageChange =  (event ,page) => {
    setCurrentPage(page);
   }

   useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
      
      <div style={{position:'relative'}}> 

      <Card style={{ border: '8px', borderRadius:'0px', background:'#000000', marginBottom:'10px' , padding:'15px'}}>
      <Navbar />
      </Card>


    <Slider {...settings} style={{ marginTop:'30px',marginBottom:'40px', marginLeft:'3.5%'}}>
          <div>
            <img src={pic3} style={{width: '97%' , height: '570px' , borderRadius: '5px'}} />
          </div>
          <div>
            <img src={pic1} style={{width: '97%' , height: '570px', borderRadius: '5px' }} />
          </div>
          <div>
            <img src={pic4} style={{width: '97%' , height: '570px', borderRadius: '5px' }} />
          </div>
    </Slider>
 

      <Grid container spacing={2} style={{marginTop:'7%'}}>

      <Grid item xs={6} md={4} data-aos="zoom-in">
       <Link to="/summerFashion">
            <img src={both} style={{width:'450px', marginLeft:'15%', cursor:'pointer', height:'400px', border: '8px', borderRadius:'15px' ,boxShadow: '8px 8px 16px rgba(82, 109, 130, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.8)'}} />
        </Link>
      </Grid>

      <Grid item xs={6}  md={4} data-aos="zoom-in">
       <Link to="/menFashion">
          <img src={menFashion} style={{ marginLeft:'15%', cursor:'pointer', height:'400px', border: '8px', borderRadius:'15px' ,boxShadow: '8px 8px 16px rgba(82, 109, 130, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.8)'}} />
          </Link>
      </Grid>

      <Grid item xs={6}  md={4} data-aos="zoom-in">
        <Link to="/womenFashion">
          <img src={womenFashion} style={{marginLeft:'3%', cursor:'pointer', width:'430px' , height:'400px', border: '8px', borderRadius:'15px' ,boxShadow: '8px 8px 16px rgba(82, 109, 130, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.8)'}}/>
          </Link>
      </Grid>

    </Grid>

   
    <div style={{marginTop:'180px'}}>
      <img src={quote} style={{width:'50%', marginLeft:'5%'}}/>
    </div>
   

    <Card style={{position:'relative', overflow: 'visible' ,height:'450px',border: '8px', borderRadius:'0px', marginTop:'150px', marginBottom:'10px' , background:'repeating-linear-gradient(45deg, #ccc, #ccc 1px, transparent 3px, transparent 8px)'}}>
      <CardContent>
        <Grid container>
          <Grid item style={{marginLeft:'5%'}} data-aos="zoom-in">
          <img src={icondis} style={{width:'120px', marginTop:'7%'}} />
          <Typography h4 style={{fontSize:'40px', marginTop:'7%'}}>25% OFF</Typography>
          <Typography h2 style={{fontSize:'30px', marginTop:'3%', }}>On Orders Above $399</Typography>
          <Typography h2 style={{fontSize:'30px', marginTop:'13%', }}>Shop Now!!</Typography>
          </Grid>
        <Grid item >
        <img src={pic5} style={{position:'absolute', bottom: 0, right: '10px',zIndex:999, height:'600px'}} />
        </Grid>
        </Grid>
      </CardContent>
    </Card>
    <Card style={{ padding:'5px'}} data-aos="zoom-in">
      <CardContent>
        <img src={img} style={{border: '8px', borderRadius:'20px' ,marginLeft:'8%', marginTop:'10%', marginBottom:'10%', cursor:'pointer'}}/>
      </CardContent>
    </Card>
      <Card style={{ border: '8px', borderRadius:'0px', background:'#000000' , padding:'15px'}}>
        <CardContent>
          <Footer />
        </CardContent>
      </Card>
    </div>
  );
};

export default Fashion;