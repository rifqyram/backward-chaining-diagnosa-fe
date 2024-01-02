import {userSchema} from "../../../utils/validationSchema.js";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import PropTypes from "prop-types";
import {userAction} from "../../../slices/userSlice.js";
import Select from "react-select";
import {authAction} from "../../../slices/authSlice.js";

const customStyles = (errors, touched, fieldName) => {
    let customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: '0.375rem',
            border: '1px solid #ced4da',
            boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : '',
            '&:hover': {
                borderColor: state.isFocused ? '#00ebc7' : '#ced4da'
            }
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : 'black',
            backgroundColor: state.isSelected ? '#00ebc7' : 'white',
            '&:hover': {
                backgroundColor: state.isSelected ? '#00ebc7' : '#eee'
            }
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.isFocused ? '#00ebc7' : '#495057'
        }),
    }


    let errorStyle = {};
    if (errors[fieldName] && touched[fieldName]) {
        errorStyle = {
            control: (provided) => ({
                ...provided,
                borderColor: '#dc3545',
                '&:hover': {borderColor: '#dc3545'},
            })
        };
    }

    return {
        ...customStyles,
        ...errorStyle,
    }
};

const UserForm = ({currentPage, currentSize, searchValue, setPaging}) => {
    const [showPassword, setShowPassword] = useState(false);

    const schema = userSchema();

    const {id} = useParams();
    const {authService} = useContext(ServiceContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        values: {username, password, role},
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setValues,
        errors,
        touched,
        dirty,
        isValid,
        setFieldValue,
        setFieldTouched,
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            id: null,
            username: '',
            password: '',
            role: null,
        },
        onReset: () => {
            navigate('/backoffice/users');
        },
        onSubmit: async (values) => {
            if (!isValid) return;

            if (!id) {
                handleOnSave(values);
                return;
            }

            handleOnUpdate(values);
        }
    });

    const handleOnSave = (values) => {
        const data = {...values, role: role.value};
        delete data.id;

        dispatch(userAction(async () => {
            await authService.createUser(data);
            const result = await authService.getAll({
                page: currentPage,
                size: currentSize,
                description: searchValue
            });
            setPaging(result.paging);
            return result;
        }));
        handleCloseModal();
    }

    const handleOnUpdate = (values) => {
        values = {...values, id, role: role.value};
        dispatch(userAction(async () => {
            await authService.update(values);
            const result = await authService.getAll({
                page: currentPage,
                size: currentSize,
                username: searchValue
            });
            setPaging(result.paging);
            dispatch(authAction(() => result.data.username));
            return result;
        }));
        handleCloseModal();
    }

    const handleCloseModal = () => {
        navigate('/backoffice/users');
        handleReset();
    }

    const handleRoleChange = (selectedOption) => {
        setFieldValue('role', selectedOption);
        setFieldTouched('role', true, false);
    }

    useEffect(() => {
        if (id) {
            const onGetUserById = async () => {
                const {statusCode, data} = await authService.getUserById(id);
                if (statusCode === 200) {
                    const role = {label: data.role, value: data.role}
                    await setFieldValue('id', data.id);
                    await setFieldValue('username', data.username);
                    await setFieldValue('role', role);
                }
            }
            onGetUserById();
        }
    }, [authService, id, setFieldValue, setValues])

    return (
        <div className="modal fade" id="userForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="userFormLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4 fw-bold" id="userFormLabel">
                            <i className='bi bi-person-check text-primary me-3'></i>Form
                            Gejala
                        </h1>
                        <button onClick={handleCloseModal} type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='bg-secondary p-4 rounded-2'
                              autoComplete='off'
                              onSubmit={handleSubmit}
                              onReset={handleReset}>
                            <div className="required mb-3">
                                <label htmlFor="username" className='form-label'>Username</label>
                                <input onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={username}
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
                            <div className="required mb-3">
                                <label htmlFor="password" className='form-label'>Password</label>
                                <input onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={password}
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
                                       type="checkbox" name="showPassword" id="showPassword"
                                       className='form-check-input'/>
                                <label htmlFor="showPassword" className='ms-2 form-check-label'>Tampilkan
                                    Password</label>
                            </div>
                            <div className="required mb-3">
                                <label htmlFor="role" className='form-label'>Role</label>
                                <Select
                                    isClearable
                                    options={[
                                        {
                                            label: 'Super Admin',
                                            value: 'Super Admin',
                                        },
                                        {
                                            label: 'Admin',
                                            value: 'Admin',
                                        },
                                        {
                                            label: 'User',
                                            value: 'User',
                                        }
                                    ]}
                                    inputId='role'
                                    onChange={handleRoleChange}
                                    onBlur={handleBlur}
                                    value={role}
                                    name="role"
                                    id="role"
                                    className={`text-normal ${
                                        touched.role && errors.role && 'is-invalid'
                                    }`}
                                    styles={customStyles(errors, touched, 'role')}
                                />
                                <div className="invalid-feedback">
                                    {touched.role && errors.role}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="btn-group">
                                    <button disabled={!isValid || !dirty}
                                            type='submit'
                                            data-bs-dismiss="modal"
                                            className='btn btn-primary'>
                                        <i className='bi bi-save me-2'></i>
                                        {!id ? 'Simpan' : 'Simpan Perubahan'}
                                    </button>
                                    {id &&
                                        <button
                                            type='button'
                                            data-bs-target="#confirmationModal"
                                            data-bs-toggle="modal"
                                            className="btn btn-danger text-white">
                                            <i className="bi bi-trash me-2"></i>
                                            <span>Hapus</span>
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserForm.propTypes = {
    currentPage: PropTypes.any,
    currentSize: PropTypes.any,
    searchValue: PropTypes.any,
    setPaging: PropTypes.any
}

export default UserForm;