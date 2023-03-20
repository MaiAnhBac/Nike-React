import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RemoveCart } from "../redux/cartSystem";
import { Typography, Box, CardMedia, Grid, Button, IconButton, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from "../components/Layout/Layout";
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import '../styles/Shoppingcart.css';

function ShoppingCart() {
    const { carts } = useSelector((item) => item.user)
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)
    /*  useMemo */
    // const handleTotal = useMemo(() => {
    //     let ans = 0;
    //     carts.map(item => {
    //         ans += item.amount * item.price
    //     })
    //     return ans;
    // }, [])
    const handleTotal = () => {
        let ans = 0;
        carts.map(item => {
            ans += item.amount * item.price
        })
        setTotal(ans)
    }
    useEffect(() => {
        handleTotal();
    })
    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Grid className='grid' container spacing={2} sx={{ p: 4, '& h4': { textAlign: 'center' } }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Shopping Cart</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} sx={{maxWidth: '100%'}}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Operation</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {carts.map(cart => (
                                            <TableRow key={cart.id}>
                                                <TableCell className='cell' sx={{ display: 'flex'}}>
                                                    <CardMedia className='img' src={cart.images} component={'img'} sx={{ maxWidth: '250px', maxHeight: '150px' }} />
                                                    <Box className='box' sx={{ m: 1 }}>
                                                        <Typography className='titleh5' variant='h5' sx={{ fontWeight: 'bold', color: 'green' }}>{cart.title}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">${cart.price}</TableCell>
                                                <TableCell align="right">
                                                    <TextField size="small" type="number" value={cart.amount} style={{ width: "60px", height: "60px", marginTop: '12px' }} inputProps={{ min: 1, max: 100 }} />
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: 'red', fontWeight: 'bold' }}>${cart.price * cart.amount} </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => {
                                                        dispatch(RemoveCart(cart));
                                                        swal("Delete To Cart", "You clicked the button!", "success");
                                                    }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} md={3} sx={{maxWidth: '100%'}}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">Total price:</TableCell>
                                        <TableCell align="left">{total}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Discount:</TableCell>
                                        <TableCell align="left">0%</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" sx={{ fontWeight: 'bold', color: 'red', fontSize: '18px' }}>Total:</TableCell>
                                        <TableCell align="left" sx={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>{total} đ</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                            <Link to={'/menu'} style={{ textDecoration: 'none' }} >
                                <Button variant="contained" color="secondary" sx={{ m: 2 }}>Continue</Button>
                            </Link>
                            <Button variant="contained" color="primary">Checkout</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

export default ShoppingCart;