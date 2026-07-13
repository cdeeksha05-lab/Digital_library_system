import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import "../styles/Layout.css";

function Layout({children}){

    return(

        <div className="layout">

            <Navbar/>

            <div className="main">

                <Sidebar/>

                <div className="content">

                    {children}

                </div>

            </div>

            <Footer/>

        </div>

    )

}

export default Layout;