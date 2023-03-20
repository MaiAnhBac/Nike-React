import { Button, Typography, Box, Grid, Card } from "@mui/material";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import swal from 'sweetalert'
function Logout() {
    const navigate = useNavigate();
    const userLogin = JSON.parse(localStorage.getItem('user')) || null
    const handleLogOut = () =>{
        localStorage.removeItem("user")
        localStorage.removeItem('cart')
        swal("LogOut!", "You clicked the button!", "success");
        navigate('/')
    }
    return ( 
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ p: 4, '& h4': { textAlign: 'center', my: 10, fontSize: '40px', fontWeight: 'bold' } }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Personal information</Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card sx={{ minHeight: '475px', p: 5}}>
                            <Avatar alt="Remy Sharp" src={userLogin.image} sx={{ border: '1px solid black', width: '120px', height: '120px', m: '0 auto', display: 'flex', justifyContent: 'center' }} />
                            <Typography variant="h5" sx={{p: 3, textAlign: 'center', color: 'red', fontWeight: 'bold'}}>{userLogin.lastName}</Typography>
                            <Typography variant="h5" sx={{ textAlign: 'center'}}>{userLogin.email}</Typography>
                            <Box sx={{ textAlign: 'center' }}>
                                <Link to={'/'} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="secondary" sx={{ m: 2 }}>Home</Button>
                                </Link>
                                <Button variant="contained" color="primary" onClick={handleLogOut} >Logout</Button>
                            </Box>
                            <Typography variant="h6" sx={{p: 3, textAlign: 'center'}}>Welcome to my food restaurant</Typography>
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
                                            <TableCell>FirstName:</TableCell>
                                            <TableCell align="left">{userLogin.firstName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>LastName:</TableCell>
                                            <TableCell align="left">{userLogin.lastName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Gender:</TableCell>
                                            <TableCell align="left">{userLogin.gender}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>UserName:</TableCell>
                                            <TableCell align="left">{userLogin.username}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Password:</TableCell>
                                            <TableCell align="left">{userLogin.password}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Email:</TableCell>
                                            <TableCell align="left">{userLogin.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2} sx={{textAlign: 'center'}}><Button variant="contained" color="secondary" sx={{ m: 2 }}>Edit</Button></TableCell>
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

export default Logout;