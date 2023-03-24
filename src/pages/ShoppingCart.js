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
import toast from 'react-hot-toast';
import '../styles/Shoppingcart.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
function ShoppingCart() {
    const { carts } = useSelector((item) => item.user)
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)
    const [radio, setRadio] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [errorName, setErrorName] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorAddress, setErrorAddress] = useState(false);
    const [errorRadio, setErrorRadio] = useState(false);
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
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
        if (name === "") {
            setErrorName(true)
        }
        else {
            setErrorName(false)
        }
        if (phone === "") {
            setErrorPhone(true)
        }
        else {
            setErrorPhone(false)
        }
        if (address === "") {
            setErrorAddress(true)
        }
        else {
            setErrorAddress(false)
        }
        if (radio === "") {
            setErrorRadio(true)
        } else {
            setErrorRadio(false)
            setName("")
            setPhone("")
            setAddress("")
            setRadio("")
            toast.success('Here is the order success message!');
        }
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
            <Box sx={{ flexGrow: 1 }}>
                <Grid className='grid' container spacing={2} sx={{ p: 4, '& h4': { textAlign: 'center', color: '#EC870E', fontWeight: 'bold' } }}>
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
                                                        toast.success('This is a success delete cart message!');
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
                        <Divider sx={{mt: 2}} />
                        <form onSubmit={onSubmitCart}>
                            <Box sx={{display: 'flex', flexDirection: 'column', my: 1}}>
                                <Typography sx={{my: 1, fontWeight: 'bold'}}>Thông tin người đặt hàng</Typography>
                                <TextField id="name" label="Họ và tên" value={name || ""} onChange={handleChangeName} variant="outlined" sx={{my: 1}} />
                                {errorName && <p style={{ color: 'red', marginLeft: 5, marginBottom: '6px', fontSize: '12px', textAlign: 'left' }}>Vui lòng nhập họ và tên của bạn</p>}
                                <TextField id="phone" type='tel' label="Số điện thoại" value={phone || ""} onChange={handleChangePhone} variant="outlined" sx={{my: 1}} />
                                {errorPhone && <p style={{ color: 'red', marginLeft: 5, marginBottom: '6px', fontSize: '12px', textAlign: 'left' }}>Vui lòng nhập số điện thoại của bạn của bạn</p>}
                                <TextField id="address" label="Địa chỉ" value={address || ""} onChange={handleChangeAddress} variant="outlined" sx={{my: 1}} />
                                {errorAddress && <p style={{ color: 'red', marginLeft: 5, marginBottom: '6px', fontSize: '12px', textAlign: 'left' }}>Vui lòng nhập địa chỉ nhận hàng của bạn</p>}
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Chọn cách thức thanh toán:</FormLabel>
                                    <RadioGroup onChange={handleChangeRadio} value={radio || ""}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="ATM" control={<Radio />} disabled label="Thanh toán bằng thẻ ATM nội địa (Internet Banking)" />
                                        <FormControlLabel value="COD" control={<Radio />} label="Thanh toán khi nhận hàng (COD)" />
                                        <FormControlLabel value="NH" control={<Radio />} disabled label="Chuyển khoản ngân hàng" />
                                    </RadioGroup>
                                </FormControl>
                                {errorRadio && <p style={{ color: 'red', marginLeft: 5, marginBottom: '6px', fontSize: '12px', textAlign: 'left' }}>Vui lòng chọn phương thức thanh toán của bạn</p>}
                            </Box>
                            <Divider />
                            
                            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                <Link to={'/shop'} style={{ textDecoration: 'none' }} >
                                    <Button variant="contained" color="secondary" sx={{ m: 2 }}>Continue</Button>
                                </Link>
                                <Button onClick={onSubmitCart } variant="contained" color="primary">Checkout</Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

export default ShoppingCart;