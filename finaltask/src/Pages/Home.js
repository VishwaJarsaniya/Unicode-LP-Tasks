import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Pagination, Button, Select, MenuItem} from "@mui/material";
import "./Homee.css";
import Navbar from './Nav';
import { Helmet } from "react-helmet";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import makeup from '../pics/makeup.png';
import jeans from '../pics/jeans.png';
import furniture from '../pics/furniture.png';
import fashion from '../pics/fashion.png';
import groceries from '../pics/grocerries.png';
import sale from '../pics/salebanner.png';
import skincare from '../pics/skincare.png';
import smartphone from '../pics/smartphones.png';
import sneaker from '../pics/sneaker.png';
import watches from '../pics/watches.png';
import TextField from '@mui/material/TextField';
import Footer from "./Footer";
import useMediaQuery from '@mui/material/useMediaQuery';
import Aos from "aos";
import "aos/dist/aos.css";

function Home() {

  const [products,setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const isLargeScreen = useMediaQuery('(min-width:900px)'); 
  const isNotLargeScreen = useMediaQuery('(max-width:900px');

  const location=useLocation();
  const navigate=useNavigate();

  const searchQuery = new URLSearchParams(location.search).get('query');

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2200,
    slidesToShow: 1,
    slidesToScroll: 1,
    border:'#212A3E',
    padding:'10px',
  };


  const fetchAllData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products`);
      const data = await response.json();
      console.log(data);

      const allProducts = data.products || [];
      setProducts(allProducts);
    } catch(error)
    {
      console.trace('Error fetching data!' , error);
    }
  };

  const handleSearch = (searchTerm) => {
    console.log("Search!");
    setSearchTerm(searchTerm);

    // Filter products based on the search term
    const results = products.filter((product) =>
    product && product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchedProducts(results);
  };

  useEffect(() => {
      fetchAllData();
      Aos.init({ duration: 1000 });
  }, [searchQuery]);


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
    <div className="Home">
      <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Titan+One&display=swap" rel="stylesheet" />
      </Helmet>
      
      <div style={{position:'relative'}}> 

      <Card style={{ border: '8px', borderRadius:'0px', background:'#000000', marginBottom:'30px' , padding:'15px'}}>
      <Navbar onSearch={handleSearch} />
      </Card>

      {isLargeScreen && 
      <Card style={{ border: '8px', borderRadius:'0px', background:'#000000', marginTop: '20px', marginBottom:'30px' , paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px'}}>
      <Button style={{marginLeft:'20%'}}> <Link to={"/"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px', backgroundColor: '#333', padding:'7px', width:'70px'}}> All  </Link></Button>
        <Button style={{marginLeft:'5%'}}> <Link to={"/fashion"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px'}}>  Fashion  </Link></Button>
        <Button style={{marginLeft:'5%'}}> <Link to={"/furniture"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px'}}>  Furniture  </Link></Button>
        <Button style={{marginLeft:'5%'}}> <Link to={"/elec"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px'}}>  Electronics  </Link></Button>
        <Button style={{marginLeft:'5%'}}> <Link to={"/grocery"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px'}}>  Grocery  </Link></Button>
      </Card>
      }

      {isNotLargeScreen && 
       <Card style={{display:'flex', flexDirection:'column', border: '8px', borderRadius:'0px', background:'#000000', marginTop: '20px', marginBottom:'30px' , paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px'}}>
       <Button style={{marginTop:'1%'}}> <Link to={"/"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px', backgroundColor: '#333', padding:'7px', width:'70px'}}> All  </Link></Button>
         <Button style={{marginTop:'1%'}}> <Link to={"/fashion"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px'}}>  Fashion  </Link></Button>
         <Button style={{marginTop:'1%'}}> <Link to={"/furniture"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px'}}>  Furniture  </Link></Button>
         <Button style={{marginTop:'1%'}}> <Link to={"/elec"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px'}}>  Electronics  </Link></Button>
         <Button style={{marginTop:'1%'}}> <Link to={"/grocery"} style={{color:"#ffffff" , textDecoration:"none", fontSize:'17px'}}>  Grocery  </Link></Button>
       </Card>
      }
        

       {isLargeScreen && 
        <Slider {...settings} style={{marginLeft:'9%'}}>
          <div>
            <img src={sale} style={{width: '90%' , height: '450px' , borderRadius: '5px'}} />
          </div>
          <div>
            <img src={furniture} style={{width: '90%' , height: '460px' , borderRadius: '5px'}} />
          </div>
          <div>
            <img src={fashion} style={{width: '90%' , height: '460px', borderRadius: '5px' }} />
          </div>
          <div>
            <img src={makeup} style={{width: '90%' , height: '460px', borderRadius: '5px' }} />
          </div>
          <div>
            <img src={sneaker} style={{width: '90%' , height: '460px', borderRadius: '5px' }}/>
          </div>
          <div>
            <img src={watches} style={{width: '90%' , height: '460px' , borderRadius: '5px'}}/>
          </div>
          <div>
            <img src={smartphone} style={{width: '90%' , height: '460px' , borderRadius: '5px'}}/>
          </div>
          <div>
            <img src={jeans} style={{width: '90%' , height: '460px', borderRadius: '5px' }} />
          </div>
          <div>
            <img src={groceries} style={{width: '90%' , height: '460px' , borderRadius: '5px'}}/>
          </div>
          <div>
            <img src={skincare} style={{width: '90%' , height: '460px', borderRadius: '5px' }} />
          </div>
        </Slider>
        }
        {isNotLargeScreen && 
        <Slider {...settings} style={{marginLeft:'9%'}}>
          <div>
            <img src={sale} style={{width: '90%' , height: '350px' , borderRadius: '5px'}} />
          </div>
          <div>
            <img src={furniture} style={{width: '90%' , height: '350px' , borderRadius: '5px'}} />
          </div>
          <div>
            <img src={fashion} style={{width: '90%' , height: '350px', borderRadius: '5px' }} />
          </div>
          <div>
            <img src={makeup} style={{width: '90%' , height: '350px', borderRadius: '5px' }} />
          </div>
          <div>
            <img src={sneaker} style={{width: '90%' , height: '350px', borderRadius: '5px' }}/>
          </div>
          <div>
            <img src={watches} style={{width: '90%' , height: '350px' , borderRadius: '5px'}}/>
          </div>
          <div>
            <img src={smartphone} style={{width: '90%' , height: '350px' , borderRadius: '5px'}}/>
          </div>
          <div>
            <img src={jeans} style={{width: '90%' , height: '350px', borderRadius: '5px' }} />
          </div>
          <div>
            <img src={groceries} style={{width: '90%' , height: '350px' , borderRadius: '5px'}}/>
          </div>
          <div>
            <img src={skincare} style={{width: '90%' , height: '350px', borderRadius: '5px' }} />
          </div>
        </Slider>}
      </div>
      
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
      <Grid item style={{marginLeft:'24%'}}>
        <Typography variant="h4" style={{ fontFamily: "'Exo 2', sans-serif" ,textAlign: 'center', marginBottom: '20px' , color:'#ffffff'}}>
         BEST BUYS
        </Typography>
        </Grid>
        </Grid>
         <Grid container spacing={3}>
        { filteredProducts.slice(firstIndex, lastIndex).map((product) => (
          <Grid item key={product.id} xs={12} sm={4}>  
        
          <Card style={{  border: '2px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(82, 109, 130, 0.5)', background:'#FFFFFF'}} data-aos="zoom-in">
            <CardContent>
            <Link to={`/product/${product.id}`}>
              <img src={product.images[1]} style={{border:'2px',borderRadius:'8px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',display:"block", margin:'auto',width:'380px' , height:'250px'}}/>
            </Link>
              <Typography style={{fontFamily: 'Work Sans', textAlign:'center', marginTop:'6px', fontSize:'23px'}}>  {product.title}</Typography>
              <Typography style={{textAlign:'center'}}>{product.brand}</Typography>
              <Typography style={{textAlign:'center', fontSize:'21px', fontWeight:'bold'}}>  ${product.price}</Typography>
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

export default Home;