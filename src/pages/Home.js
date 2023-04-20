import {Link} from 'react-router-dom'
import { Button } from "@mui/material";
import Layout from "../components/Layout/Layout";
import "../styles/HomeStyles.css"
import ReplyIcon from '@mui/icons-material/Reply';
import banner from '../images/nike.jpg'
import banner2 from '../images/nike2.jpg'
import banner3 from '../images/short.jpg'
import Paper from '@mui/material/Paper';
import Carousel from 'react-material-ui-carousel'
import nike from "../images/nike.png";
function Home() {
    const items = [
      {
        id: 1,
        img: banner,
      },
      {
        id: 2,
        img: banner2,
      },
      {
        id: 3,
        img: banner3,
      },
      ];
    return ( 
        <>
        <Layout>
          {/* <div className='home'>
            <Carousel >
              {items.map((item) => (
                <Paper key={item.id} sx={{ width: '1920px', height: '1080px' }}>
                  <div className='home-nav'>
                    <div className="headerContainer">
                      <h1>Nike Website</h1>
                      <p>Best Nike In VietNamese</p>
                      <Link to='/shop'> <Button startIcon={<ReplyIcon sx={{ fontSize: 'inherit' }} />}>Order Now</Button></Link>
                    </div>
                    <img src={item.img} alt="" />
                  </div>
                </Paper>
              ))}
            </Carousel>
          </div> */}
            <div className="home">
                <div className="headerContainer">
                    <h1>Nike Website</h1>
                    <p>Best Nike In VietNamese</p>
                    <Link to='/shop'> <Button className='btn-home' startIcon={<ReplyIcon sx={{fontSize: 'inherit'}} />}>Order Now</Button></Link>
                </div>
            </div>
        </Layout>
        </>
     );
}

export default Home;