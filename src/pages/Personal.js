import { useEffect, useState } from "react";
import {updateUser, getUser, updateUserInfo} from '../data/API'
import axios from 'axios';
import { Button, Typography, Box, Grid, Card } from "@mui/material";
import { useNavigate } from 'react-router-dom'
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
import Skeleton from '@mui/material/Skeleton';
import '../styles/Personal.css';
function Personal() {
    const userLogin = JSON.parse(localStorage.getItem('user')) || null
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')
    const [changePassword, setChangePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Edit, setEdit] = useState(false);
    const [data, setData] = useState('')
    const [name, setName] = useState(data?.name)
    const [imageUser, setImageUser] = useState()
    const [loading, setLoading] = useState(true)
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
        async function uploadAvatar() {
            try {
              await axios
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
            catch(error) {
                console.log(error);
            }
        }
        uploadAvatar();
    }
    const onClickSave = (e) => {
        e.preventDefault();
        const id = data.id;
            updateUserInfo(id,name, imageUser)
                .then((data) => {
                    setData(data)
                    setEdit(false)
                    toast.success('Successfully edited!');
                });
    }
    const onClickPassword = () => {
        const id = data.id;
        const pass = data.password;
        if(password === pass && changePassword != ""){
            if (changePassword === confirmPassword) {
                updateUser(id, changePassword)
                    .then((data) => {
                        toast.success('Change password successfully!');
                        setPassword('')
                        setConfirmPassword('')
                        setChangePassword('')
                        setTimeout(() => {
                            localStorage.removeItem('user')
                            localStorage.removeItem('cart')
                            navigate('/login')
                            toast.error('Please login again!');
                        },1000)
                        
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
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    },[])
    return ( 
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ p: 4 }}>
                    <Grid item xs={12}>
                        <Typography variant="h4" className="personal">Personal information</Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card sx={{ p: 1.5}}>
                            {loading ? (<Skeleton className="skeleton-avatar" variant="circular" width={200} height={200} sx={{m: '0 auto'}} />) :
                            (<Avatar alt="Remy Sharp" src={data?.avatar} className="avatar" />)}
                            {loading ? (<Skeleton className="skeleton-tilte" variant="text" width={100} height={40} sx={{m: '0 auto', mt: 2}} />) :
                            (<Typography variant="h5" className="name-info" sx={{p: 3, textAlign: 'center', color: 'red', fontWeight: 'bold'}}>{data?.name}</Typography>)}
                            <Box sx={{ textAlign: 'center' }}>
                                <Button variant="outlined" onClick={handleOpen} className="btn-pass" color="secondary" sx={{ m: 2,textTransform: 'capitalize' }}>Change Password</Button>
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
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Grid item xs={12}>
                            <Card>
                                <Typography variant="h6" className="title-details" sx={{p: 2, ml: 4, color: 'blue'}}>Contact information</Typography>
                                <Box sx={{ display: 'flex', mb: 2 }} className='box-flex'>
                                    <Box sx={{mx: 6}} className='flex-name'>
                                        <Typography>ID</Typography>
                                        <TextField id="outlined-id" value={data?.id || ''} disabled variant="outlined" className="tilte-input" size="small" sx={{ width: '340px' }} />
                                    </Box>
                                    <Box className='flex-name'>
                                        <Typography>Name</Typography>
                                        {Edit ? (<TextField id="outlined-name" value={name} onChange={handleChangeName} className="tilte-input" variant="outlined" size="small" sx={{ width: '340px' }} />) : (
                                            <TextField id="outlined-name" value={data?.name || ''} disabled variant="outlined" className="tilte-input" size="small" sx={{ width: '340px' }} />)}
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 2 }} className='box-flex'>
                                    <Box sx={{mx: 6}} className='flex-name'>
                                        <Typography>Role</Typography>
                                        <TextField id="outlined-role" value={data?.role || ''} disabled variant="outlined" className="tilte-input" size="small" sx={{ width: '340px' }} />
                                    </Box>
                                    <Box className='flex-name'>
                                        <Typography>Email</Typography>
                                        <TextField id="outlined-email" value={data?.email || ''} disabled variant="outlined" className="tilte-input" size="small" sx={{ width: '340px' }} />
                                    </Box>
                                </Box>
                                <Box sx={{mx: 6}} className='flex-avatar'>
                                    <Typography>Avatar</Typography>
                                    {Edit ? (<TextField id="outlined-avatar" type="file" variant="outlined" size="small" className="tilte-input" onChange={handleChangeAvatar} />) : (
                                        <TextField id="outlined-avatar" type="file" disabled variant="outlined" size="small" className="tilte-input" />)}
                                </Box>
                                {Edit ? (<Box sx={{mx: 5}} className='box-btn'>
                                    <Button variant="outlined" startIcon={<SaveIcon />} onClick={onClickSave} className="btn-info-cancel" color="primary" sx={{ my: 3, mx: 1, textTransform: 'capitalize' }}>Update</Button>
                                    <Button variant="outlined" startIcon={<CancelIcon />} onClick={onClickEdit} className="btn-info-save" color="error" sx={{ textTransform: 'capitalize' }}>Cancel</Button>
                                </Box>) : (
                                    <Button variant="outlined" startIcon={<EditIcon />} onClick={onClickEdit} className="btn-info" color="secondary" sx={{ mx: 6,my: 3 ,textTransform: 'capitalize' }}>Edit</Button>)}
                            </Card>
                        </Grid>
                    </Grid>  
                </Grid>
            </Box>
        </Layout>
     );
}

export default Personal;