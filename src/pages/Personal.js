import { useEffect, useState } from "react";
import {updateUser, getUser, updateUserInfo} from '../data/API'
import axios from 'axios';
import { Button, Typography, Box, Grid, Card } from "@mui/material";
import Layout from "../components/Layout/Layout";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
function Personal() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')
    const [changePassword, setChangePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Edit, setEdit] = useState(false);
    const [data, setData] = useState('')
    const [name, setName] = useState(data?.name)
    const [imageUser, setImageUser] = useState()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const onClickEdit = () => {
        setTimeout(() => {
            setEdit(!Edit)
        },500)
    }
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const onPassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangePassword = (e) => {
        setChangePassword(e.target.value);
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handleChangeAvatar = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        axios
            .post("https://api.escuelajs.co/api/v1/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setImageUser(res?.data?.location)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const onClickSave = (e) => {
        e.preventDefault();
        const id = data.id;
        updateUserInfo(id,name, imageUser)
            .then((data) => {
                setData(data)
                setEdit(false)
            })
    }
    const onClickPassword = () => {
        const id = data.id;
        const pass = data.password;
        if(password === pass && changePassword != ""){
            if (changePassword === confirmPassword) {
                updateUser(id, changePassword)
                    .then((data) => {
                        console.log(data);
                        toast.success('Change password successfully!');
                        setPassword('')
                        setConfirmPassword('')
                        setChangePassword('')
                    })
            }
            else {
                toast.error('Confirm password do not match!');
            }
        }
        else{
            toast.error('Old password is incorrect!');
        }
    }
    useEffect(() => {
        getUser(userLogin.id)
            .then((data) => {
                setData(data);
            })
    },[])
    return ( 
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ p: 4, '& h4': { textAlign: 'center', my: 10, fontSize: '40px', fontWeight: 'bold', color: '#EC870E' } }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Personal information</Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card sx={{ minHeight: '475px', p: 5}}>
                            <Avatar alt="Remy Sharp" src={data?.avatar} sx={{ width: '120px', height: '120px', m: '0 auto', display: 'flex', justifyContent: 'center' }} />
                            <Typography variant="h5" sx={{p: 3, textAlign: 'center', color: 'red', fontWeight: 'bold'}}>{data?.name}</Typography>
                            {/* <Typography variant="h5" sx={{ textAlign: 'center'}}>{data?.email}</Typography> */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Button variant="outlined" onClick={handleOpen} color="secondary" sx={{ m: 2,textTransform: 'capitalize' }}>Change Password</Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle align="center" sx={{color: '#EC870E', fontWeight: 'bold'}}>Change Password</DialogTitle>
                                    <DialogContent sx={{display:'flex', flexDirection: 'column'}}>
                                        <FormControl variant="outlined" sx={{ mb: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-password" sx={{background: 'white', pr: 1}}>Old password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password" name="password" onChange={onPassword}  value={password}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                        <FormControl variant="outlined" sx={{ mb: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-passwordold" sx={{background: 'white', pr: 1}}>New password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-passwordold" name="Mật khẩu mới" onChange={onChangePassword} value={changePassword}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                        <FormControl variant="outlined" sx={{ mb: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-passwordcon" sx={{background: 'white', pr: 1}}>Confirm password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-passwordcon" name="Mật khẩu mới" onChange={onChangeConfirmPassword} value={confirmPassword}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions sx={{mr: 2}}>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={onClickPassword} autoFocus>
                                            Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                               
                            </Box>
                            <Typography variant="h6" sx={{p: 3, textAlign: 'center'}}>Welcome to my Nike Website</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>ID:</TableCell>
                                            <TableCell align="left">
                                                <TextField id="outlined-id" value={data?.id || ''} disabled variant="outlined" size="small" sx={{width: '340px'}} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Name:</TableCell>
                                            <TableCell align="left">
                                                {Edit ? (<TextField id="outlined-name" value={name} onChange={handleChangeName} variant="outlined" size="small" sx={{width: '340px'}} />) : (
                                                <TextField id="outlined-name" value={data?.name || ''} disabled variant="outlined" size="small" sx={{width: '340px'}} />)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Role:</TableCell>
                                            <TableCell align="left">
                                                <TextField id="outlined-role" value={data?.role || ''} disabled variant="outlined" size="small" sx={{width: '340px'}} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Email:</TableCell>
                                            <TableCell align="left">
                                                <TextField id="outlined-email" value={data?.email || ''} disabled variant="outlined" size="small" sx={{width: '340px'}} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Avatar:</TableCell>
                                            <TableCell align="left">
                                                {Edit ? (<TextField id="outlined-avatar" type="file"  variant="outlined" size="small" onChange={handleChangeAvatar} />) : (
                                                <TextField id="outlined-avatar" type="file"  disabled variant="outlined" size="small" />)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2} sx={{ml: 4}}>
                                                {Edit ? (<Box> 
                                                    <Button variant="outlined" startIcon={<SaveIcon />} onClick={onClickSave} color="primary" sx={{ m: 2, textTransform: 'capitalize' }}>Save</Button>
                                                    <Button variant="outlined" startIcon={<CancelIcon />} onClick={onClickEdit} color="error" sx={{textTransform: 'capitalize'}}>Cancel</Button>
                                                </Box>): (
                                                    <Button variant="outlined" startIcon={<EditIcon />} onClick={onClickEdit} color="secondary" sx={{ m: 2,textTransform: 'capitalize' }}>Edit</Button>)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>  
                </Grid>
            </Box>
        </Layout>
     );
}

export default Personal;