import { Typography, Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import Layout from "../components/Layout/Layout";
import '../styles/SuccessCart.css';
function FailedCart() {
    return ( 
        <Layout>
            <Box className='failed-cart'>
                <Card elevation={4} className='failed-cart-card'>
                   <Typography variant='h6' className='title-failed'>Payment failed!</Typography>
                   <Typography className='title-failed-info'>For any product related query, drop an email to <a href=''>nikewebsitecontact@shop.com</a></Typography>
                   <Button variant='text' className='btn-failed'>Continue Shopping</Button>
                </Card>
            </Box>
        </Layout>
     );
}

export default FailedCart;