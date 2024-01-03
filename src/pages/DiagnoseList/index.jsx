import  {useContext, useEffect} from 'react';
import {ServiceContext} from "../../context/ServiceContext.jsx";
import {useDispatch, useSelector} from "react-redux";
import {diagnoseAction} from "../../slices/diagnoseSlice.js";
import {Link} from "react-router-dom";
import EmptyState from "../../shared/compoents/EmptyState/EmptyState.jsx";

const DiagnoseList = () => {
    const {diagnosisService} = useContext(ServiceContext);
    const dispatch = useDispatch();
    const {diagnoses} = useSelector(state => state.diagnoses);

    useEffect(() => {
        const onGetDiagnoseByUserId = () => {
            dispatch(diagnoseAction(async () => {
                return await diagnosisService.getByCurrentUser({
                    page: 1,
                    size: 10
                });
            }));
        }
        onGetDiagnoseByUserId();
    }, [diagnosisService, dispatch]);

    return (
        <div className='container my-4'>
            <div className='my-4'>
                <Link to={'/'} className='text-decoration-none text-primary-text'>
                    <i className='bi bi-chevron-left'></i>
                    <span className='ms-2'>Kembali</span>
                </Link>
            </div>
            <h2 className='my-2'><i className='bi bi-list-check me-3 text-primary'></i>Daftar Hasil Diagnosa</h2>
            <div className="d-flex flex-column gap-4">
                {
                    diagnoses && !!diagnoses.length ?
                    diagnoses.map(({disease, symptomsList, percentage}, idx) => {
                        return <div key={idx} className='bg-secondary p-4 rounded'>
                            <h3 className='fw-bold fs-4'>Hasil Diagnosa</h3>
                            {
                                percentage !== 0 ?
                                    <p>Kemungkinan Anda mengidap penyakit <b>{disease.name}</b></p> :
                                    <p>Anda tidak memiliki gejala dari penyakit <b>{disease.name}</b></p>
                            }
                            <h3 className='fw-bold fs-4'>Gejala yang dialami</h3>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Gejala</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    symptomsList.map(({description}, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{++idx}</td>
                                                <td>{description}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>

                            <dl className='row'>
                                <dt className='col-3'>Penyebab</dt>
                                <dd className='col-9'>: {disease.cause}</dd>
                                <dt className='col-3'>Solusi</dt>
                                <dd className='col-9'>: {disease.solution}</dd>
                            </dl>
                        </div>
                    }) : <EmptyState />
                }
            </div>
        </div>
    );
};

export default DiagnoseList;