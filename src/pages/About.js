import Layout from "../components/Layout/Layout";
import {Box, Typography} from '@mui/material'
import '../styles/About.css'

function About() {
    return ( 
        <Layout>
            <Box sx={{my: 3,textAlign: "center", "@media (max-width: 600px)": {mt: 0, "& h3": {fontSize: "1.7rem"}}}} >
                <Typography variant="h3" fontWeight={"bold"} padding={10} color={'#EC870E'} >
                    Welcome to <span className="Nike">My Nike</span> 
                </Typography>
                <p className="box-p">
                - NIKE, Inc. designs, develops, markets and sells high quality footwear, apparel, and equipment, accessories and services. Its athletic footwear products are designed primarily for specific athletic use, although a large percentage of the products are worn for casual or leisure purposes. It focuses on NIKE Brand and Brand Jordan product offerings in seven key categories: running, basketball, football, men’s training, women’s training, NIKE sportswear, and action sports. It also markets product designed for kids, as well as for other athletic and recreational uses such as baseball, cricket, golf, lacrosse, outdoor activities, football, tennis, volleyball, walking, and wrestling
                </p>
                <br />
                <p className="box-p">- Nike, originally known as Blue Ribbon Sports (BRS), was founded by University of Oregon track athlete Philip Knight and his coach Bill Bowerman in January 1964. The company initially operated as a distributor for Japanese shoe maker Onitsuka Tiger (now ASICS), making most sales at track meets out of Knight’s automobile.</p>
                <br />
                <p className="box-p">- Nike Inc. will buy back $8 billion of Nike’s class B stock in 4 years after the current $5 billion buyback program is completed in second quarter of fiscal 2013. Up to September 2012, Nike Inc. has bought back $10 billion of stock. On December 19, 2013, Nike Inc’s quarterly profit rose as a result of global orders for merchandise for delivery by April increased 13 percent. Future orders of shoes or clothes for delivery between December and April, rose to $10.4 billion. Nike shares (NKE) rose 0.6 percent to $78.75 in extended trading.”</p>
            </Box>
        </Layout>
     );
}

export default About;