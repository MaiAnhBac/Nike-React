import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
function Gototop() {
    const [top, setTop] = useState(false)
    const style = { position:'fixed',
                    bottom: '50px',
                    right: '50px',
                    height: '40px',
                    minWidth: '30px',
                    background: '#d1d5db',
                    borderRadius: '50%',
                    padding: '10px',
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                    '&:hover': {background: '#f3f4f6'},
                    "@media (max-width: 600px)": {right: '20px'}
                }
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setTop(true)
            }
            else {
                setTop(false)
            }
        })
    }, [])
    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    return ( 
        <div>
            {top && (<Button sx={style} onClick={handleGoToTop} title='Go to top'><KeyboardControlKeyIcon sx={{ color: 'black', fontSize: '1.3rem' }} /></Button>)}
        </div>
     );
}

export default Gototop;