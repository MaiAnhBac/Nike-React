import {Button,TextField, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from "@mui/material";
import Layout from "../components/Layout/Layout";
import '../styles/About.css'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SendIcon from '@mui/icons-material/Send';
function Contact() {
    return ( 
        <Layout>
            <Box sx={{ my: 10, ml: 10,mr: 10, mb: 10, "& h4": { fontWeight: "bold", mb: 2, color: "green" } }}>
                <Typography variant="h4">Contact <span className="span-title">My Restaurant</span></Typography>
                <p className="p-title">Please fill out the form below to contact us</p>
                <div style={{ marginBottom: '20px' }}>
                    <TextField label="Name" id="name" fullWidth />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <TextField label="Email" id="email" fullWidth />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <TextField id="outlined-multiline-static" label="Message" multiline rows={4} fullWidth />
                </div>
                <Typography><Button variant="contained" endIcon={<SendIcon />} sx={{padding: "10px 35px", fontSize: "17px", background: "green"}}>Send</Button></Typography>
            </Box>
            <Box sx={{m: 3, ml: 10, mr: 10, "@media (max-width: 600px)": { mr: 10}}}>
                <TableContainer component={Paper}>
                    <Table aria-label="contact table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{bgcolor: 'black', color: 'white',}} align="center" colSpan={2}>Contact Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><SupportAgentIcon sx={{color: 'red', pt: 1}} />1800 000 0</TableCell>
                                <TableCell><FacebookIcon sx={{color: '#3b5998', pt: 1}} />https://www.facebook.com/</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><EmailIcon sx={{color: 'skyblue', pt: 1}} />TMA@gmail.com</TableCell>
                                <TableCell><YouTubeIcon sx={{color: '#ff0000', pt: 1}} />https://www.youtube.com/</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><CallIcon sx={{color: 'green', pt: 1}} />09876543212</TableCell>
                                <TableCell><InstagramIcon sx={{color: '#d6249f', pt: 1}} />https://www.instagram.com/</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Layout>
     );
}

export default Contact;