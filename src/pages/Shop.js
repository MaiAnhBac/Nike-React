import { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { AddCart } from "../redux/cartSystem";
import {getAllProducts ,getAllCategory, getProductsByCate, getProductsByLimit, getProductsByPrice} from '../data/API'
import Layout from "../components/Layout/Layout";
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Card, CardActionArea, CardContent, CardMedia, Typography, CardActions } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import swal from 'sweetalert'
import {Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import '../styles/Menu.css';

function Shop() {
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
      }, []);

    useEffect(() => {
        getAllProducts()
            .then((data) => {
                const datas = Math.ceil(data.length / limit)
                setCount(datas)
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
                <Box sx={{ ml: 16, "@media (max-width: 600px)": { ml: 12 } }}>
                    {loading ? (<Skeleton variant="rounded" width={220} height={20} sx={{ mt: 3 }} />) :
                        (<Typography variant="h5" sx={{ my: 1.5, color: '#FF8C00', fontWeight: 'bold' }}>Bộ lọc sản phẩm</Typography>)}
                    {loading ? (<Skeleton variant="rounded" width={280} height={10} sx={{ mt: 2 }} />) :
                        (<Typography variant="h7" sx={{ fontStyle: 'italic' }}>Giúp lọc nhanh sản phẩm hay tìm kiếm</Typography>)}
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
                        <Card className="cardmenu" sx={{ ml: 2, height: 60, mt: 1 }}>
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
                    </Box>
                    {loading ? (<Skeleton variant="rounded" width={180} height={20} sx={{ my: 2 }} />) :
                        (<Typography variant="h6" sx={{ color: '#FF8C00', mt: 1 }}>Tất cả sản phẩm</Typography>)}
                </Box>
                <Divider className="dividermenu" variant="middle" sx={{mx: 15.7}} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {data.map((datas) => (
                        <Card key={datas.id} sx={{maxWidth: '390px', m: 2 }}>
                            <Link to={`/productdetails/${datas.id}`} className='navLink'>
                                <CardActionArea>
                                    { loading ? (<Skeleton variant="rounded" width={390} height={360}/>) :
                                        (<CardMedia sx={{ height: '400px', width: '390px', transition: 'all .5s', '&:hover': { transform: 'scale(1.1)' } }} component={'img'} src={datas.images} alt={datas.title} />)}
                                    { loading ? (<Skeleton animation="wave" width={210} height={40} sx={{mt: 1}} />) :
                                        (<CardContent sx={{ minHeight: '0px' }}>
                                            <Typography variant="h5" component={"div"} sx={{ fontWeight: 'bold', color: 'green' }}>
                                                {datas.title}
                                            </Typography>
                                        </CardContent>)}
                                </CardActionArea>
                            </Link>
                            { loading ? (<Skeleton animation="wave" sx={{height: 50}} />) :
                                (<CardActions sx={{minHeight: '100px' ,justifyContent: 'space-between', p: 2, b: 0 }}>
                                    <Typography variant="body2" sx={{ color: "red", fontSize: "30px", mt: '3px' }}>
                                        ${datas.price}
                                    </Typography>
                                    <div style={{ mt: '5px' }}>
                                        <Button variant="contained" onClick={() => {
                                            if (!isLoggedIn) {
                                                navigate('/login');
                                                swal("Please Login!", "You clicked the button!", "warning");
                                                return;
                                            }
                                            dispatch(AddCart(datas));
                                            swal("Add To Cart", "You clicked the button!", "success");
                                        }}
                                            startIcon={<AddIcon />}
                                            sx={{ mt: '4px', color: 'white', borderRadius: '40px' ,border: 'none', background: 'green', transition: 'all 1s', '&:hover': { background: 'red' } }}>
                                            Add
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
        </Layout>
    );
}

export default Shop;