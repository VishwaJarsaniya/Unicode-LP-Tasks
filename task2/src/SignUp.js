import React , {useState , useEffect , useRef} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
// import lottie from 'lottie-web';
import { Link } from 'react-router-dom';
import signupImage from './signup.png';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';


function SignUp() {
  
    const initialData = {email: "", password: ""};
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const fillData = (e) => {
      const {name, value} = e.target;
      setFormData({...formData, [name]: value});
    }
  
    const submitForm = () => {
      const validationErrors = validate(formData);
      if(Object.keys(validationErrors).length === 0){
        localStorage.setItem('email', formData.email);
        localStorage.setItem('password', formData.password);
        Swal.fire({
          icon: 'success',
          title: 'Registered successfully!',
        });
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
      
      const nameRegex = /^[A-Za-z\s'-]+$/;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const phoneRegex = /^[0-9]{10}$/;
  
      if(!data.name){
        errors.name = "Name is required";
      }   else if(!nameRegex.test(data.name)){
        errors.name = "Invalid format"
      }
     
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

      if (!confirmPassword) {
        errors.confirmPassword = "This field is mandatory";
      } else if (data.password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      
      if(!data.phone){
        errors.phone = "Mobile number is required";
      }   else if(!phoneRegex.test(data.phone)){
        errors.phone = "Invalid format"
      }

      console.log('error');
      return errors;
      
    }

  return (
   
    <Box
    sx={{
      border:2,
      pl:10,
      ml:'8%',
      mr:'8%',
      mt:'2%',
      mb:'2%',
      borderRadius:8,
      overflow:'hidden',
      border: `1.5px solid #624391`,
      boxShadow: '0 15px 20px rgba(98, 67, 145, 0.2)',
      zIndex:999,
    }}>
     <Grid container>
<Grid                                                        //form lhs
      component="div"
      item
      xs={12}
      sm={6}
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
        padding: 5,
        m:0,
        width:'100%',
        backgroundColor: '#FFFFFF', 
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
      autoComplete="off"
    >
    <div>
    <Typography variant="h4" gutterBottom sx={{ mb: 2}}>
      Glad to have you on board!
    </Typography>
    <TextField id="filled-basic-name" label="Name" name='name' autoFocus variant="filled" value={formData.name} 
      onChange={fillData} error={errors.name} helperText={errors.name} sx={{ mb: 3 , width:'100%'}}
     InputProps={{ sx: {
      '&:before': {
        borderBottom: '2px solid #624391', 
      }, '&:after': {
        borderBottom: '2px solid #624391', 
      }, '&:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #624391', 
      },}}}
     />
    <TextField id="filled-basic-email" label="Email" name='email' variant="filled" value={formData.email} 
    onChange={fillData} error={errors.email} helperText={errors.email}  sx={{ mb: 3 , width:'100%'}}
    InputProps={{ sx: {
      '&:before': {
        borderBottom: '2px solid #624391', 
      }, '&:after': {
        borderBottom: '2px solid #624391', 
      }, '&:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #624391', 
      },}}}/>
    <TextField id="filled-basic-password" label="Password" name='password' type='password' variant="filled" value={formData.password}
     onChange={fillData} error={errors.password} helperText={errors.password} sx={{ mb: 3, width:'100%' }}
     InputProps={{ sx: {
      '&:before': {
        borderBottom: '2px solid #624391', 
      }, '&:after': {
        borderBottom: '2px solid #624391', 
      }, '&:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #624391', 
      },}}}/>
    <TextField id="filled-basic-password" label=" Confirm Password" name='confirmPassword' type='password' variant="filled" 
    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors.confirmPassword} 
    helperText={errors.confirmPassword} sx={{ mb: 3, width:'100%' }}
    InputProps={{ sx: {
      '&:before': {
        borderBottom: '2px solid #624391', 
      }, '&:after': {
        borderBottom: '2px solid #624391', 
      }, '&:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #624391', 
      },}}}/>
    <TextField id="filled-basic-phone" label="Mobile Number" name='phone' variant="filled" value={formData.phone} 
      onChange={fillData} error={errors.phone} helperText={errors.phone} sx={{ mb: 3 , width:'100%'}}
     InputProps={{ sx: {
      '&:before': {
        borderBottom: '2px solid #624391', 
      }, '&:after': {
        borderBottom: '2px solid #624391', 
      }, '&:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #624391', 
      },}}}
     />
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" required>Gender</FormLabel>
      <RadioGroup
        sx={{colour:'#624391',width:'100%'}}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
    <LocalizationProvider required dateAdapter={AdapterDayjs} sx={{ mb: 2, width:'100%' }}>
    <DemoContainer components={['DatePicker']}>
      <DatePicker label="Date of Birth" />
    </DemoContainer>
    </LocalizationProvider>
    <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
    <Button sx={{backgroundColor:'#624391'}} variant="contained" onClick={submitForm} style={{width:'100%'}}>SIGN UP</Button>
    </Stack>
    <Box sx={{ mt: 3 }}>
      <Typography variant="body2" color="textSecondary">Already have an account?{' '}
      <Link to="/" style={{ textDecoration: 'none' }}>
      Login
      </Link>
      </Typography>
    </Box>
  </div>
  </Grid>
  <Grid                                              //rhs
    component="div"                                            
    item
    xs={12}
    sm={6}
    sx={{
      width:'100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}
    
    autoComplete="off"
  >
    <div style={{ width: '50%', height: '90%', position: 'fixed', top:20, right: 60,  margin: 'auto'}}>
    <img
            src={signupImage}
            alt="Sign Up Image"
            style={{ width: '105%', height: '120%' }}
            
          />
          </div>
  </Grid>
  </Grid>
  </Box>
  
  );
  }

export default SignUp;
