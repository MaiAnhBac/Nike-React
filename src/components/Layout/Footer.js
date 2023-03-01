import {Box, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';


function Footer() {
    return ( 
       <>
            <Box sx = { {textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3}} >
                <Box sx= {{my: 0, "& svg": {
                    fontSize: "40px",
                    cursor: "pointer",
                    mr: 2,
                }}}>
                    <InstagramIcon sx={{borderRadius:'10px',background: '#ea4c89',transition: 'all 1s', '&:hover': {opacity: '0.8', transform: 'scale(1.4)'}}} />
                    <TwitterIcon sx={{borderRadius:'10px',background: '#1da1f2', transition: 'all 1s', '&:hover': {transform: 'scale(1.4)'}}} />
                    <GitHubIcon sx={{borderRadius:'10px',background: 'black', transition: 'all 1s', '&:hover': {transform: 'scale(1.4)'}}} />
                    <YouTubeIcon sx={{borderRadius:'10px',background: '#EA4335', transition: 'all 1s', '&:hover': {transform: 'scale(1.4)'}}} />
                </Box>
                <Typography variant="h6" sx={{
                    "@media (max-width: 600px)": { fontSize: "1rem"}
                }}>
                    All Rights Reserved copy by TMA Solitions Bình Định
                </Typography>
            </Box>
       </>
     );
}

export default Footer;