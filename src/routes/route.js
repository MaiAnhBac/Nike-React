import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Contact from '../pages/Contact';
import Menu from '../pages/Menu'
import Register from '../pages/Register';
import Pagenotfound from '../pages/Pagenotfound'
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/pagenotfound', component: Pagenotfound},
    {path: '/contact', component: Contact},
    {path: '/menu', component: Menu}
]

const privateRoutes = []

export {publicRoutes, privateRoutes };