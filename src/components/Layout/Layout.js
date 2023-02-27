import Header from "./Header";
import Footer from "./Footer";
function Layout({children}) {
    return ( 
        <>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </>
     );
}

export default Layout;
