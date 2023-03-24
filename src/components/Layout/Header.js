import {useSelector} from 'react-redux';
import { useState } from 'react';
import {NavLink} from 'react-router-dom';
import '../../styles/HeaderStyles.css'
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import logofm from '../../images/e.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Badge from '@mui/material/Badge';
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonIcon from '@mui/icons-material/Person';
import toast from 'react-hot-toast';
function Header() {
    const navigate = useNavigate();
    const userLogin = JSON.parse(localStorage.getItem('user')) || null
    const {carts} = useSelector((item) => item.user)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    const handleLogOut = () =>{
        localStorage.removeItem("user")
        localStorage.removeItem('cart')
        toast.success('This is a success logout message!');
        navigate('/')
    }
    const drawer = (
        <Box sx={{textAlign: 'center'}}>
            <Typography color={"goldenrod"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink to='/'><img src={logofm} alt="logo" height={'70'} width={150} /></NavLink>
            </Typography>
            <Divider />
            <ul className='mobile-navigation'>
                <li>
                    <NavLink activeclassname="active" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/shop">Shop</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/shoppingcart">
                        <Badge color="secondary" badgeContent={carts.length}>
                            <ShoppingCartIcon />
                        </Badge>
                    </NavLink>
                </li>
                <li>
                    {userLogin ? (<Box><IconButton onClick={handleClick} sx={{ p: 0 }}><LockOpenIcon /></IconButton>
                            <Menu id="my-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem onClick={handleClose} sx={{borderRadius: '10px', mx: 1}}>
                                    <NavLink className='navtt' to="/personal"><Box><PersonIcon sx={{ mr: 0.7 }} /></Box>Profile</NavLink>
                                </MenuItem>
                                <MenuItem onClick={handleLogOut} sx={{borderRadius: '10px', mx: 1}}><LogoutOutlinedIcon sx={{ mr: 0.7, my: 0.4 }} />Logout</MenuItem>
                            </Menu>
                        </Box>
                    ) : (<NavLink to="/login"><LockIcon /></NavLink>)}
                </li>
            </ul>
        </Box>
    )
    return ( 
       <>
        <Box>
            <AppBar className='appbar' component={"nav"} sx={{ bgcolor: "#fcfcfa"}}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label='open drawer' edge="start" sx={{ mr: 2,color:'black', display: { sm: "none" } }} onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Typography color={"goldenrod"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink to='/'><img src={logofm} alt="logo" height={'70'} width={150}/></NavLink>
                        </Typography>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            <ul className='navigation-menu'>
                                <li>
                                    <NavLink activeclassname="active" to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/shop">Shop</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about">About</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact">Contact</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/shoppingcart">
                                        <Badge color="secondary" badgeContent={carts.length}>
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </NavLink>
                                </li>
                                <li>
                                    {userLogin ? (
                                        <Box><IconButton onClick={handleClick} sx={{p:0}}><LockOpenIcon /></IconButton>
                                            <Menu id="my-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                                                <MenuItem onClick={handleClose} sx={{borderRadius: '10px', mx: 1}}>
                                                    <NavLink className='navtt' to="/personal"><Box sx={{pb: 0}}><PersonIcon sx={{mr: 0.7}}/></Box>Profile</NavLink>
                                                </MenuItem>
                                                <MenuItem onClick={handleLogOut} sx={{borderRadius: '10px', mx: 1}}><LogoutOutlinedIcon sx={{mr: 0.7, my: 0.4}}/>Logout</MenuItem>
                                            </Menu>
                                        </Box>
                                    ) : (<NavLink to="/login"><LockIcon /></NavLink>)}
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