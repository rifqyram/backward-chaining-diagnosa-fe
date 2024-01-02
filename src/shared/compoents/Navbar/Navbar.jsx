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
        authService.logout();
        navigate('/login');
    }

    useEffect(() => {
        const verifyAuth = async () => {
            dispatch(authAction(async () => {
                const result = await authService.getUserInfo();
                return result.data;
            }));
        };
        verifyAuth();
    }, [authService, dispatch, navigate])

    console.log(role)

    return (
        <nav className="navbar sticky-top bg-secondary shadow">
            <div className="container-fluid">
                <div className="container-lg d-flex justify-content-between align-items-center"
                     style={{minHeight: '65px'}}>
                    <h1 className='fs-4'>Backward Chaining App</h1>
                    <nav style={{justifyItems: 'end'}}>
                        <ul className='list-unstyled d-flex gap-4'>
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
                                <span className='btn btn-secondary'>
                                    Mulai Diagnosa
                                </span>
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
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;