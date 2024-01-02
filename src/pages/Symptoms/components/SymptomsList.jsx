import {useDispatch, useSelector} from "react-redux";
import EmptyState from "../../../shared/compoents/EmptyState/EmptyState.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {symptomsAction} from "../../../slices/symptomsSlice.js";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import SkeletonLoading from "../../../shared/compoents/SkeletonTable/SkeletonLoading.jsx";
import ConfirmationModal from "../../../shared/compoents/ConfirmationModal/ConfirmationModal.jsx";
import usePagination from "../../../hooks/usePagination.jsx";
import useSearch from "../../../hooks/useSearch.jsx";
import Searching from "../../../shared/compoents/Searching/Searching.jsx";
import Pagination from "../../../shared/compoents/Pagination/Pagination.jsx";
import SymptomsForm from "./SymptomsForm.jsx";

const SymptomsList = () => {
    const dispatch = useDispatch();
    const {symptoms} = useSelector(state => state.symptoms);
    const {isLoading} = useSelector(state => state.ui);
    const {symptomsService} = useContext(ServiceContext);
    const navigate = useNavigate();

    const [currentPage, currentSize, paging, setPaging] = usePagination();
    const [searchParam, setSearchParam, searchValue, handleChangeSearch] = useSearch();

    const handleDelete = (id) => {
        dispatch(symptomsAction(async () => {
            await symptomsService.deleteById(id)
            const result = await symptomsService.getAll({
                page: currentPage,
                size: currentSize,
                description: searchValue
            });
            setPaging(result.paging);
            navigate('/backoffice/symptoms')
            return result;
        }));
    }

    const handleUpdateModal = (id) => {
        navigate(`/backoffice/symptoms/${id}`)
    }

    useEffect(() => {
        const onGetIndication = () => {
            dispatch(symptomsAction(async () => {
                const result = await symptomsService.getAll({
                    page: currentPage,
                    size: currentSize,
                    description: searchValue
                });
                setPaging(result.paging);
                return result;
            }));
        }
        onGetIndication();
    }, [currentPage, currentSize, dispatch, searchValue, setPaging, symptomsService])

    return (
        <>
            <SymptomsForm currentPage={currentPage}
                          currentSize={currentSize}
                          searchValue={searchValue}
                          setPaging={setPaging}/>
            <div className='bg-secondary p-4 rounded-2'>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className='fw-bold mb-3'><i className='bi bi-list-ul me-2 text-primary me-3'></i>Daftar Gejala
                    </h2>
                    <button data-bs-toggle="modal" data-bs-target="#symptomsForm" className='btn btn-primary'>
                        <i className='bi bi-plus-lg me-2'></i>
                        <span>Tambah Data Penyakit</span>
                    </button>
                </div>
                <Searching searchParam={searchParam} setSearchParam={setSearchParam}
                           handleChangeSearch={handleChangeSearch}/>
                <table className="table align-middle">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Deskripsi Gejala</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td><SkeletonLoading/></td>
                        </tr>
                    ) : (symptoms && !!symptoms.length ?
                            symptoms.map(({id, description}, idx) => {
                                return (
                                    <tr key={id}>
                                        <td>{++idx}</td>
                                        <td>{description}</td>
                                        <td>
                                            <div>
                                                <span
                                                    onClick={() => handleUpdateModal(id)}
                                                    className='cursor-pointer'
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#symptomsForm">
                                                Detail
                                                </span>
                                                <ConfirmationModal id={id}
                                                                   text={'Apakah yakin ingin menghapus data ini?'}
                                                                   handleConfirm={handleDelete}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) : <tr>
                                <td colSpan={3}><EmptyState/></td>
                            </tr>
                    )}
                    </tbody>
                </table>
                <Pagination url={'/backoffice/symptoms'}
                            currentSize={currentSize}
                            currentPage={currentPage}
                            paging={paging}/>
            </div>
        </>
    );
};

export default SymptomsList;
