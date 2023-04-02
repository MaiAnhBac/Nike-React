import { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { AddCart } from "../redux/cartSystem";
import {getAllProducts ,getAllCategory, getProductsByCate, getProductsByLimit, getProductsByPrice} from '../data/API'
import Layout from "../components/Layout/Layout";
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Card, CardActionArea, CardContent, CardMedia, Typography, CardActions } from '@mui/material'
import AddIcon from '@mui/icons-material/AddShoppingCart';
import {Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import '../styles/Shop.css';
import toast from 'react-hot-toast';
import GoToTopButton from './Gototop';
import Newproduct from './NewProduct';
function Shop() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || []
    const navigate = useNavigate();
    const [selected, setSelected] = useState('')
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const limit = 20;
    const [value, setValue] = useState([20, 80]);
    const [count, setCount] = useState(10)
    const [max, setMax] = useState([])
    // sắp xếp mảng data theo thứ tự giảm dần của giá trị price. trả về phần từ đầu tiên của array
    // const maxPrice = max.sort((a, b) => b.price - a.price)[0];// maxPrice.price
    const handleChangePrice = (event, newValue) => {
        setValue(newValue);
        getProductsByPrice(newValue[0] ,newValue[1])
            .then((price) => {
                setData(price)
            })
      };
    const handleChangeCate = (e) => {
        setSelected(e.target.value)
        getProductsByCate(e.target.value)
            .then((datas) => {
                setData(datas)
            })
    }
    const handleOffset = (event, value) => {
        const offset = limit * (page - 1)
        setPage(value)
        getProductsByLimit(offset,limit)
            .then((offset) =>{
                setData(offset)
            })
    }
    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
          setIsLoggedIn(true);
        }
      });

    useEffect(() => {
        getAllProducts()
            .then((data) => {
                const datas = Math.ceil(data.length / limit)
                setCount(datas)
                // setMax(data)
            })
        getProductsByLimit( 1 ,limit)
            .then((offset) =>{
                setData(offset)
            })
        getAllCategory()
            .then((category) => {
                setCategories(category)
            })
    },[])
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })
    return (
        <Layout>
            <Box sx={{pt: 1, flexWrap: "wrap", mt: "20px" }}>
                <Box sx={{ ml: 16, "@media (max-width: 600px)": { ml: 12 },"@media (max-width: 414px)": { ml: 3 } }}>
                    {loading ? (<Skeleton variant="rounded" width={220} height={20} sx={{ mt: 3 }} />) :
                        (<Typography className="h5" variant="h5">Bộ lọc sản phẩm</Typography>)}
                    {loading ? (<Skeleton variant="rounded" width={280} height={10} sx={{ mt: 2 }} />) :
                        (<Typography className="h7" variant="h7">Giúp lọc nhanh sản phẩm hay tìm kiếm</Typography>)}
                    <Box sx={{ display: 'flex', justifyContent: 'left', mt: 0.5, width: '100%', "@media (max-width: 600px)": { flexDirection: 'column' } }}>
                        <Box>
                            {loading ? (<Skeleton variant="rounded" width={320} height={58} sx={{ mt: 1 }} />) :
                                (<FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" sx={{ mt: '12px' }}>Chọn lọc</InputLabel>
                                    <Select value={selected} onChange={handleChangeCate} labelId="demo-simple-select-label" id="demo-simple-select" label="Chọn lọc" sx={{ width: '300px', height: 58, mt: '10px' }}>
                                        {categories.map((cate) => (
                                            <MenuItem value={cate.id} key={cate.id}>{cate.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>)}
                        </Box>
                        <Card className="cardmenu">
                            <Box sx={{ width: 300, mt: 0.5, mx: 2 }}>
                                {loading ? (<Skeleton variant="rounded" width={290} height={10} sx={{ mt: 1.5 }} />) :
                                    (<Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                        <Typography>Lọc theo giá từ: <a className="a-price">${value[0]} </a> - <a className="a-price">${value[1]}</a></Typography>
                                    </Box>)}
                                {loading ? (<Skeleton variant="rounded" width={290} height={10} sx={{ mt: 2 }} />) :
                                    (<Slider value={value} onChange={handleChangePrice} valueLabelDisplay="auto"
                                        min={0} max={1000} step={100} marks size='medium' color="secondary" sx={{ height: 8 }}
                                    />)}
                            </Box>
                        </Card>
                        {userLogin.role === "admin" && <Newproduct />}
                    </Box>
                    {loading ? (<Skeleton variant="rounded" width={180} height={20} sx={{ my: 2 }} />) :
                        (<Typography variant="h6" className="h6">Tất cả sản phẩm</Typography>)}
                </Box>
                <Divider className="dividermenu" variant="middle" />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {data.map((datas) => (
                        <Card key={datas.id} className="cardshop">
                            <Link to={`/productdetails/${datas.id}`} className='navLink'>
                                <CardActionArea>
                                    { loading ? (<Skeleton variant="rounded" width={390} height={360}/>) :
                                        (<CardMedia className="cardmedia" component={'img'} src={datas.images} alt={datas.title} />)}
                                    { loading ? (<Skeleton animation="wave" width={210} height={40} sx={{mt: 1}} />) :
                                        (<CardContent sx={{ minHeight: '0px' }}>
                                            <Typography variant="h5" component={"div"} sx={{ fontWeight: 'bold', color: 'green' }}>
                                                {datas.title}
                                            </Typography>
                                        </CardContent>)}
                                </CardActionArea>
                            </Link>
                            { loading ? (<Skeleton animation="wave" sx={{height: 50}} />) :
                                (<CardActions className="cartactions">
                                    <Typography variant="body2" className="body2">
                                        ${datas.price}
                                    </Typography>
                                    <div style={{ mt: '5px' }}>
                                        <Button variant="outlined" onClick={() => {
                                            if (!isLoggedIn) {
                                                navigate('/login');
                                                toast.error('Please to login!', {icon: '⚠️'});
                                                return;
                                            }
                                            dispatch(AddCart(datas));
                                            toast.success('Add to cart successfully message!');
                                        }}
                                            startIcon={<AddIcon />}
                                            sx={{ mt: '4px', color: 'black', borderRadius: '10px',border: '1px solid black' , transition: 'all 1s', '&:hover': { background: '#DCDCDC', border: '1px solid black' } }}>
                                            Add cart
                                        </Button>
                                    </div>
                                </CardActions>)}
                        </Card>
                    ))}
                </Box>
            </Box> 
            <Stack spacing={2} py={3} sx={{display: 'flex', alignItems: 'center'}}>
                { loading ? (<Skeleton variant="rounded" width={360} height={30} sx={{mt: 2}}/>) :
                (<Pagination count={count} page={page} onChange={handleOffset}  variant="outlined" color="secondary" />)}
            </Stack>
            <GoToTopButton/>
        </Layout>
    );
}

export default Shop;