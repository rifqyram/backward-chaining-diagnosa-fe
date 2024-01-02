import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import {useSelector} from "react-redux";
import UserAvatar from '../../../assets/images/user-avatar.png';

const HeaderAdmin = () => {
    const navigate = useNavigate();
    const {authService} = useContext(ServiceContext);
    const {username} = useSelector(state => state.auth);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    }

    return (
        <div className='d-flex justify-content-end align-items-center py-2 px-4 bg-secondary mb-4 shadow-sm'>
            <img src={UserAvatar} alt="user" className='rounded-5 border border-1 p-1' width={24}/>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle text-primary-text" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                    {username ?? 'User'}
                </button>
                <ul className="dropdown-menu">
                    <li className='dropdown-item'><Link to={'/'}><button className="border-0 bg-transparent text-decoration-none text-primary-text">Halaman Utama</button></Link></li>
                    <li className='dropdown-item'><button onClick={handleLogout} className="border-0 bg-transparent text-decoration-none text-primary-text">Logout</button></li>
                </ul>
            </div>
        </div>
    );
};

export default HeaderAdmin;
