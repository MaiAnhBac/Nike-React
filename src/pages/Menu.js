import Layout from "../components/Layout/Layout";
import { useState } from "react";
import {FormControl,InputLabel,Select,MenuItem,Button, Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { MenuList } from '../data/data'
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
function Menu() {
    const [selected, setSelected] = useState('')
    const handleChange = (event) => {
        setSelected(event.target.value)
        console.log(event.target.value)
    }
    return (
        <Layout>
            <Box sx={{display: 'flex', flexWrap: "wrap", justifyContent: "center", mt: "20px"}}>
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{mt: '10px'}}>Chọn lọc</InputLabel>
                        <Select value={selected} onChange={handleChange} labelId="demo-simple-select-label" id="demo-simple-select" label="Chọn lọc" sx={{width: '300px', mt: '10px'}}>
                            {MenuList.filter((obj, index) =>
                                MenuList.findIndex((item) => item.child === obj.child) === index).map((menu, index) => (
                                    <MenuItem value={menu.child} key={index}>{menu.child}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {MenuList.map((menu, index) => (
                        <Card key={index} sx={{ maxWidth: '390px', display: "flex", m: 2 }}>
                            <CardActionArea>
                                <CardMedia sx={{ minHeight: '400px', transition: 'all .5s', '&:hover': { transform: 'scale(1.1)' } }} component={'img'} src={menu.image} alt={menu.name} />
                                <CardContent>
                                    <Typography variant="h5" guterBottom component={"div"} sx={{ fontWeight: 'bold', color: 'green' }}>
                                        {menu.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {menu.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ color: "red", fontSize: "30px", mt: '3px' }}>
                                            ${menu.price}
                                        </Typography>
                                        <Typography sx={{ mt: '3px' }}>
                                            <Button variant="contained" startIcon={<AddIcon />} sx={{ color: 'white', border: 'none', background: 'green', transition: 'all 1s', '&:hover': { background: 'red', opacity: '0.8', transform: 'scale(0.9)' } }}>
                                                <Link to="/login" style={{textDecoration: 'none', color: 'white'}}>Order</Link>
                                            </Button>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            </Box>
        </Layout>
    );
}

export default Menu;