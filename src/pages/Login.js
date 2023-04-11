import {authorization, login } from '../data/API'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Checkbox, Button, TextField, Grid, Paper, Typography, Box } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../styles/Login.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import toast from 'react-hot-toast';
function Login() {
    const paperStyle = { padding: '50px', width: 500, margin: '20px auto', borderRadius: '30px' }
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleRemember = (e) => {
        setRemember(e.target.checked)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    async function api(email, password) {
        let accessToken;
        await login(email, password).then(token => {
                accessToken = token.access_token
        });
        if(accessToken){
            authorization(accessToken)
            toast.success('Logged in successfully message!');
            navigate('/shop')
            if (remember) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
            }
            else {
                localStorage.removeItem('rememberMe')
                localStorage.removeItem('email')
                localStorage.removeItem('password')
            }
        }
        else {
            toast.error('Login failed message!');
            setProgress(false)
        }
    }
    const onConfirmLogin = (e) => {
        e.preventDefault();
        setProgress(true)
        if (!email || !password) {
            setError(true);
            setProgress(false)
        }
        else {
            setError(false);
            setTimeout(() => {
                setProgress(false)
                api(email, password)
            }, 1500)
        }
    }
    useEffect(() => {
        const rememberMeValue = localStorage.getItem('rememberMe') === 'true';
        const emailValue = localStorage.getItem('email') || '';
        const passValue = localStorage.getItem('password') || '';
        setEmail(emailValue);
        setPassword(passValue)
        setRemember(rememberMeValue);
    }, [])
    return (
        <>
            <Layout>
                {progress && <Backdrop open={progress} sx={{color: '#FF9933', bgcolor: 'rgba(192,192,192,0.1)', zIndex: (theme) => theme.zIndex.drawer + 1 }}><CircularProgress color="inherit" /></Backdrop>}
                <Grid textAlign={'center'} sx={{ my: 18 }}>
                    <Paper className='paper' elevation={20} style={paperStyle}>
                        <Grid>
                            <h2 style={{ fontWeight: 'bold' }}>Sign In</h2>
                            <Typography className='tyh2' sx={{ mt: 2 }}>Hey, Enter your details to get sign in <br /> to your account</Typography>
                        </Grid>
                        <form onSubmit={onConfirmLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField id="outlined-name" value={email || ""} onChange={handleEmail} name="username" label="Enter Email/Phone No*" variant="outlined" sx={{ mt: 3, mb: 1 }} />
                            {error && <p className='error'>Please enter your Email/Phone No</p>}
                            <FormControl variant="outlined" sx={{ mb: 1, mt: 0.5 }}>
                                <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password" name="password" value={password || ""} onChange={handlePassword}
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
                            {error && <p className='error'>Please enter password information</p>}
                            <Box sx={{ textAlign: 'start' }}>
                                <FormControlLabel checked={remember} onChange={handleRemember} control={<Checkbox />} label="Remember me" />
                            </Box>
                            <Button variant="contained" type="submit" sx={{ background: '#FF9933', my: 2, p: 1.5, borderRadius: '14px' }}>Sign In</Button>
                            <Typography className='or'>--- Or Sign up with ---</Typography>
                            <Typography>
                                <Button className='btn' variant="outlined" startIcon={<GoogleIcon className='icon' />} sx={{ mt: 2, mr: 2 }} >Google</Button>
                                <Button className='btn' variant="outlined" startIcon={<AppleIcon className='icon' />} sx={{ mt: 2, mr: 2 }} >Apple</Button>
                                <Button className='btns' variant="outlined" startIcon={<FacebookIcon className='icon' />} sx={{ mt: 2 }}>Facebook</Button>
                            </Typography>
                            <Typography className='tyac' sx={{ mt: 2 }}>Don't have an account? <Link to="/register" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>Create Account</Link></Typography>
                        </form>
                    </Paper>
                </Grid>
            </Layout>
        </>
    );
}

export default Login;