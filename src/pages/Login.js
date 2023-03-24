import { loginAndGetToken } from '../data/API'
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
import toast from 'react-hot-toast';
function Login() {
    const paperStyle = { padding: '50px', width: 500, margin: '20px auto', borderRadius: '30px' }
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [errorUser, setErrorUser] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
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
    const onConfirmLogin = (e) => {
        e.preventDefault();
        if (email === "") {
            setErrorUser(true);
        }
        else  {
            setErrorUser(false);
        }
        if (password === "") {
            setErrorPass(true);
        }
        else {
            setErrorPass(false);
            loginAndGetToken(email, password).then(token => {
                if (token.username === email) {
                    localStorage.setItem('user', JSON.stringify(token))
                    toast.success('This is a success login message!');
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
                    toast.error('This is an error message!');
                }
            })
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
                <Grid textAlign={'center'} sx={{ my: 18 }}>
                    <Paper className='paper' elevation={20} style={paperStyle}>
                        <Grid>
                            <h2 style={{ fontWeight: 'bold' }}>Sign In</h2>
                            <Typography className='tyh2' sx={{ mt: 2 }}>Hey, Enter your details to get sign in <br /> to your account</Typography>
                        </Grid>
                        <form onSubmit={onConfirmLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField id="outlined-name" value={email || ""} onChange={handleEmail} name="username" label="Enter Email/Phone No*" variant="outlined" sx={{ mt: 3, mb: 1 }} />
                            {errorUser && <p style={{ color: 'red', marginLeft: 5, marginBottom: '6px', fontSize: '12px', textAlign: 'left' }}>Vui lòng nhập thông tin username</p>}
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
                            {errorPass && <p style={{ color: 'red', marginLeft: 5, marginBottom: 3, fontSize: '12px', textAlign: 'left' }}>Vui lòng nhập thông tin password</p>}
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