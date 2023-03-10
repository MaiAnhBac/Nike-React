import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Card, CardActionArea, CardContent, CardMedia, Typography, CardActions } from '@mui/material'
import { MenuList } from '../data/data'
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from 'react-redux';
import { AddCart } from "../redux/cartSystem";
import swal from 'sweetalert'
function Menu() {
    const [selected, setSelected] = useState('')
    const [List, setList] = useState(MenuList)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleChange = (e) => {
        setSelected(e.target.value)
        const filterMenu = MenuList.filter(select => select.child === e.target.value)
        setList(filterMenu);
    }
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
          setIsLoggedIn(true);
        }
      }, []);
    return (
        <Layout>
            <Box sx={{ display: 'flex', flexWrap: "wrap", justifyContent: "center", mt: "20px" }}>
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ mt: '10px' }}>Chọn lọc</InputLabel>
                        <Select value={selected} onChange={handleChange} labelId="demo-simple-select-label" id="demo-simple-select" label="Chọn lọc" sx={{ width: '300px', mt: '10px' }}>
                            {MenuList.filter((obj, index) =>
                                MenuList.findIndex((item) => item.child === obj.child) === index).map((menu, index) => (
                                    <MenuItem value={menu.child} key={index}>{menu.child}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {List.map((menu) => (
                        <Card key={menu.productID} sx={{ maxWidth: '390px', m: 2 }}>
                            <CardActionArea>
                                <CardMedia sx={{ minHeight: '400px', transition: 'all .5s', '&:hover': { transform: 'scale(1.1)' } }} component={'img'} src={menu.image} alt={menu.name} />
                                <CardContent>
                                    <Typography variant="h5" guterBottom component={"div"} sx={{ fontWeight: 'bold', color: 'green' }}>
                                        {menu.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {menu.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{justifyContent: 'space-between', p: 2, b: 0}}>
                                <Typography variant="body2" sx={{ color: "red", fontSize: "30px", mt: '3px' }}>
                                    ${menu.price}
                                </Typography>
                                <div style={{ mt: '5px' }}>
                                    <Button variant="contained" onClick={() => {
                                        if (!isLoggedIn) {
                                            swal("Please Login!", "You clicked the button!", "warning");
                                            return;
                                        }
                                        dispatch(AddCart(menu));
                                        swal("Add To Cart", "You clicked the button!", "success");
                                    }}
                                        startIcon={<AddIcon />}
                                        sx={{ mt: '4px', color: 'white', border: 'none', background: 'green', transition: 'all 1s', '&:hover': { background: 'red' } }}>
                                        Add to cart
                                    </Button>
                                </div>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </Box>
        </Layout>
    );
}

export default Menu;