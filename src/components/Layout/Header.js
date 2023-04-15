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
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import toast from 'react-hot-toast';
function Header() {
    const navigate = useNavigate();
    const userLogin = JSON.parse(localStorage.getItem('user')) || null
    const {carts} = useSelector((item) => item.user)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeInput, setActiveInput] = useState(false);
    const [search, setSearch] = useState('');
    const open = Boolean(anchorEl);
    //sử dụng queryParams chuyền dữ liệu qua trang Shop
    const onSubmit = (e) => {
        e.preventDefault();
        const shopURL = `/shop?search=${search}`;
        navigate(shopURL)
    }
    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleInputClick = () => {
        setActiveInput(!activeInput);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setActiveInput(false);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
        setActiveInput(false);
    }
    const handleLogOut = () =>{
        localStorage.removeItem('user')
        localStorage.removeItem('cart')
        toast.success('Logout successfully message!');
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
            </ul>
        </Box>
    )
    return ( 
       <>
        <Box>
            <AppBar className='appbar' component={"nav"} sx={{ bgcolor: "#fff"}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            <Typography color={"goldenrod"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <NavLink to='/'><img src={logofm} alt="logo" height={'70'} width={150} /></NavLink>
                            </Typography>
                        </Box>
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
                            </ul>
                        </Box>
                        <Box sx={{ mr: 4, display: 'flex' }}>
                            <IconButton color="inherit" aria-label='open drawer' edge="start" sx={{ mr: 2, color: 'black', borderRadius: '.5rem', background: '#eee', display: { sm: "none" } }} onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                            <IconButton onClick={handleInputClick} sx={{ borderRadius: '.5rem', background: '#eee', mr: 2, height: '40px', color: 'black'}}>
                                <SearchIcon />
                            </IconButton>
                            <form action="" onSubmit={onSubmit} className={`search-form ${activeInput ? 'active' : ''}`} >
                                <input className='inputsearch' type="search" id="search-box" placeholder="Search here..." value={search} onChange={onChangeSearch} />
                                <SearchIcon className='label' />
                            </form>
                            <IconButton sx={{ borderRadius: '.5rem', background: '#eee', mr: 2, height: '40px'}}>
                                <NavLink to="/shoppingcart">
                                    <Badge color="error" badgeContent={carts.length} sx={{ color: 'black'}}>
                                        <ShoppingCartIcon titleAccess='Shopping Cart' />
                                    </Badge>
                                </NavLink>
                            </IconButton>
                            {userLogin ? (
                                <Box><IconButton onClick={handleClick} title='Tài khoản' sx={{ color: 'black', borderRadius: '.5rem', background: '#eee', height: '40px' }}><LockOpenIcon /></IconButton>
                                    <Menu id="my-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                                        <MenuItem onClick={handleClose} sx={{ borderRadius: '10px', mx: 1 }}>
                                            <NavLink className='navtt' to="/personal"><Box sx={{ pb: 0 }}><PersonIcon sx={{ mr: 0.7 }} /></Box>Profile</NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogOut} sx={{ borderRadius: '10px', mx: 1 }}><LogoutOutlinedIcon sx={{ mr: 0.7, my: 0.4 }} />Logout</MenuItem>
                                    </Menu>
                                </Box>
                            ) : (<NavLink to="/login">
                                    <IconButton sx={{color: 'black', borderRadius: '.5rem', background: '#eee', height: '40px'}}>
                                        <LockIcon titleAccess='Login' sx={{alignItems: 'center', display: 'flex' }} />
                                    </IconButton>
                                </NavLink>)}
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