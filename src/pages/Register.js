import { useState } from "react";
import { Link } from "react-router-dom";
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
function Login() {
    const paperStyle = {padding: '50px', width: 500, margin: '20px auto', borderRadius: '30px'}
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return ( 
        <>
            <Layout>
                <Grid textAlign={'center'} sx={{my: 8}}>
                    <Paper elevation={20} style={paperStyle}>
                        <Grid>
                            <h2 style={{fontWeight: 'bold'}}>Create Account</h2>
                            <Typography sx={{mt: 2}}>Hey, Enter your details to get create <br/> account to your</Typography>
                        </Grid>
                        <form style={{display: 'flex', flexDirection: 'column'}}>
                            <TextField id="outlined-name" label="Name" variant="outlined" sx={{mt: 3}} required />
                            <TextField id="outlined-name" label="Enter Email/Phone No" variant="outlined" sx={{my: 3}} required />
                            <FormControl variant="outlined" sx={{mb: 2}} required>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
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
                             <FormControl variant="outlined" sx={{mb: 2}} required>
                                <InputLabel htmlFor="outlined-adornment-confirmpassword">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-confirmpassword"
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
                                    label="Confirm Password"
                                />
                             </FormControl>
                            <Typography sx={{display: 'flex'}}>
                                <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />}/>
                            <Typography sx={{mt: 1}}>Remember me</Typography>
                            </Typography>
                            <Button variant="contained" sx={{background: '#FF9933', my: 3, p: 1.5, borderRadius: '14px'}}>Sign Up</Button>
                            <Typography>--- Or Sign in with ---</Typography>
                            <Typography>
                                <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ border: '1px solid #E6E6FA', mr: 2, mt: 2, color: 'black', fontWeight: 'bold' }}>Google</Button>
                                <Button variant="outlined" startIcon={<AppleIcon />} sx={{ border: '1px solid #E6E6FA', mr: 2, mt: 2, color: 'black', fontWeight: 'bold' }}>Apple</Button>
                                <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ border: '1px solid #E6E6FA', mt: 2, color: 'black', fontWeight: 'bold' }}>Facebook</Button>
                            </Typography>
                            <Typography sx={{mt: 2}}>Do you already have an account? <Link to="/login" style={{color: 'black', textDecoration: 'none',fontWeight: 'bold'}}>Sign in</Link></Typography>
                        </form>
                    </Paper>
                </Grid>
            </Layout>
        </>
    );
}

export default Login;