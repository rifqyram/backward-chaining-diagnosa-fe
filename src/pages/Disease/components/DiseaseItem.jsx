import {useContext} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";

import {diseaseAction} from "../../../slices/diseaseSlice.js";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import ConfirmationModal from "../../../shared/compoents/ConfirmationModal/ConfirmationModal.jsx";

const DiseaseItem = ({disease, currentPage, currentSize, searchValue, setPaging}) => {
    const {id, name, cause, solution} = disease;
    const dispatch = useDispatch();
    const {diseaseService} = useContext(ServiceContext);

    const handleDelete = (id) => {
        dispatch(diseaseAction(async () => {
            await diseaseService.deleteById(id);
            const result = await diseaseService.getAll({
                    page: currentPage,
                    size: currentSize,
                    name: searchValue,
                }
            );
            setPaging(result.paging);
            return result;
        }));
    }

    return (
        <div key={id} className="card">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <p className='fw-bold'>Nama Penyakit</p>
                    <span>{name}</span>
                </li>
                <li className="list-group-item">
                    <p className='fw-bold'>Penyebab</p>
                    <span>{cause}</span>
                </li>
                <li className="list-group-item">
                    <p className='fw-bold'>Solusi</p>
                    <span>{solution}</span>
                </li>
            </ul>
            <div className="card-footer d-flex justify-content-end">
                <div className="btn-group">
                    <Link to={`/backoffice/diseases/edit/${id}`}
                          className="btn btn-primary">
                        <i className="bi bi-pencil me-2"></i>
                        <span>Ubah</span>
                    </Link>
                    <button data-bs-target="#confirmationModal"
                            data-bs-toggle="modal"
                            className="btn btn-danger text-white">
                        <i className="bi bi-trash me-2"></i>
                        <span>Hapus</span>
                    </button>
                </div>
            </div>

            <ConfirmationModal
                id={id}
                handleConfirm={handleDelete}
                text={'Apakah yakin ingin menghapus data ini?'}
            />
        </div>
    );
};
DiseaseItem.propTypes = {
    disease: PropTypes.object,
    currentPage: PropTypes.any,
    currentSize: PropTypes.any,
    searchValue: PropTypes.any,
    setPaging: PropTypes.any,
};

export default DiseaseItem;
