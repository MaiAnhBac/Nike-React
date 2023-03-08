import {loginAndGetToken} from '../data/API'
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import {Checkbox,Button,TextField,Grid, Paper, Typography} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert'
function Login() {
    const paperStyle = {padding: '50px', width: 500, margin: '20px auto', borderRadius: '30px'}
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const onConfirmLogin = (e) => {
        e.preventDefault();
        loginAndGetToken(email, password).then(token =>{
            if(token.username === email){
                swal("Login!", "You clicked the button!", "success");
                localStorage.setItem('user', JSON.stringify(token))
                navigate('/menu')
            }
            else{
                swal("Login Failed!", "You clicked the button!", "error");
            }
        })
    }
    return ( 
        <>
            <Layout>
                <Grid textAlign={'center'} sx={{my: 18 }}>
                    <Paper elevation={20} style={paperStyle}>
                        <Grid>
                            <h2 style={{fontWeight: 'bold'}}>Sign In</h2>
                            <Typography sx={{mt: 2}}>Hey, Enter your details to get sign in <br /> to your account</Typography>
                        </Grid>
                        <form onSubmit={onConfirmLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField id="outlined-name" value={email} onChange={handleEmail} name="username" label="Enter Email/Phone No" variant="outlined" sx={{ my: 3 }} required />
                            <FormControl variant="outlined" sx={{mb: 2}} required>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password" name="password" value={password} onChange={handlePassword}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                             </FormControl>
                            <div style={{display: 'flex'}}>
                                <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon sx={{color: '#FF9933'}} />} />
                                <Typography sx={{ mt: 1 }}>Remember me</Typography>
                            </div>
                            <Button variant="contained" type="submit" sx={{background: '#FF9933', my: 3, p: 1.5, borderRadius: '14px'}}>Sign In</Button>
                            <Typography>--- Or Sign up with ---</Typography>
                            <Typography>
                                <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ border: '1px solid #E6E6FA', mr: 2, mt: 2, color: 'black', fontWeight: 'bold', '&:hover': {border: '1px solid #FF9933', background: 'white'} }}>Google</Button>
                                <Button variant="outlined" startIcon={<AppleIcon />} sx={{ border: '1px solid #E6E6FA', mr: 2, mt: 2, color: 'black', fontWeight: 'bold', '&:hover': {border: '1px solid #FF9933', background: 'white'} }}>Apple</Button>
                                <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ border: '1px solid #E6E6FA', mt: 2, color: 'black', fontWeight: 'bold', '&:hover': {border: '1px solid #FF9933', background: 'white'} }}>Facebook</Button>
                            </Typography>
                            <Typography sx={{mt: 2}}>Don't have an account? <Link to="/register" style={{color: 'black', textDecoration: 'none',fontWeight: 'bold'}}>Create Account</Link></Typography>
                        </form>
                    </Paper>
                </Grid>
            </Layout>
        </>
    );
}

export default Login;