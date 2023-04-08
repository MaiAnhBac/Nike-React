import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RemoveCart } from "../redux/cartSystem";
import { Typography, Box, CardMedia, Grid, Button, IconButton, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from "../components/Layout/Layout";
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import '../styles/Shoppingcart.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
function ShoppingCart() {
    const navigate = useNavigate();
    const userLogin = JSON.parse(localStorage.getItem('user')) || null
    const { carts } = useSelector((item) => item.user)
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)
    const [radio, setRadio] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorAddress, setErrorAddress] = useState(false);
    const [errorRadio, setErrorRadio] = useState(false);
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(false);
    const handleChangePhone = (e) => {
        setPhone(e.target.value)   
    }
    const handleChangeAddress = (e) => {
        setAddress(e.target.value)  
    }
    const handleChangeRadio = (e) => {
        setRadio(e.target.value) 
    }
    const onSubmitCart = (e) => {
        e.preventDefault();
        setProgress(true)
        if (!phone || !address || !radio) {
            setErrorPhone(true)
            setErrorAddress(true)
            setErrorRadio(true)
            setProgress(false)
        }
        else {
            setErrorPhone(false)
            setErrorAddress(false)
            setErrorRadio(false)
            setTimeout(() => {
                toast.success('Order success message!');
                setProgress(false)
                setOpen(true)
            }, 4000)
        }
    }
    const onClickShop = () => {
        navigate('/shop')
    }
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
            {progress && <Backdrop open={progress} sx={{color: '#FF9933', bgcolor: 'rgba(192,192,192,0.1)', zIndex: (theme) => theme.zIndex.drawer + 1 }}><CircularProgress color="inherit" /></Backdrop>}
            {carts.length === 0 ? (<Box className='empty' sx={{ p: 45, textAlign: 'center', fontSize: '20px', color: '#808080' }}>Your shopping cart is empty.</Box>) : (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className='grid' container spacing={2} sx={{ p: 4, '& h4': { textAlign: 'center', color: '#EC870E', fontWeight: 'bold' } }}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Shopping Cart</Typography>
                        </Grid>
                        <Grid item xs={6} md={9} sx={{ maxWidth: '100%' }}>
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
                                                    <TableCell className='cell' sx={{ display: 'flex' }}>
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
                                                            toast.success('Delete product successfully message!');
                                                        }}>
                                                            <DeleteIcon titleAccess='Delete cart' />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ maxWidth: '100%' }}>
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
                            <Divider sx={{ mt: 2 }} />
                            <form onSubmit={onSubmitCart}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', my: 1 }}>
                                    <Typography sx={{ my: 1, fontWeight: 'bold' }}>Ordering information</Typography>
                                    <TextField id="name" label="First and last name" value={userLogin.name} variant="outlined" sx={{ my: 1 }} />
                                    <TextField id="phone" type='tel' label="Phone number" value={phone || ""} onChange={handleChangePhone} variant="outlined" sx={{ my: 1 }} />
                                    {errorPhone && <p className='errorcart'>Please enter your phone number</p>}
                                    <TextField id="address" label="Address" value={address || ""} onChange={handleChangeAddress} variant="outlined" sx={{ my: 1 }} />
                                    {errorAddress && <p className='errorcart'>Please enter your delivery address</p>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Choose payment method:</FormLabel>
                                        <RadioGroup onChange={handleChangeRadio} value={radio || ""}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="Payment by domestic ATM card (Internet Banking)" control={<Radio />} disabled label="Payment by domestic ATM card (Internet Banking)" />
                                            <FormControlLabel value="Payment on delivery (COD)" control={<Radio />} label="Payment on delivery (COD)" />
                                            <FormControlLabel value="Bank transfer" control={<Radio />} disabled label="Bank transfer" />
                                        </RadioGroup>
                                    </FormControl>
                                    {errorRadio && <p className='errorcart'>Please choose your payment method</p>}
                                </Box>
                                <Divider />
                                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                    <Button onClick={onSubmitCart} variant="contained" color="primary" sx={{ m: 2 }} >Checkout</Button>
                                    <Dialog open={open}>
                                        <DialogTitle align="center" sx={{ fontWeight: 'bold'}} >
                                            <Box sx={{display: 'flex', justifyContent: 'center' }}>
                                                <CheckCircleIcon sx={{ mt: 0.3, color: '#008000', mr: 0.5 }} />
                                                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thank you for your order</Typography>
                                            </Box>
                                            <Typography sx={{ my: 1, fontStyle: 'italic' }}>Thank you for trusting and ordering our products. Please check your information and we will contact you</Typography>
                                        </DialogTitle>
                                        <DialogContent >
                                            <Typography sx={{ my: 1, fontWeight: 'bold' }}>Ordering information</Typography>
                                            <Typography sx={{ my: 1 }}>- {userLogin.name}</Typography>
                                            <Typography sx={{ my: 1}}>- {phone}</Typography>
                                            <Typography sx={{ my: 1, fontWeight: 'bold' }}>Delivery address</Typography>
                                            <Typography sx={{ my: 1}}>- {address}</Typography>
                                            <Typography sx={{ my: 1, fontWeight: 'bold' }}>Choose payment method</Typography>
                                            <Typography sx={{ my: 1}}>- {radio}</Typography>
                                            <Typography sx={{ my: 1, fontWeight: 'bold' }}>Shipping method</Typography>
                                            <Typography sx={{ my: 1}}>- Delivery to your doorstep</Typography>
                                            <Typography sx={{ my: 1, fontWeight: 'bold' }}>Delivery estimate: 5 days</Typography>
                                        </DialogContent>
                                        <DialogActions sx={{ mr: 3, mb: 1 }}>
                                            <Button variant="contained" color="success" onClick={onClickShop} >
                                                Continue to buy
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Box>)}
        </Layout>
    );
}

export default ShoppingCart;