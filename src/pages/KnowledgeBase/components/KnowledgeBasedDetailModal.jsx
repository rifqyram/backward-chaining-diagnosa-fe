import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const KnowledgeBasedRuleModal = ({id, symptomsList, disease}) => {
    const {name, cause, solution} = disease;
    const navigate = useNavigate();

    const handleOnGetById = id => {
        navigate(`/backoffice/knowledge-based/edit/${id}`);
    }

    return (
        <div className="modal fade"
             id="knowledgeBasedRuleDetail"
             data-bs-backdrop="static"
             data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="knowledgeBasedRuleDetailLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4 fw-bold" id="knowledgeBasedRuleDetailLabel">
                            <i className='bi bi-file-ruled text-primary me-3'></i>Detail Basis Pengetahuan
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h3 className='fw-bold fs-4'>Data Penyakit</h3>
                        <dl className='row'>
                            <dt className='col-3'>Nama Penyakit</dt>
                            <dd className='col-9'>: {name}</dd>
                            <dt className='col-3'>Penyebab</dt>
                            <dd className='col-9'>: {cause}</dd>
                            <dt className='col-3'>Solusi</dt>
                            <dd className='col-9'>: {solution}</dd>
                        </dl>
                        <h3 className='fw-bold fs-4'>Data Gejala</h3>
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
                    </div>
                    <div className="modal-footer">
                        <div className="btn-group">
                            <button onClick={() => handleOnGetById(id)} type="button" className="btn btn-primary"
                                    data-bs-dismiss="modal">
                                <i className='bi bi-pencil me-2'></i>Ubah
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
                </div>
            </div>

        </div>
    );
};

KnowledgeBasedRuleModal.propTypes = {
    id: PropTypes.string,
    symptomsList: PropTypes.array,
    disease: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
}

export default KnowledgeBasedRuleModal;
