import React, { useState , useEffect, useContext} from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import dropdown from "../pics/icons8-drop-down-50.png";
import "../Pages/Homee.css";
import { BsCart2 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import stars from "../pics/stars.png";
import Navbar from "../Pages/Nav";
import { useCart } from "./CartContext";
import { AuthContext } from "../Login_Signup/AuthProvider";
import Swal from 'sweetalert2';

function Product() {

    const { id } = useParams();
    
    const[product, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    const [mainImage ,  setMainImage] = useState(product.images && product.images.length > 0 ? product.images[0] : null);

    const {addToCart} = useCart();

    const [quantity, setQuantity] = useState(1)

    const authContext = useContext(AuthContext);

    const handleQuantity = (event) => {
      const newQuantity = parseInt(event.target.value , 10);
      setQuantity(newQuantity);
    };

    const handleIncrement = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
      if(quantity>1){
      setQuantity((prevQuantity) => prevQuantity - 1);
      }
    };

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    //Slider
    const settings = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2300,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

      //AddToCart
      const handleAddToCart = (product) => {
        const { id, title, brand, stock, price, images } = product;
      
        if(authContext.isAuthenticated()) {
        setCartItems((prevCartItems) => {
          const currentCartItems = Array.isArray(prevCartItems) ? prevCartItems : [];
      
          const existingItemIndex = currentCartItems.findIndex((item) => item.id === id);
      
          if (existingItemIndex !== -1) {
            const updatedCartItems = [...currentCartItems];
            updatedCartItems[existingItemIndex].quantity += quantity || 1;
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return updatedCartItems;
          } else {
            const newItem = {
              id,
              title,
              brand,
              stock,
              price,
              images: images || [],
              quantity: quantity || 1,
            };
            const updatedCartItems = [...currentCartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return updatedCartItems;
          }
         
        });

        Swal.fire({
          icon: 'success',
          title: 'Item added to cart!',
        });

        console.log("item added to cart");
        console.log("indiv Products cart - ", cartItems);
      } 
      else {
        Swal.fire({
          icon: 'error',
          title: 'Please login first to add products to cart',
        });
      };
    };
      


    useEffect(() => {
    
    const existingCartItems = localStorage.getItem('cartItems') || '[]' ;
    if(existingCartItems){
      setCartItems(JSON.parse(existingCartItems));
      console.log('Existing Cart Items:', existingCartItems);
    }

    const fetchAllData = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await response.json();
          console.log(data);
    
          setProducts(data);
          if (data.images && data.images.length > 0) {
            setMainImage(data.images[0]);
          }
        } catch(error)
        {
          console.trace('Error fetching data!' , error);
        }
      }
    
       
        console.log('Use effect trigerred');
        fetchAllData();
     }, [id]);


      // console.log("Product Id: ",id);
      // console.log("Product Images:", product.images);

    return(

      <div className="product">
      <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Exo+2&display=swap" rel="stylesheet"/>
      </Helmet>
    
      <Card style={{ border: '8px', borderRadius:'0px', background:'#000000', marginBottom:'30px' , padding:'15px'}}>
      <Navbar />
      </Card>

        <Card style={{ border: '8px', borderRadius:'15px', background: ' radial-gradient(circle, rgba(0,0,0,1) 42%, rgba(60,65,65,1) 100%)' ,boxShadow: '8px 8px 16px rgba(82, 109, 130, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.8)', marginTop: '2%', marginBottom:'40px' ,marginLeft:'50px', marginRight:'50px', paddingLeft:'20px', paddingRight:'20px'}}>
        <CardContent>
        <Typography variant="h4" style={{ fontFamily: 'Exo+2', textAlign: 'center', marginBottom: '20px' }}>
         
        </Typography>
         <Grid container spacing={3} style={{alignItems:'center', justifyContent:'center'}}>
        
          <Card style={{ border: '2px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(82, 109, 130, 0.5)',flex:'1', justifyContent:'center', marginLeft:'20px'}}>
            <CardContent>
            <div>
            <img src={mainImage} style={{width:'100%',height:'400px', border: '2px', borderRadius: '8px', objectFit:'cover'}} />
          </div>
          <div style={{display:'flex', flexDirection:'row', marginTop:'5%'}}>
              {product.images && product.images.map((image,index) => (
                    <div key={index}>
                      <img src={image} onClick={() => handleImageClick(image)} style={{width:'240px',height:'100px', border: '2px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' , cursor:'pointer', marginLeft:'5%'}} />
                    </div>
                  ))}
            </div>
            </CardContent>
          </Card>
          <Card style={{display:'flex', flexDirection:'column',width:'60%', height:'100%', border: '2px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(82, 109, 130, 0.5)', marginLeft:'20px'}}>
          <CardContent>
              <Typography style={{marginLeft:'5%', fontFamily: 'Exo+2', marginTop:'6px', fontSize:'30px'}}> {product.title}</Typography>
              <Typography style={{ marginLeft:'5%', marginTop:'40px', fontSize:'20px'}}>{product.description}</Typography>
              <Typography style={{ marginLeft:'5%', fontSize:'15px', marginTop:'20px'}}>Rating: {product.rating}   |   Brand: {product.brand}   |   Category: {product.category} </Typography>
              <Typography style={{ marginLeft:'5%', fontSize:'20px', marginTop:'25px'}}> In Stock:  {product.stock}</Typography>
              <Typography style={{ marginLeft:'5%', marginTop:'30px', fontSize:'33px' }}> ${product.price}  <Button variant="filled" style={{textAlign:'center', backgroundColor:'#fabacf', fontSize:'13px', padding:'1px', marginBottom:'5%'}}>{product.discountPercentage}% off</Button></Typography>
              <div style={{ display: 'flex', alignItems: 'center'}}>
              <Button sx={{ backgroundColor:'#000000'}} variant="contained" onClick={() => handleAddToCart(product)} style={{marginTop:'5%', marginLeft:'5%',borderColor:'#000000', borderRadius:'0px'}}>Add to Cart</Button>
              <Button variant="contained" onClick={handleIncrement} style={{  marginTop:'6%', marginLeft:'5%'  }}>+</Button>
              <TextField type="number" value={quantity} onChange={handleQuantity} inputProps={{ min: 1, max: product.stock, step: 1 }} style={{ width: "60px", marginRight: "2%", marginLeft:'2%', marginTop:'5%'}}/>
              <Button variant="contained" onClick={handleDecrement} style={{  marginTop:'6%'  }} disabled={quantity === 1}>-</Button>
              </div>
              <Button sx={{ backgroundColor:'#000000'}} variant="contained" style={{marginLeft:'5%' ,marginTop:'2%', borderColor:'#000000', borderRadius:'0px'}}>Buy Now</Button>
          </CardContent>
          </Card>
          
          </Grid>
        </CardContent>
        </Card>
        </div>
    );
}
export default Product;


