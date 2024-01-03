import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import {authAction} from "../../../slices/authSlice.js";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authService} = useContext(ServiceContext);
    const {username, role} = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(authAction(() => {
            authService.logout();
            return null;
        }));
        navigate('/login');
    }

    useEffect(() => {
        const verifyAuth = async () => {
            dispatch(authAction(async () => {
                try {
                    const result = await authService.getUserInfo();
                    return result.data;
                } catch (e) {
                    return null;
                }
            }));
        };
        verifyAuth();
    }, [authService, dispatch, navigate])

    return (
        <nav className='navbar sticky-top container-fluid d-flex align-items-center bg-secondary shadow'
             style={{minHeight: 70}}>
            <div className="container d-flex align-items-center justify-content-between">
                <h1 className='fs-4'>Backward Chaining App</h1>
                <ul className='list-unstyled d-flex align-items-end gap-4' style={{minHeight: 45}}>
                    <li>
                        <a href="#">
                            <span className='btn btn-secondary'>
                                Beranda
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#about">
                            <span className='btn btn-secondary'>
                                Tentang Aplikasi
                            </span>
                        </a>
                    </li>
                    <li>
                        <Link to={'/diagnoses'} className='btn btn-secondary'>
                            Mulai Diagnosa
                        </Link>
                    </li>
                    <li>
                        {username ? <>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle text-primary-text"
                                            type="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        Halo, {username ?? 'User'}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {role !== 'User' && (
                                            <li className='dropdown-item'>
                                                <Link to={'/backoffice'}>
                                                    <button
                                                        className="border-0 bg-transparent text-decoration-none text-primary-text">
                                                        Halaman Admin
                                                    </button>
                                                </Link>
                                            </li>
                                        )
                                        }
                                        <li className='dropdown-item'>
                                            <Link to={'/diagnoses/list'}>
                                                <button
                                                    className="border-0 bg-transparent text-decoration-none text-primary-text">
                                                    Daftar Diagnosa
                                                </button>
                                            </Link>
                                        </li>
                                        <li className='dropdown-item'>
                                            <button onClick={handleLogout}
                                                    className="border-0 bg-transparent text-decoration-none text-primary-text">Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </> :
                            <div className='btn-group'>
                                <Link to={'/register'} className='btn btn-primary'>Daftar</Link>
                                <Link to={'/login'} className='btn btn-outline-primary'>Login</Link>
                            </div>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;