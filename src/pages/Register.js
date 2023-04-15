import { useState } from "react";
import { postAddNewUser } from '../data/API'
import axios from 'axios';
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import {Button,TextField,Grid, Paper, Typography} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../styles/Login.css';
import FormControl from '@mui/material/FormControl';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom'
function Register() {
    const paperStyle = {padding: '50px', width: 500, margin: '20px auto', borderRadius: '30px'}
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const [progress, setProgress] = useState(false);
    const [imageUser, setImageUser] = useState()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangeAvatar = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        async function uploadAvatar() {
            try {
              await axios
                    .post("https://api.escuelajs.co/api/v1/files/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        setImageUser(res?.data?.location)
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
            catch(error) {
                console.log(error);
            }
        }
        uploadAvatar();
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const onConfirmCreate = (e) => {
        e.preventDefault();
        setProgress(true)
        if (!name || !imageUser || !email || !password || !confirmPassword) {
            setError(true)
            setProgress(false)
        } else {
            setError(false)
            if(password === confirmPassword){
                setTimeout(() => {
                    setProgress(false)
                    postAddNewUser(name, email, imageUser, password)
                        .then(() => {
                            toast.success('Successful registration message!');
                            setName('')
                            setEmail('')
                            setPassword('')
                            setConfirmPassword('')
                            navigate('/login')
                            
                        })
                        .catch((error) => {
                            toast.error('Registration failed message!');
                            console.log(error);
                        })
                }, 5000)
            }
            else {
                toast.error('Confirm password do not match!');
                setProgress(false)
            }
        }
    }
    return ( 
        <>
            <Layout>
                {progress && <Backdrop open={progress} sx={{color: '#FF9933', bgcolor: 'rgba(192,192,192,0.1)', zIndex: (theme) => theme.zIndex.drawer + 1 }}><CircularProgress color="inherit" /></Backdrop>}
                <Grid textAlign={'center'} sx={{my: 10}}>
                    <Paper className='paper' elevation={20} style={paperStyle}>
                        <Grid>
                            <h2 style={{fontWeight: 'bold'}}>Create Account</h2>
                            <Typography className='tyh2' sx={{mt: 2}}>Hey, Enter your details to get create <br/> account to your</Typography>
                        </Grid>
                        <form onSubmit={onConfirmCreate} style={{display: 'flex', flexDirection: 'column'}}>
                            <TextField id="outlined-first" label="Name*"  variant="outlined" sx={{mb: 0.5, mt: 3}} value={name} onChange={handleChangeName}   />
                            {error && <p className='error'>Please enter information Name</p>}
                            <TextField id="outlined-phone" label="Enter Email/Phone No*" sx={{mb: 0.5, mt: 0.5}} variant="outlined" value={email} onChange={handleChangeEmail}   />
                            {error && <p className='error'>Please enter your Email/Phone No</p>}
                            <FormControl variant="outlined" sx={{mb: 0.5, mt: 0.5}} >
                                <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'} onChange={handleChangePassword} value={password}
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
                            {error && <p className='error'>Please enter Password information</p>}
                            <FormControl variant="outlined" sx={{mb: 0.5, mt: 0.5}} >
                                <InputLabel htmlFor="outlined-adornment-passwordcon" sx={{background: 'white'}}>Confirm Password*</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-passwordcon"
                                    type={showPassword ? 'text' : 'password'} onChange={handleChangeConfirmPassword} value={confirmPassword}
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
                            {error && <p className='error'>Please enter Confirm Password information</p>}
                            <TextField id="outlined-avatar" type="file" name="file" sx={{mb: 0.5, mt: 0.5}} variant="outlined" onChange={handleChangeAvatar}  />
                            {error && <p className='error'>Please enter Avatar information</p>}
                            <Button variant="contained" type="submit" sx={{background: '#FF9933', my: 1, p: 1.5, borderRadius: '14px'}}>Sign Up</Button>
                            <Typography className='or'>--- Or Sign in with ---</Typography>
                            <Typography>
                                <Button className='btn' variant="outlined" startIcon={<GoogleIcon className='icon' />} sx={{ border: '1px solid #E6E6FA', mr: 2, mt: 2, color: 'black', fontWeight: 'bold' }}>Google</Button>
                                <Button className='btn' variant="outlined" startIcon={<AppleIcon className='icon' />} sx={{ border: '1px solid #E6E6FA', mr: 2, mt: 2, color: 'black', fontWeight: 'bold' }}>Apple</Button>
                                <Button className='btns' variant="outlined" startIcon={<FacebookIcon className='icon' />} sx={{ border: '1px solid #E6E6FA', mt: 2, color: 'black', fontWeight: 'bold' }}>Facebook</Button>
                            </Typography>
                            <Typography className='tyac' sx={{mt: 2}}>Do you already have an account? <Link to="/login" style={{color: 'black', textDecoration: 'none',fontWeight: 'bold'}}>Sign in</Link></Typography>
                        </form>
                    </Paper>
                </Grid>
            </Layout>
        </>
    );
}

export default Register;