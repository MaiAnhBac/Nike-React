import { Typography, Box, CardMedia, Grid, Button, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from "../components/Layout/Layout";
import Cachua from '../images/epcachua.jpg'
import DeleteIcon from '@mui/icons-material/Delete';
function ShoppingCart() {
    return ( 
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ p: 4, '& h4': { textAlign: 'center' } }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Shopping Cart</Typography>
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ display: 'flex' }}>
                                                <CardMedia src={Cachua} component={'img'} sx={{ maxWidth: '250px' }} />
                                                <Box sx={{ m: 5 }}>
                                                    <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'green' }}>Cà chua</Typography>
                                                    <Typography> Cà chua tươi ngon mới được nhập</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">$9.99</TableCell>
                                            <TableCell align="right">1</TableCell>
                                            <TableCell align="right">$9.99</TableCell>
                                            <TableCell align="right">
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ display: 'flex' }}>
                                                <CardMedia src={Cachua} component={'img'} sx={{ maxWidth: '250px' }} />
                                                <Box sx={{ m: 5 }}>
                                                    <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'green' }}>Cà chua</Typography>
                                                    <Typography> Cà chua tươi ngon mới được nhập</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">$9.99</TableCell>
                                            <TableCell align="right">1</TableCell>
                                            <TableCell align="right">$9.99</TableCell>
                                            <TableCell align="right">
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ display: 'flex' }}>
                                                <CardMedia src={Cachua} component={'img'} sx={{ maxWidth: '250px' }} />
                                                <Box sx={{ m: 5 }}>
                                                    <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'green' }}>Cà chua</Typography>
                                                    <Typography> Cà chua tươi ngon mới được nhập</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">$9.99</TableCell>
                                            <TableCell align="right">1</TableCell>
                                            <TableCell align="right">$9.99</TableCell>
                                            <TableCell align="right">
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">Total price</TableCell>
                                        <TableCell align="left">$400</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Discount</TableCell>
                                        <TableCell align="left">$400</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Total</TableCell>
                                        <TableCell align="left" sx={{color: 'red', fontWeight: 'bold'}}>$400</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                            <Button variant="contained" color="secondary" sx={{ m: 2 }}>Continue</Button>
                            <Button variant="contained" color="primary" >Checkout</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
     );
}

export default ShoppingCart;