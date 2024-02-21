import React , {useContext, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import loginImage from '../pics/Login-amico.png';
import Swal from 'sweetalert2';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from '../login_signup_api/axios';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

function Login() {

    const initialData = {email: "", password: ""};
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const isLargeScreen = useMediaQuery('(min-width:900px)'); 
   
  
    const navigate = useNavigate();

    const fillData = (e) => {
      const {name, value} = e.target;
      setErrors({ ...errors, [name]: '' });
      setFormData({...formData, [name]: value});
    }

    const authContext = useContext(AuthContext);
    const {login} = authContext;
    const {loginSuccess} = authContext;

    useEffect(() => {
      if(loginSuccess){
        localStorage.setItem('isLoggedIn' , 'true');
        console.log('isLoggedIn');
      }
    },[loginSuccess])

    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigate('/');
      }
    }, [navigate]);
    
    const submitForm = async () => {
      const validationErrors = validate(formData);
      if(Object.keys(validationErrors).length === 0){

        // const storedEmail = localStorage.getItem('email');
        // const storedPassword = localStorage.getItem('password');

        try{
          const response = await axios.post('/user/userLogin', formData);
          // console.log(response);
          const userData = response.data.userData;
          console.log('userData:', response.data);
          login(userData.token, userData.username);
    
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
          });

        }
       catch (error){
        Swal.fire({
          icon: 'error',
          title: 'Invalid email or password',
        });
       }
      }

      else {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please check your input',
        });
        setErrors(validationErrors);
      }
    } 
    
  
    const validate = (data) => {
      const errors = {};
  
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const passwordRegex = /^.{8,}$/;
  
      if(!data.email){
        errors.email = "Email is required";
      }   else if(!emailRegex.test(data.email)){
        errors.email = "Invalid email format"
      }
     
      if(!data.password){
        errors.password = "Password is required";
      }    else if(!passwordRegex.test(data.password)){
        errors.password = "Invalid password format"
      }
      return errors;
      
    }

  return (
    <form>
      <Box
      sx={{
        border:2,
        pl: isLargeScreen ? 10 : 0,
        ml:'7%',
        mr:'7%',
        mt:'7%',
        mb:'7%',
        borderRadius:8,
        overflow:'hidden',
        border: `1.5px solid #624391`,
        boxShadow: '0 15px 20px rgba(98, 67, 145, 0.2)',
        zIndex:999,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

       <Grid container>
       {isLargeScreen && (
    <Grid                                              //lhs
      component="div"                                            
      item
      xs={12}
      sm={7}
      sx={{
        width:'100%',
        // justifyContent: 'flex-start',
      }}
      
      autoComplete="off"
    >
      <div style={{ width: '40%', height: '80%', position: 'fixed', top:40 }}>
      <img
              src={loginImage}
              alt="Login Image"
              style={{ width: '100%', height: '100%'}}
              
      />
      </div>
    </Grid>
       )}
  <Grid                                                        //form rhs
        component="div"
        item
        xs={12}
        sm={isLargeScreen ? 5 : 12}
        sx={{
          '& > :not(style)': { m: 0, width: '100%' },
          padding: 5,
          m:0,
          width:'50%',
          backgroundColor: 'transparent', 
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
        autoComplete="off"
      >
      <div>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 , mr:3}}>
        Welcome Back
      </Typography>
      <TextField id="filled-basic-email" label="Email" name='email' autoFocus variant="filled" value={formData.email} 
      onChange={fillData} error={errors.email} helperText={errors.email}  
      sx={{ mb: 4 , width:'100%'}} 
      InputProps={{ sx: {
      '&:before': {
        borderBottom: '2px solid #624391', 
      }, '&:after': {
        borderBottom: '2px solid #624391', 
      }, '&:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #624391', 
      },}}}/>
      <TextField id="filled-basic-password" label="Password" name='password' type='password' variant="filled" value={formData.password} 
        onChange={fillData} error={errors.password} helperText={errors.password}
        sx={{ mb: 4, width:'100%' }}
        InputProps={{ sx: {
        '&:before': {
          borderBottom: '2px solid #624391', 
        }, '&:after': {
          borderBottom: '2px solid #624391', 
        }, '&:hover:not(.Mui-disabled):before': {
          borderBottom: '2px solid #624391', 
        },}}}/>
      <FormGroup sx={{ mb: 3 }}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Keep me logged in" />
      </FormGroup>
      <Typography variant="body2" color="primary" style={{ cursor: 'pointer' , color:'#624391', textDecoration:'underline'}}>
        Forgot Password?
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mt: 3 , justifyContent: 'center', alignItems: 'center'}}>
      <Button sx={{backgroundColor:'#624391'}} variant="contained" onClick={submitForm} style={{width:'100%', height:40 }}><Link to={"/"} style={{textDecoration:'none', color:'white'}}>LOGIN</Link></Button>
      </Stack>
      <Box sx={{ mt: 3}}>
        <Typography variant="body2" color="textSecondary">Don't have an account?    
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          Sign Up
        </Link>
        </Typography>
      </Box>
    </div>
      
    </Grid>
    </Grid>
    </Box>
  
    </form>
  );
  }

export default Login;
