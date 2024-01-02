import PropTypes from "prop-types";

const ConfirmationModal = ({id, handleConfirm, text}) => {
    return (
        <div className="modal fade"
             id="confirmationModal"
             tabIndex="-1"
             role="dialog"
             data-bs-backdrop="static"
             data-bs-keyboard="false"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Konfirmasi Penghapusan</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{text}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Batal</button>
                        <button type="button" className="btn btn-danger text-white" data-bs-dismiss="modal" onClick={() => handleConfirm(id)}>
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ConfirmationModal.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    handleConfirm: PropTypes.func,
}

export default ConfirmationModal;