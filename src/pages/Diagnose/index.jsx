import {Link, useNavigate} from "react-router-dom";
import {AsyncPaginate} from "react-select-async-paginate";
import {error} from "../../slices/uiSlice.js";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {useContext, useEffect, useState} from "react";
import {ServiceContext} from "../../context/ServiceContext.jsx";
import {ruleAction} from "../../slices/ruleSlice.js";
import {diagnoseSchema} from "../../utils/validationSchema.js";
import {authAction} from "../../slices/authSlice.js";
import {diagnoseAction} from "../../slices/diagnoseSlice.js";

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

const Diagnose = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {ruleService, authService, diagnosisService} = useContext(ServiceContext);

    const [symptomsRadio, setSymptomsRadio] = useState([]);
    const [radioSelections, setRadioSelections] = useState([]);

    const schema = diagnoseSchema(symptomsRadio.length);

    const {
        values: {disease: disease, symptoms},
        handleSubmit,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
        dirty,
        isValid,
    } = useFormik({
        initialValues: {
            disease: null,
            symptoms: [],
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (!isValid) return;
            const data = {
                diseaseId: values.disease.value,
                symptomsIds: [...values.symptoms.filter((symptom) => symptom !== 'no')]
            };
            dispatch(diagnoseAction(async () => {
                try {
                    await diagnosisService.create(data);
                    navigate('/diagnoses/list')
                    return []
                } catch (e) {
                    dispatch(error(e));
                }
            }))
        }
    });

    const handleRadioChange = (symptomId, value) => {
        setRadioSelections(prev => ({...prev, [symptomId]: value}));

        if (value === 'Ya') {
            setFieldValue('symptoms', [...symptoms, symptomId]);
        } else {
            setFieldValue('symptoms', [...symptoms, 'no']);
        }
    };

    const handleDiseaseChange = selectedOption => {
        setFieldValue('disease', selectedOption);
        setFieldTouched('disease', true, false);
    }

    const onGetDisease = async (inputValue, loadedOptions, {page}) => {
        try {
            const result = await ruleService.getAll({
                page: page,
                name: inputValue,
            });

            const options = result.data.map(({disease}) => ({
                label: disease.name,
                value: disease.id,
            }));

            return {
                options,
                hasMore: result.paging.hasNext,
                additional: {
                    page: page + 1,
                }
            };
        } catch (e) {
            dispatch(error(e));
        }
    }

    useEffect(() => {
        if (disease) {
            const onGetSymptomsByDiseaseId = () => {
                dispatch(ruleAction(async () => {
                    const result = await ruleService.getRuleSymptomsByDiseaseId(disease.value);
                    setSymptomsRadio(result.data);
                    return {};
                }))
            }
            onGetSymptomsByDiseaseId()
        }
    }, [disease, dispatch, ruleService, setFieldValue]);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const verifyAuth = () => {
                dispatch(authAction(async () => {
                    try {
                        const result = await authService.getUserInfo();
                        return result.data;
                    } catch (e) {
                        authService.logout();
                        navigate('/login')
                        return null;
                    }
                }));
            };
            verifyAuth();
        } else {
            navigate('/login')
        }
    }, [authService, dispatch, navigate])

    return (
        <div className='container'>
            <div className='mt-4'>
                <Link to={'/'} className='text-decoration-none text-primary-text'>
                    <i className='bi bi-chevron-left'></i>
                    <span className='ms-2'>Kembali</span>
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 p-4 bg-secondary shadow rounded-2">
                <h2>
                    <i className='bi-person-check text-primary me-3'></i>
                    Diagnosis Penyakit
                </h2>
                <div className="mb-3 form-group required">
                    <label htmlFor="disease" className='form-label'>Penyakit</label>
                    <AsyncPaginate
                        isClearable
                        loadOptions={onGetDisease}
                        additional={{page: 1}}
                        value={disease}
                        name='disease'
                        id='disease'
                        inputId='disease'
                        onChange={handleDiseaseChange}
                        onBlur={handleBlur}
                        styles={customStyles(errors, touched, 'disease')}
                    />
                    {
                        touched.disease && errors.disease && <div className='text-danger'>{errors.disease}</div>
                    }
                </div>
                {!!symptomsRadio.length && symptomsRadio.map((symptom, idx) => (
                    <div className='my-3' key={symptom.id}>
                        <p>{idx + 1}. Apakah anda mengalami <strong>{symptom.description}</strong></p>
                        <div className="form-check">
                            <input
                                type="radio"
                                name={`symptom-${symptom.id}`}
                                id={symptom.id}
                                checked={radioSelections[symptom.id] === 'Ya'}
                                onChange={() => handleRadioChange(symptom.id, 'Ya')}
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor={symptom.id}>Ya</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name={`symptom-${symptom.id}`}
                                id={`symptom-${symptom.id}-no`}
                                checked={radioSelections[symptom.id] === 'Tidak'}
                                onChange={() => handleRadioChange(symptom.id, 'Tidak')}
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor={`symptom-${symptom.id}-no`}>Tidak</label>
                        </div>
                        {errors.symptoms && errors.symptoms[symptom.id] && (
                            <div className="text-danger">{errors.symptoms[symptom.id]}</div>
                        )}
                    </div>
                ))}
                {
                    touched.symptoms && errors.symptoms && <div className='text-danger'>{errors.symptoms}</div>
                }
                {
                    !!symptomsRadio.length && (
                        <div className="d-flex gap-2">
                            <button disabled={!isValid || !dirty} type='submit' className='btn btn-primary'>
                                <i className='bi bi-save me-2'></i>
                                Simpan & Lihat Hasil
                            </button>
                        </div>
                    )
                }
            </form>
        </div>
    );
};

export default Diagnose;