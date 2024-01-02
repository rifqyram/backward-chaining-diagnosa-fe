import {Outlet} from "react-router-dom";
import Sidebar from "../shared/compoents/Sidebar/Sidebar.jsx";
import HeaderAdmin from "../shared/compoents/HeaderAdmin/HeaderAdmin.jsx";

function BackofficeLayout() {
    return (
        <div className='d-flex'>
            <div className="sidebar-wrapper p-4 bg-secondary shadow-sm" style={{minWidth: 320, minHeight: '100dvh'}}>
                <Sidebar/>
            </div>
            <main className='w-100'>
                <HeaderAdmin/>
                <div className="content m-4">
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}

export default BackofficeLayout;
