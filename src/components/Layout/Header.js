import { AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import {Link, NavLink} from 'react-router-dom';
import '../../styles/HeaderStyles.css'
import logo from '../../images/food.png'
function Header() {

    return ( 
       <>
        <Box>
            <AppBar component={"nav"} sx={{ bgcolor: "black"}}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label='open drawer' edge="start" sx={{ mr: 2, display: { sm: "none" } }}>
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
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </ul>
                        </Box>
                    </Toolbar>
            </AppBar >
            <Toolbar />
        </Box>
       </>
     );
}

export default Header;