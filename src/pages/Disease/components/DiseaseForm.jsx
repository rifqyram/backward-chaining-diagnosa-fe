import {useFormik} from "formik";
import {diseaseSchema} from "../../../utils/validationSchema.js";
import {useDispatch} from "react-redux";
import {useContext, useEffect} from "react";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {diseaseAction} from "../../../slices/diseaseSlice.js";

const DiseaseForm = () => {
    const {diseaseService} = useContext(ServiceContext);
    const dispatch = useDispatch();
    const schema = diseaseSchema();
    const navigate = useNavigate();

    const {id} = useParams();

    const {
        values: {name, cause, solution},
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setValues,
        errors,
        touched,
        dirty,
        isValid,
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            id: null,
            name: '',
            cause: '',
            solution: ''
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

        dispatch(diseaseAction(async () => {
            const result = await diseaseService.create(data);
            if (result.statusCode === 201) {
                navigate('/backoffice/diseases');
            }
            return result;
        }));
    }

    const handleOnUpdate = (values) => {
        values = {...values, id}
        dispatch(diseaseAction(async () => {
            const result = await diseaseService.update(values);
            if (result.statusCode === 200) {
                navigate('/backoffice/diseases');
            }
            return result;
        }))
    }

    useEffect(() => {
        if (id) {
            const onGetDiaseById = async () => {
                const {statusCode, data} = await diseaseService.getById(id);
                if (statusCode === 200) {
                    setValues(data);
                }
            }
            onGetDiaseById();
        }
    }, [diseaseService, id, setValues])

    return (
        <>
            <Link to={'/backoffice/diseases'} className='text-decoration-none text-primary-text'>
                <i className='bi bi-chevron-left'></i>
                <span className='ms-2'>Kembali</span>
            </Link>
            <form autoComplete='off'
                  onSubmit={handleSubmit}
                  onReset={handleReset}
                  className='mt-4 p-4 shadow-lg rounded-2 bg-secondary'>
                <h2 className='fw-bold'>
                    <i className='bi bi-clipboard-pulse me-2 text-primary'></i>
                    Form Penyakit
                </h2>
                <div className="required mb-3">
                    <label htmlFor="name" className='form-label'>Nama Penyakit</label>
                    <input onChange={handleChange}
                           onBlur={handleBlur}
                           value={name}
                           type="text"
                           name="name"
                           id="name"
                           className={`form-control text-normal ${
                               touched.name && errors.name && 'is-invalid'
                           }`}/>
                    <div className="invalid-feedback">
                        {touched.name && errors.name}
                    </div>
                </div>
                <div className="required mb-3">
                    <label htmlFor="cause" className='form-label'>Penyebab</label>
                    <textarea onChange={handleChange}
                              onBlur={handleBlur}
                              value={cause}
                              rows={5}
                              name="cause"
                              id="cause"
                              className={`form-control text-normal ${
                                  touched.cause && errors.cause && 'is-invalid'
                              }`}>
                    </textarea>
                    <div className="invalid-feedback">
                        {touched.cause && errors.cause}
                    </div>
                </div>
                <div className="required mb-3">
                    <label htmlFor="solution" className='form-label'>Solusi</label>
                    <textarea onChange={handleChange}
                              onBlur={handleBlur}
                              value={solution}
                              rows={5}
                              name="solution"
                              id="solution"
                              className={`form-control text-normal ${
                                  touched.solution && errors.solution && 'is-invalid'
                              }`}>
                    </textarea>
                    <div className="invalid-feedback">
                        {touched.solution && errors.solution}
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button disabled={!isValid || !dirty} type='submit' className='btn btn-primary'>
                        <i className='bi bi-save me-2'></i>
                        {!id ? 'Simpan' : 'Simpan Perubahan'}
                    </button>
                    <button type='reset' className='btn btn-danger text-white'>
                        <i className='bi bi-x-lg me-2'></i>
                        Reset
                    </button>
                </div>
            </form>
        </>
    );
};

export default DiseaseForm;
