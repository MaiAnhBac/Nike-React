import { Typography, Box, CardMedia, Grid, Button, IconButton } from '@mui/material';
import {Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from "../components/Layout/Layout";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { RemoveCart } from "../redux/cartSystem";
import swal from 'sweetalert'
import { useEffect, useState } from 'react';
function ShoppingCart() {
    const {cart} = useSelector((item) => item.user)
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)

    const handleTotal = () => {
        let ans = 0;
        cart.map(item => {
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
                <Grid container spacing={2} sx={{ p: 4, '& h4': { textAlign: 'center' }, "@media (max-width: 600px)": { display: 'grid'} }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Shopping Cart</Typography>
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell><Checkbox /></TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Operation</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cart.map(carts => (
                                            <TableRow key={carts.productID}>
                                                <TableCell sx={{width: 0}}><Checkbox defaultChecked/></TableCell>
                                                <TableCell sx={{ display: 'flex' }}>
                                                    <CardMedia src={carts.image} component={'img'} sx={{ maxWidth: '250px', maxHeight: '150px' }} />
                                                    <Box sx={{ m: 5 }}>
                                                        <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'green' }}>{carts.name}</Typography>
                                                        <Typography> {carts.description}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">${carts.price}</TableCell>
                                                <TableCell align="center">{carts.amount} </TableCell>
                                                <TableCell align="right" sx={{color: 'red', fontWeight: 'bold'}}>${carts.price * carts.amount} </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => {dispatch(RemoveCart(carts)); swal("Delete To Cart", "You clicked the button!", "success");}}>
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
                    <Grid item xs={6} md={3}>
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
                                        <TableCell align="left" sx={{fontWeight: 'bold'}}>Total:</TableCell>
                                        <TableCell align="left" sx={{color: 'red', fontWeight: 'bold', fontSize: '18px'}}>{total}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                            <Link to={'/menu'} style={{ textDecoration: 'none' }} >
                                <Button variant="contained" color="secondary" sx={{ m: 2 }}>Continue</Button>
                            </Link>
                            <Button variant="contained" color="primary" >Checkout</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
     );
}

export default ShoppingCart;