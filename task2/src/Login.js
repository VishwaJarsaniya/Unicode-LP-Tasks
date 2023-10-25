import React , {useState} from 'react';
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
import loginImage from './Login-amico.png';
import Swal from 'sweetalert2';


function Login() {

    const initialData = {email: "", password: ""};
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
  
    const fillData = (e) => {
      const {name, value} = e.target;
      setFormData({...formData, [name]: value});
    }
  
    const submitForm = () => {
      const validationErrors = validate(formData);
      if(Object.keys(validationErrors).length === 0){
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        if (formData.email === storedEmail && formData.password === storedPassword) {
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
          });
        }
        else {
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
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
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
      
      console.log('error');
      return errors;
      
    }

  return (
    <form>
      <Box
      sx={{
        border:2,
        pl:10,
        ml:'7%',
        mr:'7%',
        mt:'7%',
        mb:'7%',
        borderRadius:8,
        overflow:'hidden',
        border: `1.5px solid #624391`,
        boxShadow: '0 15px 20px rgba(98, 67, 145, 0.2)',
        zIndex:999,
      }}>
       <Grid container>
    <Grid                                              //lhs
      component="div"                                            
      item
      xs={12}
      sm={7}
      sx={{
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
  <Grid                                                        //form rhs
        component="div"
        item
        xs={12}
        sm={5}
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
          padding: 5,
          m:0,
          width:'50%',
          backgroundColor: '#FFFFFF', // Left half color
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
      <Button sx={{backgroundColor:'#624391'}} variant="contained" onClick={submitForm} style={{width:'100%', height:40 }}>LOGIN</Button>
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
