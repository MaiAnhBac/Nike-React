import Header from "./Header";
import Footer from "./Footer";
import '../../styles/LayoutStyles.css'
function Layout({children}) {
    return ( 
        <>
            <Header />
            <div className="content">
                {children}
            </div>
            <Footer />
        </>
     );
}

export default Layout;
