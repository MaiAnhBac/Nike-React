import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Contact from '../pages/Contact';
import Shop from '../pages/Shop'
import Register from '../pages/Register';
import Pagenotfound from '../pages/Pagenotfound'
import ShoppingCart from '../pages/ShoppingCart'
import Personal from '../pages/Personal'
import ProductDetails from '../pages/Productdetails'
import SuccessCart from '../pages/SuccessCart';
import FailedCart from '../pages/FailedCart';
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/pagenotfound', component: Pagenotfound},
    {path: '/contact', component: Contact},
    {path: '/shop', component: Shop},
    {path: '/shoppingcart', component: ShoppingCart},
    {path: '/personal', component: Personal},
    {path: '/productdetails/:id', component: ProductDetails},
    {path: '/success', component: SuccessCart},
    {path: '/failed', component: FailedCart},
]

const privateRoutes = []

export {publicRoutes, privateRoutes };