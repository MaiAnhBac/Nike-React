import ErrorIcon from '@mui/icons-material/Error';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
function Pagenotfound() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 2000)
    })
    return ( 
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000" alt="" style={{width: '700px'}}/>
            <h1 style={{ padding: '20px', color: 'red', textAlign: 'center' }}>404 PAGE NOT FOUND <ErrorIcon /></h1>
            <h4 style={{color: 'gray', marginBottom: '10px'}}>Sorry, the page you're looking for doesn't exist.</h4>
            <h4 style={{color: 'gray', marginBottom: '10px'}}>If you think some thin is broken, report a problem.</h4>
        </div>
     );
}

export default Pagenotfound;