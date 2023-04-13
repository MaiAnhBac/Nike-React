import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {getAllCategory, createNewProduct,uploadFile } from '../data/API'
import toast from 'react-hot-toast';
import '../styles/NewProduct.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
function NewProduct() {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([])
    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [selected, setSelected] = useState()
    const [error, setError] = useState(false)
    const [progress, setProgress] = useState(false);
    const [imageProduct, setImageProduct] = useState([])
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleChangePrice = (e) => {
        setPrice(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleChangeImage = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        axios
            .post("https://api.escuelajs.co/api/v1/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setImageProduct([res?.data?.location])

            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleChangeCate = (e) => {
        setSelected(e.target.value);
    }
    const onSubmitProduct = (e) => {
        e.preventDefault();
        setProgress(true)
        if(!title || !price || !description || !selected || !imageProduct){
            setError(true)
            setProgress(false)
        }
        else {
            setError(false)
            setTimeout(() => {
                setProgress(false)
                createNewProduct(title, price, description, selected, imageProduct)
                    .then(() => {
                        toast.success('Create a successful new product!');
                        setTitle('')
                        setPrice('')
                        setDescription('')
                        setSelected('')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }, 5000)
        }
    }
    useEffect(() => {
        getAllCategory()
            .then((category) => {
                setCategory(category)
            })
    }, [])
    return ( 
        <Box>
            <Button variant="outlined" onClick={handleOpen} className="btnNewProduct" color="secondary" sx={{ textTransform: 'capitalize', right: '123px', p: 0, mt: 1 }}>New</Button>
            <Dialog open={open} onClose={handleClose}>
                {progress && <Backdrop open={progress} sx={{color: '#FF9933', bgcolor: 'rgba(192,192,192,0.1)', zIndex: (theme) => theme.zIndex.drawer + 1 }}><CircularProgress color="inherit" /></Backdrop>}
                <DialogTitle align="center" sx={{ color: '#EC870E', fontWeight: 'bold' }}>Create new a product</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField id="outlined-title" value={title || ""} onChange={handleChangeTitle} label="Title" variant="outlined" sx={{my: 1}} />
                    {error && <p className="errPro">Please enter product name!</p>}
                    <TextField id="outlined-price" label="Price" type="number" value={price || ""} onChange={handleChangePrice} variant="outlined" sx={{mb: 1}} />
                    {error && <p className="errPro">Please enter product price!</p>}
                    <TextField id="outlined-description" label="Description" value={description || ""} onChange={handleChangeDescription} variant="outlined" sx={{mb: 1}} />
                    {error && <p className="errPro">Please enter description!</p>}
                    <FormControl fullWidth sx={{mb: 1}}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selected || ""} label="CategoryId" onChange={handleChangeCate}>
                            {category.map(cate => (
                                <MenuItem value={cate.id} key={cate.id}>{cate.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {error && <p className="errPro">Please select the product category!</p>}
                    <TextField id="outlined-images" type="file" name="file" onChange={handleChangeImage} variant="outlined" sx={{mb: 1}} />
                    {error && <p className="errPro">Please choose your photo file!</p>}
                </DialogContent>
                <DialogActions sx={{ mr: 3 }}>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={onSubmitProduct}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
        );
}

export default NewProduct;