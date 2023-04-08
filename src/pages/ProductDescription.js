import { Box, Tab, Tabs,Typography  } from '@mui/material';
import Card from '@mui/material/Card';
import { useState, useEffect } from 'react';
import logofm from '../images/e.png'
import '../styles/ProductDescription.css';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
function ProductDescription(details) {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true)
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    }, 3000)
})
    return ( 
      <Box sx={{ mt: 3 }}>
          {loading ? (<Skeleton variant="rounded" height={250} />) : (
        <Card>
          <Box>
            <Tabs value={tabIndex} onChange={handleTabChange} textColor="secondary" indicatorColor="secondary">
              <Tab label="Describe" />
              <Tab label="Introduce" />
              <Tab label="Product Reviews" />
            </Tabs>
          </Box>
          <Box sx={{ padding: 2, mx: 2 }}>
            {tabIndex === 0 && (
              <Box>
                <Typography variant='h6' className='titleh6pro'>{details.details.title}</Typography>
                <Box>
                  <Typography className='titleproduct'>• <span className='titlebold'>{details.details.description}</span></Typography>
                  <br />
                  <Typography className='titleproduct'>• <span className='titlebold'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
                  <br />
                  <Typography className='titleproduct'>• <span className='titlebold'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
                </Box>
              </Box>
            )}
            {tabIndex === 1 && (
              <Box>
                <Typography className='titleproduct'>💗 Hello everyone,<span className='titlebold'> Nike website</span> was once an online shop, taking orders.</Typography>
                <br />
                <Typography className='titleproduct'>After 2 years, because of the trust of customers for the shop and want to give customers a peace of mind when buying. The shop has officially opened the first store in Quy Nhon City 2021.</Typography>
                <br />
                <Typography className='titleproduct'>Up to now, the shop has improved the showroom for a better customer experience with the desire that customers can experience the actual products at the shop and be a reliable shopping place.</Typography>
                <br />
                <img src={logofm} className='imgdes' alt="Italian Trulli"/>
                <Typography className='titleproduct'>Up to now, with the sales guideline is <span className='titlebold'> Just Authentic</span>. Shop is confident that it will always sell Auth products at the right price and quality products. With the desire to bring value and benefits when customers buy products at the shop.</Typography>
                <br />
                <Typography className='titleproduct'>💋 After 2 years of operation, the shop would like to thank the customers who have been, are and will support the shop.</Typography>
              </Box>
            )}
            {tabIndex === 2 && (
              <Box>
                <Card sx={{p: 2, border: '2px solid gray'}}>
                  <Typography className='titlereviews'>There are currently no reviews for this product. Be the first to review this product</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <Button className='btnreview' variant="contained" color="success">Submit your review</Button>
                  </Box>
                </Card>
              </Box>
            )}
          </Box>
        </Card>)}
      </Box>
     );
}
export default ProductDescription;