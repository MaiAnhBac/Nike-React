import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { AddCart } from "../redux/cartSystem";
import { getAllProducts, getAllCategory, getProductsByCate, getProductsByLimit, getProductsByPrice, getSearchProduct } from '../data/API'
import Layout from "../components/Layout/Layout";
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Card, CardActionArea, CardContent, CardMedia, Typography, CardActions } from '@mui/material'
import AddIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import '../styles/Shop.css';
import toast from 'react-hot-toast';
import GoToTopButton from './Gototop';
import Newproduct from './NewProduct';
import { useLocation } from 'react-router-dom';
import Aos from "aos";
import "aos/dist/aos.css";
function Shop() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || []
    const navigate = useNavigate();
    const [selected, setSelected] = useState('')
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [LowHigh, setLowHigh] = useState('Default');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const limit = 20;
    const [value, setValue] = useState([20, 80]);
    const [count, setCount] = useState(10)
    const [search, setSearch] = useState('')
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    // const [max, setMax] = useState([])
    // sắp xếp mảng data theo thứ tự giảm dần của giá trị price. trả về phần từ đầu tiên của array
    // const maxPrice = max.sort((a, b) => b.price - a.price)[0];// maxPrice.price
    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const onKeyPressSearch = (e) => {
        if (search) {
            if (e.code === 'Enter') {
                getSearchProduct(search)
                    .then((title) => setData(title))
            }
        }
    }
    const onClickSearch = () => {
        if(search){
            getSearchProduct(search)
                .then((title) => setData(title))
        }
    }
    const handleChangePrice = (event, newValue) => {
        setValue(newValue);
        getProductsByPrice(newValue[0], newValue[1], limit)
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
        const offset = limit * (value - 1)
        setPage(value)
        getProductsByLimit(offset, limit)
            .then((offset) => {
                setData(offset)
            })
    }
    const onChangLowHigh = (e) => {
        sortData(e.target.value)
        setLowHigh(e.target.value)
    }
    const sortData = (option) => {
        const sortedData = [...data].sort((a, b) => {
          if (option === 'Low-to-High') {
            return a.price - b.price;
          } else if (option === 'High-to-Low') {
            return b.price - a.price;
          } else if(option === 'Default') {
            return 0;
          }
        });
        setData(sortedData);
      };
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
        getProductsByLimit(1, limit)
            .then((offset) => {
                setData(offset)
            })
        getAllCategory()
            .then((category) => {
                setCategories(category)
            })
    }, [])
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })
    useEffect(() => {
        if(searchQuery){
            getSearchProduct(searchQuery)
                .then((title) => setData(title))
        }
    },[searchQuery])
    useEffect(() => {
        Aos.init()
    })
    return (
        <Layout>
            <Box className='boxall'>
                <Box className='boxall-con'>
                    {loading ? (<Skeleton variant="rounded" width={140} height={25} sx={{ mt: 2 }} />) :
                        (<Typography className="h5" variant="h5">Product filter</Typography>)}
                    {loading ? (<Skeleton variant="rounded" width={280} height={10} sx={{ mt: 2 }} />) :
                        (<Typography className="h7" variant="h7">Helps to quickly filter or search for products</Typography>)}
                    <Box className='boxfilter'>
                        <Box className='boxfilter-none'>
                            <Box>
                                {loading ? (<Skeleton variant="rounded" width={300} height={58} sx={{ mt: 1 }} />) :
                                    (<FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={{ mt: '10px', ml: 1.3 }}>Select</InputLabel>
                                        <Select value={selected} onChange={handleChangeCate} labelId="demo-simple-select-label" id="demo-simple-select" label="Chọn lọc" sx={{ width: '300px', height: 58, mt: '10px', borderRadius: 4 }}>
                                            {categories.map((cate) => (
                                                <MenuItem value={cate.id} key={cate.id}>{cate.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>)}
                            </Box>
                            <Card className="cardmenu" variant="outlined">
                                <Box className='cardmenu-con'>
                                    <Box>
                                    {loading ? (<Skeleton variant="rounded" width={250} height={10} sx={{ mt: 1.5 }} />) :
                                        (<Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                            <Typography>Price Range from <a className="a-price">${value[0]} </a> › to <a className="a-price">${value[1]}</a></Typography>
                                        </Box>)}
                                    {loading ? (<Skeleton variant="rounded" width={250} height={10} sx={{ mt: 2 }} />) :
                                        (<Slider value={value} onChange={handleChangePrice} valueLabelDisplay="auto"
                                            min={0} max={1000} step={100} size='medium' color="secondary" sx={{ height: 8 }}
                                        />)}
                                    </Box>
                                </Box>
                                    <Divider orientation="vertical"></Divider>
                            </Card>
                            <Box className="card-lowtohigh">
                                {loading ? (<Skeleton variant="rounded" width={300} height={58} sx={{ mt: 1 }} />) :
                                    (<FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-labell" sx={{ mt: '10px', ml: 1.5 }}>Select</InputLabel>
                                        <Select value={LowHigh} onChange={onChangLowHigh} labelId="demo-simple-select-labell" id="demo-simple-selectt" label="Chọn lọc" sx={{ width: '300px', height: 58, mt: '10px', borderRadius: 4 }}>                                  
                                                <MenuItem value="Default">Default</MenuItem>
                                                <MenuItem value="Low-to-High">Low to Hight</MenuItem>
                                                <MenuItem value="High-to-Low">High to Low</MenuItem>
                                        </Select>
                                    </FormControl>)}
                            </Box>
                        </Box>
                        <Box sx={{ mr: 17, mt: 2 }}>
                        {loading ? (<Skeleton variant="rounded" width={220} height={40} sx={{ mt: 1 }} />) :(
                            <div className="search">
                                <input type="text" className="search__input" placeholder="Search product here..." value={search} onKeyPress={onKeyPressSearch}  onChange={handleChangeSearch} />
                                <button className="search__button" onClick={onClickSearch}  >
                                    <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                                        <g>
                                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>)}
                        </Box>
                    </Box>
                    {loading ? (<Skeleton variant="rounded" width={120} height={20} sx={{ my: 2 }} />) : (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1.5 }}>
                            <Typography variant="h6" className="h6">All products</Typography>
                            {userLogin.role === "admin" && <Newproduct />}
                        </Box>)}
                </Box>
                <Divider className="dividermenu" variant="middle" />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {data.map((datas) => (
                        <Card data-aos="fade-up"
                        data-aos-duration="3000" key={datas.id} className="cardshop">
                            <Link to={`/productdetails/${datas.id}`} className='navLink'>
                                <CardActionArea>
                                    {loading ? (<Skeleton variant="rounded" width={390} height={360} />) :
                                        (<CardMedia className="cardmedia" component={'img'} src={datas.images} alt={datas.title} />)}
                                    {loading ? (<Skeleton animation="wave" width={210} height={40} sx={{ mt: 1 }} />) :
                                        (<CardContent sx={{ minHeight: '0px' }}>
                                            <Typography variant="h5" component={"div"} sx={{ fontWeight: 'bold', color: 'green', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                                {datas.title}
                                            </Typography>
                                        </CardContent>)}
                                </CardActionArea>
                            </Link>
                            {loading ? (<Skeleton animation="wave" sx={{ height: 50 }} />) :
                                (<CardActions className="cartactions">
                                    <Typography variant="body2" className="body2" >
                                        ${datas.price}
                                    </Typography>
                                    <div style={{ mt: '5px' }}>
                                        {/* Đã bán 1,4k */}
                                        <Button variant="outlined" onClick={() => {
                                            if (!isLoggedIn) {
                                                navigate('/login');
                                                toast.error('Please to login!', { icon: '⚠️' });
                                                return;
                                            }
                                            dispatch(AddCart(datas));
                                            toast.success('Add to cart successfully!');
                                        }}
                                            sx={{ mt: '4px', color: 'black', borderRadius: '10px', border: '1px solid black', transition: 'all 1s', '&:hover': { background: '#DCDCDC', border: '1px solid black' } }}>
                                            <AddIcon />
                                        </Button>
                                    </div>
                                </CardActions>)}
                        </Card>
                    ))}
                </Box>
            </Box>
            <Stack spacing={2} py={3} sx={{ display: 'flex', alignItems: 'center' }}>
                {loading ? (<Skeleton variant="rounded" width={360} height={30} sx={{ mt: 2 }} />) :
                    (<Pagination count={count} page={page} onChange={handleOffset} variant="outlined" color="secondary" />)}
            </Stack>
            <GoToTopButton />
        </Layout>
    );
}

export default Shop;