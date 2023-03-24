import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
function Gototop() {
    const [top, setTop] = useState(false)
    const style = { position:'fixed',
                    bottom: '50px',
                    right: '50px',
                    height: '60px',
                    width: '30px',
                    fontSize: '50px',
                    background: '#EC870E',
                    borderRadius: '50%',
                    '&:hover': {background: '#FF7F50'}
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
            {top && (<Button sx={style} onClick={handleGoToTop}><KeyboardControlKeyIcon sx={{ color: 'white' }} /></Button>)}
        </div>
     );
}

export default Gototop;