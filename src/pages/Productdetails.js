import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {getProductsByDetails} from '../data/API'
import { AddCart } from "../redux/cartSystem";
import Card from '@mui/material/Card';
import { useEffect, useState } from "react";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/AddShoppingCart';
import '../styles/Productdetails.css';
import toast from 'react-hot-toast';
import {Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import {useNavigate} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        getProductsByDetails(id)
            .then((data) => {
                setDetails(data)
            })
    }, [])
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    })
    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
          setIsLoggedIn(true);
        }
      }, []);
    return (
        <Layout>
            <Box sx={{ p: 4, m: 4 }}>
                <Card className="card" sx={{ display: 'flex'}}>
                    {loading ? (<Skeleton variant="rounded" width={750} height={700} />) : (
                        <Carousel>
                            {details.images.map((item, index) => (
                                <div key={index} className="main-slide" >
                                    <img src={item}  />
                                </div>
                            ))}
                        </Carousel>
                        )}
                    <Box sx={{m: 3, maxWidth: '1000px'}}>
                        <CardContent >
                            {loading ? (<Skeleton animation="wave" width={500} height={50} />) : (
                                <Typography className="title" gutterBottom variant="h4" component="div" sx={{ color: 'green', fontWeight: 'bold' }}>
                                    {details.title}
                                </Typography>)}
                            {loading ? (<Skeleton animation="wave" width={400} height={30} />) : (
                                <Box sx={{ display: 'flex' }}>
                                    <Typography className="cate" gutterBottom variant="h6" color="text.secondary" sx={{ mr: 1 }}>
                                        Thương hiệu:
                                    </Typography>
                                    <Typography className="cate" gutterBottom variant="h6" color="blue">
                                        {details?.category?.name}
                                    </Typography>
                                    <Typography className="cate" gutterBottom variant="h6" color="text.secondary" sx={{ mx: 1 }}>
                                        | Mã sản phẩm:
                                    </Typography>
                                    <Typography className="cate" gutterBottom variant="h6" color="blue">
                                        Chưa cập nhật
                                    </Typography>
                                </Box>)}
                            <Divider />
                            {loading ? (<Skeleton animation="wave" width={300} height={30} sx={{ mt: 2 }} />) : (
                                <Typography className="des" gutterBottom variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                                    {details.description}
                                </Typography>)}
                            {loading ? (<Skeleton animation="wave" width={120} height={70} />) : (
                                <Box sx={{ display: 'flex', mt: 6 }}>
                                    <Typography className="quanlity" variant="h6" sx={{ mr: '15px' }}>
                                        Số lượng:
                                    </Typography>
                                    <TextField className="quan" size="small" value='1' type="number" style={{ width: "60px", height: "60px" }} inputProps={{ min: 1, max: 100 }} />
                                </Box>)}
                            {loading ? (<Skeleton animation="wave" width={80} height={90} />) : (
                                <Typography className="price" gutterBottom variant="h3" color="red">
                                    ${details.price}
                                </Typography>)}
                            {loading ? (<Skeleton animation="wave" width={140} height={40} />) : (
                                <Box>
                                    <Rating name="half-rating" defaultValue={4} precision={0.5} />
                                </Box>)}
                        </CardContent>
                        {loading ? (<Skeleton animation="wave" sx={{ ml: 2 }} width={240} height={90} />) : (
                            <CardActions sx={{ display: 'fixed', bottom: 0 }}>
                                <Link to={'/shop'} className='navLink'>
                                    <Button size="large" variant="outlined" startIcon={<ArrowBackIosIcon />} sx={{ color: 'black',border: '1px solid black', '&:hover': { background: '#DCDCDC',border: '1px solid black' } }}>BACK</Button>
                                </Link>
                                <Button size="large" variant="outlined" onClick={() => {
                                    if (!isLoggedIn) {
                                        navigate('/login');
                                        toast.error('Please to login!', {icon: '⚠️'});
                                        return;
                                    }
                                    dispatch(AddCart(details));
                                    toast.success('Add to cart successfully message!');
                                }} startIcon={<AddIcon />} sx={{ color: 'black',border: '1px solid black', '&:hover': { background: '#DCDCDC', border: '1px solid black'} }}>ADD CART</Button>
                            </CardActions>)}
                        {loading ? (<Skeleton animation="wave" width={340} height={20} sx={{ ml: 2 }} />) : (
                            <Typography className="tel" gutterBottom variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                                Gọi <a style={{ textDecoration: 'none', color: 'red' }}>0987563711</a> để được tư vấn miễn phí
                            </Typography>)}
                    </Box>
                </Card>
            </Box>
        </Layout>
    );
}

export default ProductDetails;