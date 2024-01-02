import Navbar from "../shared/compoents/Navbar/Navbar.jsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    const year = new Date().getFullYear();

    return (
        <div>
            <Navbar/>
            <div className="container" style={{minHeight: '100dvh'}}>
                <Outlet/>
            </div>
            <div className="container-fluid bg-secondary footer text-center p-2">
                <p className='text-primary-text fs-6 fwb'>©Bikin Dev - {year}</p>
            </div>
        </div>
    );
};

export default MainLayout;