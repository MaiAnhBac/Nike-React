import { useState } from "react";
import { Button, Typography, Box, Grid, Card } from "@mui/material";
import {Link} from 'react-router-dom';
import Layout from "../components/Layout/Layout";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
function Personal() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return ( 
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ p: 4, '& h4': { textAlign: 'center', my: 10, fontSize: '40px', fontWeight: 'bold', color: '#EC870E' } }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Personal information</Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card sx={{ minHeight: '475px', p: 5}}>
                            <Avatar alt="Remy Sharp" src={userLogin.avatar} sx={{ border: '1px solid black', width: '120px', height: '120px', m: '0 auto', display: 'flex', justifyContent: 'center' }} />
                            <Typography variant="h5" sx={{p: 3, textAlign: 'center', color: 'red', fontWeight: 'bold'}}>{userLogin.name}</Typography>
                            {/* <Typography variant="h5" sx={{ textAlign: 'center'}}>{userLogin.email}</Typography> */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Button variant="outlined" onClick={handleOpen} color="secondary" sx={{ m: 2 }}>Change Password</Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle align="center" sx={{color: '#EC870E', fontWeight: 'bold'}}>Change Password</DialogTitle>
                                    <DialogContent sx={{display:'flex', flexDirection: 'column'}}>
                                        <FormControl variant="outlined" sx={{ mb: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-password" sx={{background: 'white', pr: 1}}>Old password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password" name="password"
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
                                        <FormControl variant="outlined" sx={{ mb: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-passwordold" sx={{background: 'white', pr: 1}}>A new password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-passwordold" name="Mật khẩu mới"
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
                                    </DialogContent>
                                    <DialogActions sx={{mr: 2}}>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleClose} autoFocus>
                                            Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                               
                            </Box>
                            <Typography variant="h6" sx={{p: 3, textAlign: 'center'}}>Welcome to my Nike Website</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>ID:</TableCell>
                                            <TableCell align="left">{userLogin.id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>First and last name:</TableCell>
                                            <TableCell align="left">{userLogin.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Role:</TableCell>
                                            <TableCell align="left">{userLogin.role}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Email:</TableCell>
                                            <TableCell align="left">{userLogin.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Password:</TableCell>
                                            <TableCell align="left">*******</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Date created:</TableCell>
                                            <TableCell align="left">{userLogin.creationAt}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Update day:</TableCell>
                                            <TableCell align="left">{userLogin.updatedAt}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2} sx={{textAlign: 'center'}}>
                                                <Link to={'/pagenotfound'} style={{ textDecoration: 'none' }}>
                                                    <Button variant="outlined" color="secondary" sx={{ m: 2 }}>Edit</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>  
                </Grid>
            </Box>
        </Layout>
     );
}

export default Personal;