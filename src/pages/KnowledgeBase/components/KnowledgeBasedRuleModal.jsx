import {Fragment} from "react";
import PropTypes from "prop-types";

const KnowledgeBasedRuleModal = ({selectedAndOptions, selectedOrOptions, disease}) => {
    return (
        <div className="modal fade" id="knowledgeBasedRuleModal" data-bs-backdrop="static" data-bs-keyboard="false"
             tabIndex="-1" aria-labelledby="knowledgeBasedRuleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4 fw-bold" id="knowledgeBasedRuleDetailLabel">
                            <i className='bi bi-file-ruled text-primary me-3'></i>Detail Basis Pengetahuan
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Jika
                        {selectedAndOptions.map((o, index) => (
                            <Fragment key={index}>
                                {index > 0 ? ' DAN ' : ' '}
                                <strong>{o.label} </strong>
                            </Fragment>
                        ))}

                        {!!selectedOrOptions.length && (
                            <Fragment>
                                {' ATAU '}
                                {selectedOrOptions.map((o, index) => (
                                    <Fragment key={index}>
                                        {index > 0 ? ' ATAU ' : ' '}
                                        <strong>{o.label} </strong>
                                    </Fragment>
                                ))}
                            </Fragment>
                        )}
                        MAKA <strong>{disease.label}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

KnowledgeBasedRuleModal.propTypes = {
    selectedAndOptions: PropTypes.array,
    selectedOrOptions: PropTypes.array,
    disease: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

export default KnowledgeBasedRuleModal;
