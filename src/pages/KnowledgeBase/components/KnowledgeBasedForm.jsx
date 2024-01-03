import {useContext, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Tooltip} from "react-tooltip";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import {useFormik} from "formik";
import {ruleSchema} from "../../../utils/validationSchema.js";
import KnowledgeBasedRuleModal from "./KnowledgeBasedRuleModal.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ruleAction} from "../../../slices/ruleSlice.js";
import {error} from "../../../slices/uiSlice.js";
import {AsyncPaginate} from "react-select-async-paginate";

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

const tooltipContent = [
    'R1: Jika suhu tubuh >= 38°C, maka demam (A → B).',
    'R2: Jika batuk, maka batuk biasa (C → D).',
    'R3: Jika demam dan diare atau tidak nafsu makan, maka influenza (B ∧ E ∨ F → G).',
    'R4: Jika influenza dan muntah, maka batuk rejan (G ∧ H → I).',
    'R5: Jika tidak nafsu makan atau muntah, maka diare (F ∨ H → E).'
].join('<br>');

function getToolTipInfoSymptomsOr() {
    return `Contoh Penggunaan: Jika Demam <b>DAN</b> Diare <b>ATAU</b> Tidak Nafsu Makan <b>MAKA</b> Batuk Rejan`;
}

function getTooltipInfoAnd() {
    return `1. Contoh Penggunaan: Jika Demam <b>DAN</b> Diare <b>ATAU</b> Tidak Nafsu Makan <b>MAKA</b> Batuk Rejan <br> 2. Contoh Penggunaan: Jika suhu tubuh >= 38°C <b>MAKA</b> Demam`;
}

