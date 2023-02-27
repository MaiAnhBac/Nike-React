import { Button } from "@mui/material";
import Layout from "../components/Layout/Layout";
import {Link} from 'react-router-dom'
import Banner1 from '../images/ez2.jpg'
import "../styles/HomeStyles.css"
import ReplyIcon from '@mui/icons-material/Reply';

function Home() {
    return ( 
        <>
        <Layout>
            <div className="home" style={{backgroundImage: `url(${Banner1})`}}>
                <div className="headerContainer">
                    <h1>Food Website</h1>
                    <p>Best Food In VietNamese</p>
                    <Link to='/menu'> <Button startIcon={<ReplyIcon sx={{fontSize: 'inherit'}} />}>Order Now</Button></Link>
                   
                </div>
                
            </div>
        </Layout>
        </>
     );
}

export default Home;