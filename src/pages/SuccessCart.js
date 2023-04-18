import { Typography, Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import Layout from "../components/Layout/Layout";
import '../styles/SuccessCart.css';
import { useNavigate } from 'react-router-dom'
function SuccessCart() {
    const navigate = useNavigate();
    const onClickNavigate = () => {
        navigate('/shop')
    }
    return ( 
        <Layout>
            <Box className='success-cart'>
                <Card elevation={4} className='success-cart-card'>
                   <Typography variant='h6' className='title-success-h6'>Thank for shopping with us!</Typography>
                   <Typography variant='h7' className='title-success'>Your order has been places successfully.</Typography>
                   <Typography className='title-success-info'>For any product related query, drop an email to <a href=''>nikewebsitecontact@shop.com</a></Typography>
                   <Button variant='text' className='btn-success' onClick={onClickNavigate}>Continue Shopping</Button>
                </Card>
            </Box>
        </Layout>
     );
}

export default SuccessCart;