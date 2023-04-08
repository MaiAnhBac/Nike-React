import BackspaceIcon from '@mui/icons-material/Backspace';
import IconButton from '@mui/material/IconButton';
import { useParams } from "react-router-dom";
import {deleteProduct} from '../data/API'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
function DeleteProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const onDeleteProduct = (e) => {
        e.preventDefault();
        deleteProduct(id)
            .then((data) => {
                toast.success('Delete product successfully!');
                navigate('/shop')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <IconButton aria-label="delete" size="small" onClick={onDeleteProduct}>
            <BackspaceIcon fontSize="inherit" titleAccess='Delete Product' />
        </IconButton>
    );
}

export default DeleteProduct;