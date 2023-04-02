import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {getAllCategory, createNewProduct} from '../data/API'
import '../styles/NewProduct.css';
function NewProduct() {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([])
    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [selected, setSelected] = useState()
    const [images, setImages] = useState()
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
        createNewProduct(title,price,description,selected,images)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getAllCategory()
            .then((category) => {
                setCategory(category)
            })
    }, [])
    return ( 
        <Box>
            <Button variant="outlined" onClick={handleOpen} color="secondary" sx={{ m: 3, textTransform: 'capitalize' }}>Create</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle align="center" sx={{ color: '#EC870E', fontWeight: 'bold' }}>Create a product</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField id="outlined-title" value={title || ""} onChange={handleChangeTitle} label="Title" variant="outlined" sx={{my: 1.5}} />
                    <TextField id="outlined-price" label="Price" type="number" value={price || ""} onChange={handleChangePrice} variant="outlined" sx={{mb: 1.5}} />
                    <TextField id="outlined-description" label="Description" value={description || ""} onChange={handleChangeDescription} variant="outlined" sx={{mb: 1.5}} />
                    <FormControl fullWidth sx={{mb: 1.5}}>
                        <InputLabel id="demo-simple-select-label">CategoryId</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selected || ""} label="CategoryId" onChange={handleChangeCate}>
                            {category.map(cate => (
                                <MenuItem value={cate.id} key={cate.id}>{cate.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField id="outlined-images" value={images || ""}  onChange={handleChangeImage} label="Images" variant="outlined" />
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