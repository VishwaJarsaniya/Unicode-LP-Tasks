import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Pagination, Button, Select, MenuItem } from "@mui/material";
import "./Homee.css";
import Navbar from './Nav';
import Footer from "./Footer";
import furniture1 from "../pics/furniture1.png";
import furniture2 from "../pics/furniture2.png";
import Aos from "aos";
import "aos/dist/aos.css";

function Product({ product, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product);
  };}


function Furniture() {

  const [products,setProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");


  const categories = [ "home-decoration",
  "furniture",];

  const fetchAllData = async () => {
    try {
      const allProducts = [];
  
      for (const category of categories) {
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        
        if (response.ok) {
          const data = await response.json();
          const categoryProducts = data.products || [];
          allProducts.push(...categoryProducts);
        } else {
          console.error(`Error fetching ${category} products. Status: ${response.status}`);
        }
      }
      const shuffledProducts = shuffleArray(allProducts);
      setProducts(shuffledProducts);
    } catch (error) {
      console.error('Error fetching data!', error);
    }
  };
  
  useEffect(() => {
    console.log('Use effect trigerred');
    fetchAllData();
    Aos.init({ duration: 1000 });
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

   const handlePriceRange = (event) => {
    setSelectedPriceRange(event.target.value);
   };

   const filteredProducts = products.filter((product) => {
    if (selectedPriceRange === "all") {
      return true;
    } 
    else if (selectedPriceRange === "low") {
      return product.price < 400;
    } 
    else if (selectedPriceRange === "medium") {
      return product.price >= 400 && product.price <= 1000;
    } 
    else if (selectedPriceRange === "high") {
      return product.price > 1000;
    }
  
    return true;
  });

  return (
      
      <div style={{position:'relative'}}> 

      <Card style={{border: '8px', borderRadius:'0px', background:'#000000', marginBottom:'30px' , padding:'15px'}}>
      <Navbar />
      </Card>

      <Card style={{borderRadius:'0px' , border:'none'}}>
        <CardContent>
            <Grid item>
              <img src={furniture1} style={{width:'900px', marginTop:'2%', marginLeft:'18%'}} />
            </Grid>
         
        </CardContent>
      </Card>

      <Card style={{ border: '8px', borderRadius:'15px', background:'#000000' ,boxShadow: '8px 8px 16px rgba(82, 109, 130, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.8)', marginTop: '5%', marginBottom:'30px' , paddingLeft:'20px', paddingRight:'20px', width:'95%', marginLeft:'2.7%'}}>
      <CardContent>
      <Grid container>
        <Grid item>
      <Select value={selectedPriceRange} onChange={handlePriceRange} style={{ marginBottom: '20px', color:'#ffffff',border:'solid 2px', borderColor:'#ffffff', width:'250px' }}>
        <MenuItem value="all">ALL PRICES</MenuItem>
        <MenuItem value="low">Low (Below $400)</MenuItem>
        <MenuItem value="medium">Medium ($400 - $1000)</MenuItem>
        <MenuItem value="high">High (Above $1000)</MenuItem>
      </Select></Grid>
      <Grid item style={{marginLeft:'18%'}}>
        <Typography variant="h4" style={{ fontFamily: "'Exo 2', sans-serif" ,textAlign: 'center', marginBottom: '20px' , color:'#ffffff'}}>
         FEATURED PRODUCTS
        </Typography>
        </Grid>
        </Grid>
         <Grid container spacing={3}>
        {filteredProducts.slice(firstIndex, lastIndex).map((product) => (
          <Grid item key={product.id} xs={12} sm={4}>  
          <Card style={{  border: '2px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(82, 109, 130, 0.5)', background:'#FFFFFF'}} data-aos="zoom-in">
            <CardContent>
            <Link to={`/product/${product.id}`}>
              <img src={product.images[0]} style={{border:'2px',borderRadius:'8px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',display:"block", margin:'auto',width:'380px' , height:'250px'}}/>
            </Link>
              <Typography style={{fontFamily: 'Work Sans', textAlign:'center', marginTop:'6px'}}> Product:  {product.title}</Typography>
              <Typography style={{textAlign:'center'}}> Brand:  {product.brand}</Typography>
              <Typography style={{textAlign:'center'}}>Price:  ${product.price}</Typography>
            </CardContent>
          </Card>
          
          </Grid>
        ))}
      </Grid>
      </CardContent>
      </Card>
      <Pagination count={npage} onChange={handlePageChange} color="secondary" style={{marginLeft:'46%'}}/>
      <Card style={{ border: '8px', borderRadius:'0px', background:'#000000' , padding:'15px'}}>
        <CardContent>
          <Footer />
        </CardContent>
      </Card>
    </div>
  );
};

export default Furniture;