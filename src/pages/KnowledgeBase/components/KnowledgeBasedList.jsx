import {Fragment, useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import EmptyState from "../../../shared/compoents/EmptyState/EmptyState.jsx";
import {useDispatch, useSelector} from "react-redux";

import {ServiceContext} from "../../../context/ServiceContext.jsx";
import {ruleAction} from "../../../slices/ruleSlice.js";
import KnowledgeBasedDetailModal from "./KnowledgeBasedDetailModal.jsx";
import ConfirmationModal from "../../../shared/compoents/ConfirmationModal/ConfirmationModal.jsx";
import usePagination from "../../../hooks/usePagination.jsx";
import useSearch from "../../../hooks/useSearch.jsx";
import Searching from "../../../shared/compoents/Searching/Searching.jsx";
import Pagination from "../../../shared/compoents/Pagination/Pagination.jsx";

const KnowledgeBasedList = () => {
    const dispatch = useDispatch();
    const {ruleService} = useContext(ServiceContext);
    const {rules} = useSelector(state => state.rules)

    const [currentPage, currentSize, paging, setPaging] = usePagination();
    const [searchParam, setSearchParam, searchValue, handleChangeSearch] = useSearch();

    const handleOnDelete = id => {
        dispatch(ruleAction(async () => {
            await ruleService.deleteById(id);
            const result = await ruleService.getAll({
                page: currentPage,
                size: currentSize,
                name: searchValue,
            });
            setPaging(result.paging);
            return result;
        }));
    }

    useEffect(() => {
        const onGetRule = () => {
            dispatch(ruleAction(async () => {
                const result = await ruleService.getAll({
                    page: currentPage,
                    size: currentSize,
                    name: searchValue,
                });
                setPaging(result.paging);
                return result;
            }))
        }
        onGetRule();
    }, [currentPage, currentSize, dispatch, ruleService, searchValue, setPaging]);

    return (
        <div className="mx-3 bg-secondary p-4 rounded-2">
            <div className="d-flex align-items-center justify-content-between">
                <h2 className='fw-bold mb-3'>
                    <i className='bi bi-list-ul text-primary me-3'></i>
                    Daftar Basis Pengetahuan
                </h2>
                <Link to={'/backoffice/knowledge-based/new'} className='btn btn-primary'>
                    <i className='bi bi-plus-lg me-2'></i>
                    <span>Tambah Data Penyakit</span>
                </Link>
            </div>
            <Searching searchParam={searchParam}
                       setSearchParam={setSearchParam}
                       handleChangeSearch={handleChangeSearch}/>
            <table className="table align-middle mt-4">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Penyakit</th>
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody>
                {
                    rules && !!rules.length ? rules.map(
                        (rule, idx) => {
                            return (
                                <Fragment key={rule.id}>
                                    <tr>
                                        <td>{++idx}</td>
                                        <td>{rule.disease.name}</td>
                                        <td>
                                            <span className='cursor-pointer'
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#knowledgeBasedRuleDetail">
                                                Detail
                                            </span>
                                            <KnowledgeBasedDetailModal
                                                id={rule.id}
                                                symptomsList={[...rule.requiredSymptoms, ...rule.optionalSymptoms]}
                                                disease={rule.disease}
                                            />
                                            <ConfirmationModal
                                                id={rule.id}
                                                text={'Apakah yakin ingin menghapus data ini?'}
                                                handleConfirm={handleOnDelete}/>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        }) : (
                        <tr>
                            <td colSpan={3}><EmptyState/></td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            <Pagination
                url={'/backoffice/knowledge-based'}
                currentPage={currentPage}
                currentSize={currentSize}
                paging={paging}/>
        </div>
    );
};

export default KnowledgeBasedList;