const Rule = () => {

    const dispatch = useDispatch();
    const {diseaseService, symptomsService, ruleService} = useContext(ServiceContext);

    const {id} = useParams();
    const navigate = useNavigate();
    const schema = ruleSchema();

    const {
        values: {disease: disease, symptomsAnd, symptomsOr},
        handleSubmit,
        handleReset,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
        dirty,
        isValid
    } = useFormik({
        initialValues: {
            id: null,
            disease: null,
            symptomsAnd: [],
            symptomsOr: [],
        },
        validationSchema: schema,
        onReset: () => {
            setFieldValue('symptomsAnd', [])
            setFieldValue('symptomsOr', [])
        },
        onSubmit: (values) => {
            if (!id) {
                handleOnSave(values);
                handleReset();
                return;
            }

            handleOnUpdate(values);
        }
    });

    const handleAndChange = selectedOptions => {
        setFieldValue('symptomsAnd', selectedOptions);
        setFieldTouched('symptomsAnd', true, false);
    };

    const handleOrChange = selectedOptions => {
        setFieldValue('symptomsOr', selectedOptions);
        setFieldTouched('symptomsOr', true, false);
    };

    const handleDiseaseChange = selectedOption => {
        setFieldValue('disease', selectedOption);
        setFieldTouched('disease', true, false);
    }

    const handleOnSave = (values) => {
        const data = {
            diseaseId: values.disease.value,
            requiredSymptomsIds: values.symptomsAnd.map(val => val.value),
            optionalSymptomsIds: values.symptomsOr.map(val => val.value),
        }
        dispatch(ruleAction(async () => {
            const result = await ruleService.create(data);
            if (result.statusCode === 201) {
                navigate('/backoffice/knowledge-based');
            }
            return ruleService.getAll();
        }));
    }

    const handleOnUpdate = (values) => {
        const data = {
            id: id,
            diseaseId: values.disease.value,
            requiredSymptomsIds: values.symptomsAnd.map(val => val.value),
            optionalSymptomsIds: values.symptomsOr.map(val => val.value),
        }

        dispatch(ruleAction(async () => {
            const result = await ruleService.update(data);
            if (result.statusCode === 200) {
                navigate('/backoffice/knowledge-based');
            }
            return ruleService.getAll();
        }));
    }

    const onGetDisease = async (inputValue, loadedOptions, {page}) => {
        try {
            const result = await diseaseService.getAll({
                page: page,
                name: inputValue,
            });

            const options = result.data.map(disease => ({
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

    const onGetSymptoms = async (inputValue, loadedOptions, {page}) => {
        try {
            const result = await symptomsService.getAll({
                page: page,
                description: inputValue,
            });

            let options = result.data.map(symptoms => ({
                label: symptoms.description,
                value: symptoms.id,
            }));

            return {
                options: options,
                hasMore: result.paging.hasNext,
                additional: {page: page + 1}
            }
        } catch (e) {
            dispatch(error(e));
        }
    }

    useEffect(() => {
        if (id) {
            const onGetRuleById = async () => {
                try {
                    const result = await ruleService.getById(id);
                    const disease = result.data.disease;
                    const requiredSymptoms = result.data.requiredSymptoms;
                    const optionalSymptoms = result.data.optionalSymptoms;

                    await setFieldValue('disease', {label: disease.name, value: disease.id});
                    await setFieldValue('symptomsAnd', requiredSymptoms.map(symptoms => ({label: symptoms.description, value: symptoms.id})))
                    await setFieldValue('symptomsOr', optionalSymptoms.map(symptoms => ({label: symptoms.description, value: symptoms.id})))
                } catch (e) {
                    dispatch(error(e));
                }
            }
            onGetRuleById();
        }
    }, [dispatch, id, ruleService, setFieldValue]);

    return (
        <>
            <Link to={'/backoffice/knowledge-based'} className='text-decoration-none text-primary-text'>
                <i className='bi bi-chevron-left'></i>
                <span className='ms-2'>Kembali</span>
            </Link>
            <form className='mx-3 bg-secondary p-4 rounded-2'
                  onSubmit={handleSubmit}
                  onReset={handleReset}>
                <h2 className='fw-bold mb-3'><i className='bi bi-database text-primary me-3'></i>Form Basis Pengetahuan
                </h2>
                <h3>Pilih Data Penyakit</h3>
                <div className="mb-3 form-group required">
                    <label htmlFor="disease">Penyakit</label>
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
                <div className="d-flex">
                    <h3>Pilih Data Gejala</h3>
                    <i className='bi bi-question-lg fs-5 ms-3'
                       data-tooltip-id="knowledgeBaseTip"
                       data-tooltip-html={tooltipContent}
                       data-tooltip-place="right">
                    </i>
                </div>
                <div className="required my-3">
                    <label htmlFor="symptomsAnd" className='form-label me-2'>Gejala - Operasi AND</label>
                    <i className='bi bi-question-lg'
                       data-tooltip-id="knowledgeBaseTip"
                       data-tooltip-html={getTooltipInfoAnd()}
                       data-tooltip-place="right"></i>
                    <AsyncPaginate
                        isMulti
                        isClearable
                        loadOptionsOnMenuOpen={true}
                        debounceTimeout={500}
                        loadOptions={onGetSymptoms}
                        additional={{page: 1}}
                        value={symptomsAnd}
                        name='symptomsAnd'
                        id='symptomsAnd'
                        inputId='symptomsAnd'
                        onChange={handleAndChange}
                        onBlur={handleBlur}
                        styles={customStyles(errors, touched, 'symptomsAnd')}
                    />
                    {
                        touched.symptomsAnd && errors.symptomsAnd &&
                        <div className='text-danger'>{errors.symptomsAnd}</div>
                    }
                </div>

                <div className="my-3">
                    <label htmlFor="symptomsOr" className='form-label me-2'>Gejala - Operasi OR</label>
                    <i className='bi bi-question-lg'
                       data-tooltip-id="knowledgeBaseTip"
                       data-tooltip-html={getToolTipInfoSymptomsOr()}
                       data-tooltip-place="right"></i>
                    <AsyncPaginate
                        isMulti
                        loadOptionsOnMenuOpen={true}
                        isClearable
                        loadOptions={onGetSymptoms}
                        additional={{page: 1}}
                        value={symptomsOr}
                        name='symptomsOr'
                        id='symptomsOr'
                        inputId='symptomsOr'
                        onChange={handleOrChange}
                        onBlur={handleBlur}
                        styles={customStyles(errors, touched, 'symptomsOr')}
                    />
                </div>
                <div className="d-flex gap-2">
                    <button disabled={!isValid || !dirty} type='submit' className='btn btn-primary'>
                        <i className='bi bi-save me-2'></i>
                        Simpan
                    </button>
                    <button type='reset' className='btn btn-danger text-white'>
                        <i className='bi bi-x-lg me-2'></i>
                        Reset
                    </button>
                    {
                        (!!symptomsAnd.length || !!symptomsOr.length) && disease ?
                            <button className='btn fw-bold' type='button' data-bs-toggle="modal"
                                    data-bs-target="#knowledgeBasedRuleModal">
                                Lihat Hasil Rule
                            </button> : <></>
                    }
                </div>
                <Tooltip id='knowledgeBaseTip'/>
                {disease && <KnowledgeBasedRuleModal selectedAndOptions={symptomsAnd}
                                                     selectedOrOptions={symptomsOr}
                                                     disease={disease}/>}
            </form>
        </>
    )
};

export default Rule;
