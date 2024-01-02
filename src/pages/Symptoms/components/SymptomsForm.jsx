import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {symptomsSchema} from "../../../utils/validationSchema.js";
import {useContext, useEffect} from "react";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import {useDispatch} from "react-redux";
import {symptomsAction} from "../../../slices/symptomsSlice.js";
import PropTypes from "prop-types";

const SymptomsForm = ({currentPage, currentSize, searchValue, setPaging}) => {
    const schema = symptomsSchema();

    const {id} = useParams();
    const {symptomsService} = useContext(ServiceContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        values: {description},
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setValues,
        errors,
        touched,
        dirty,
        isValid
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            id: null,
            description: '',
        },
        onReset: () => {
            navigate('/backoffice/symptoms');
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
        const data = {...values};
        delete data.id;

        dispatch(symptomsAction(async () => {
            await symptomsService.create(values);
            const result = await symptomsService.getAll({
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
        values = {...values, id};
        dispatch(symptomsAction(async () => {
            await symptomsService.update(values);
            const result = await symptomsService.getAll({
                page: currentPage,
                size: currentSize,
                description: searchValue
            });
            setPaging(result.paging);
            return result;
        }))
        handleCloseModal();
    }

    const handleCloseModal = () => {
        navigate('/backoffice/symptoms');
        handleReset();
    }

    useEffect(() => {
        if (id) {
            const onGetSymptomsById = async () => {
                const {statusCode, data} = await symptomsService.getById(id);
                if (statusCode === 200) {
                    setValues(data);
                }
            }
            onGetSymptomsById();
        }
    }, [symptomsService, id, setValues])

    return (
        <div className="modal fade" id="symptomsForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="symptomsFormLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4 fw-bold" id="symptomsFormLabel">
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
                                <label htmlFor="description" className='form-label'>Deskripsi Gejala</label>
                                <textarea onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={description}
                                          rows={5}
                                          name="description"
                                          id="description"
                                          className={`form-control text-normal ${
                                              touched.description && errors.description && 'is-invalid'
                                          }`}>
                                </textarea>
                                <div className="invalid-feedback">
                                    {touched.description && errors.description}
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

SymptomsForm.propTypes = {
    currentPage: PropTypes.any,
    currentSize: PropTypes.any,
    searchValue: PropTypes.any,
    setPaging: PropTypes.any
}

export default SymptomsForm;
