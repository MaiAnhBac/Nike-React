import Layout from "../components/Layout/Layout";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function Pagenotfound() {
    return ( 
        
        <Layout>
            <h1>Page not Found</h1>
            <Badge color="secondary" badgeContent={99}>
                <ShoppingCartIcon />
            </Badge>
        </Layout>
     );
}

export default Pagenotfound;