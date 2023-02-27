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
                    <InstagramIcon />
                    <TwitterIcon />
                    <GitHubIcon />
                    <YouTubeIcon />
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