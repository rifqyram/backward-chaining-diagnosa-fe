import {useContext, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {ServiceContext} from "../../context/ServiceContext.jsx";
import {authSchema} from "../../utils/validationSchema.js";
import {useFormik} from "formik";
import {authAction} from "../../slices/authSlice.js";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authService} = useContext(ServiceContext);

    const schema = authSchema();

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        dirty,
        isValid
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async (values) => {
            await dispatch(authAction(async () => {
                const result = await authService.register(values)
                if (result.statusCode === 201) {
                    authService.setToken(result.data.token);
                    navigate('/login')
                    return result.data;
                }
                return null;
            }));
        }
    });

    useEffect(() => {
        const onGetUserInfo = async () => {
            try {
                const result = await authService.getUserInfo();
                if (result.statusCode === 200) {
                    switch (result.data.role) {
                        case 'Admin':
                        case 'Super Admin':
                            navigate('/backoffice', {replace: true})
                            break;
                        case 'User':
                            navigate('/', {replace: true})
                            break;
                    }
                }
            } catch (e) {
                navigate('/register')
            }
        }
        onGetUserInfo();
    }, [authService, navigate]);

    return (
        <>
            <div className="container-fluid mt-4 ms-2">
                <Link to={'/'} className='text-decoration-none text-primary-text'>
                    <i className='bi bi-chevron-left'></i>
                    <span className='ms-2'>Kembali</span>
                </Link>
            </div>
            <div className='login-page-wrapper d-flex flex-column justify-content-center align-items-center'>
                <form autoComplete='off' onSubmit={handleSubmit}
                      className='bg-secondary p-4 rounded-2 shadow-lg' style={{width: 600}}>
                    <h2 className='text-center fs-4 fw-bold my-4'>Daftar Akun Baru</h2>
                    <div className="row mt-4">
                        <div className="mb-3">
                            <label htmlFor="username" className='form-label'>Username</label>
                            <input onChange={handleChange}
                                   onBlur={handleBlur}
                                   type="text"
                                   name="username"
                                   id="username"
                                   className={`form-control text-normal ${
                                       touched.username && errors.username && 'is-invalid'
                                   }`}/>
                            <div className="invalid-feedback">
                                {touched.username && errors.username}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className='form-label'>Password</label>
                            <input onChange={handleChange}
                                   onBlur={handleBlur}
                                   type={!showPassword ? 'password' : 'text'}
                                   name="password"
                                   id="password"
                                   className={`form-control text-normal ${
                                       touched.password && errors.password && 'is-invalid'
                                   }`}
                            />
                            <div className="invalid-feedback">
                                {touched.password && errors.password}
                            </div>
                        </div>
                        <div className="mb-3">
                            <input checked={showPassword} onChange={() => setShowPassword(!showPassword)}
                                   type="checkbox" name="showPassword" id="showPassword" className='form-check-input'/>
                            <label htmlFor="showPassword" className='ms-2 form-check-label'>Tampilkan Password</label>
                        </div>
                    </div>
                    <button type='submit' disabled={!isValid || !dirty}
                            className="btn btn-primary mt-4 w-100">Daftar
                    </button>
                </form>
            </div>
        </>
    );
};

export default Register;