import {useSelector} from 'react-redux';
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import {Link, NavLink} from 'react-router-dom';
import '../../styles/HeaderStyles.css'
import logo from '../../images/food.png'
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Badge from '@mui/material/Badge';
function Header() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null
    const {cart} = useSelector((item) => item.user)
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    const drawer = (
        <Box  sx={{textAlign: 'center'}}>
            <Typography color={"goldenrod"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to={'/'}><img src={logo} alt="logo" height={'70'} width={150} /></Link>
            </Typography>
            <Divider />
            <ul className='mobile-navigation'>
                <li>
                    <NavLink activeClassName="active" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/menu">Menu</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/shoppingcart">
                        <Badge color="secondary" badgeContent={cart.length}>
                            <ShoppingCartIcon />
                        </Badge>
                    </NavLink>
                </li>
                <li>
                    {userLogin ? (<NavLink to="/logout"><LockOpenIcon /></NavLink>) : (<NavLink to="/login"><LockIcon /></NavLink>)}
                </li>
            </ul>
        </Box>
    )
    return ( 
       <>
        <Box>
            <AppBar component={"nav"} sx={{ bgcolor: "black"}}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label='open drawer' edge="start" sx={{ mr: 2, display: { sm: "none" } }} onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Typography color={"goldenrod"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to={'/'}><img src={logo} alt="logo" height={'70'} width={150}/></Link>
                        </Typography>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            <ul className='navigation-menu'>
                                <li>
                                    <NavLink activeClassName="active" to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/menu">Menu</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about">About</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact">Contact</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/shoppingcart">
                                        <Badge color="secondary" badgeContent={cart.length}>
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </NavLink>
                                </li>
                                <li>
                                    {userLogin ? (<NavLink to="/logout"><LockOpenIcon /></NavLink>) : (<NavLink to="/login"><LockIcon /></NavLink>)}
                                </li>
                            </ul>
                        </Box>
                    </Toolbar>
            </AppBar >
            <Box component="nav">
                <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} sx={{display: {xs: 'block', sm: 'none'}, "& .MuiDrawer-paper": {
                    boxSizing: 'border-box',
                    width: '240px',
                }}}>
                    {drawer}
                </Drawer>
            </Box>
            <Toolbar />
        </Box>
       </>
     );
}

export default Header;