import Layout from "../components/Layout/Layout";
import {Button, Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { MenuList } from '../data/data'
import AddIcon from '@mui/icons-material/Add';
function Menu() {
    return (
        <Layout>
            <Box sx={{display: 'flex', flexWrap: "wrap", justifyContent: "center", mt: "20px"}}>
                {MenuList.map(menu => (
                    <Card sx={{maxWidth: '390px', display: "flex", m: 2}}>
                        <CardActionArea>
                            <CardMedia sx={{ minHeight: '400px' }} component={'img'} src={menu.image} alt={menu.name} />
                            <CardContent>
                                <Typography variant="h5" guterBottom component={"div"} sx={{fontWeight: 'bold', color: 'green'}}>
                                    {menu.name}
                                </Typography>
                                <Typography variant="body2">
                                    {menu.description}
                                </Typography>
                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography variant="body2" sx={{ color: "red", fontSize: "30px", mt: '3px' }}>
                                        ${menu.price}
                                    </Typography>
                                    <Typography sx={{mt: '3px'}}>
                                        <Button variant="contained" href="#outlined-buttons" startIcon={<AddIcon />} sx={{ color: 'white', border: 'none' }}>Order</Button>
                                    </Typography>
                                </Box>
                                
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Layout>
    );
}

export default Menu;