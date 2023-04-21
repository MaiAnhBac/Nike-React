import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Contact from '../pages/Contact';
import Shop from '../pages/Shop'
import Register from '../pages/Register';
import Pagenotfound from '../pages/Pagenotfound'
import ShoppingCart from '../pages/ShoppingCart'
import ProductDetails from '../pages/Productdetails'
import SuccessCart from '../pages/SuccessCart';
import FailedCart from '../pages/FailedCart';
import Profile from '../pages/Profile';
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/pagenotfound', component: Pagenotfound},
    {path: '/contact', component: Contact},
    {path: '/shop', component: Shop},
    {path: '/shoppingcart', component: ShoppingCart},
    {path: '/productdetails/:id', component: ProductDetails},
    {path: '/success', component: SuccessCart},
    {path: '/failed', component: FailedCart},
    {path: '/profile', component: Profile},
]

const privateRoutes = []

export {publicRoutes, privateRoutes };