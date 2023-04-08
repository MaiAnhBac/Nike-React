import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {getAllCategory, createNewProduct} from '../data/API'
import toast from 'react-hot-toast';
import '../styles/NewProduct.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function NewProduct() {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([])
    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [selected, setSelected] = useState()
    const [images, setImages] = useState()
    const [error, setError] = useState(false)
    const [progress, setProgress] = useState(false);
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
        setImages([e.target.value])
    }
    const handleChangeCate = (e) => {
        setSelected(e.target.value);
    }
    const onSubmitProduct = (e) => {
        e.preventDefault();
        setProgress(true)
        if(!title || !price || !description || !selected || !images){
            setError(true)
            setProgress(false)
        }
        else {
            setError(false)
            setTimeout(() => {
                setProgress(false)
                createNewProduct(title, price, description, selected, images)
                    .then(() => {
                        toast.success('Create a successful new product!');
                        setTitle('')
                        setPrice('')
                        setDescription('')
                        setSelected('')
                        setImages('')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }, 3000)
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
                    <TextField id="outlined-images" value={images || ""}  onChange={handleChangeImage} label="URL images" variant="outlined" sx={{mb: 1}} />
                    {error && <p className="errPro">Please paste the image url!</p>}
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