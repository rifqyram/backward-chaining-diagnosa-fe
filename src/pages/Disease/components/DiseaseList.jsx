import {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {diseaseAction} from "../../../slices/diseaseSlice.js";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import EmptyState from "../../../shared/compoents/EmptyState/EmptyState.jsx";
import DiseaseItem from "./DiseaseItem.jsx";
import SkeletonLoading from "../../../shared/compoents/SkeletonTable/SkeletonLoading.jsx";
import Pagination from "../../../shared/compoents/Pagination/Pagination.jsx";
import usePagination from "../../../hooks/usePagination.jsx";
import useSearch from "../../../hooks/useSearch.jsx";
import Searching from "../../../shared/compoents/Searching/Searching.jsx";

const DiseaseList = () => {
    const dispatch = useDispatch();
    const {diseases} = useSelector(state => state.diseases);
    const {isLoading} = useSelector(state => state.ui);
    const {diseaseService} = useContext(ServiceContext);

    const [currentPage, currentSize, paging, setPaging] = usePagination();
    const [searchParam, setSearchParam, searchValue, handleChangeSearch] = useSearch();

    useEffect(() => {
        const onGetDisease = () => {
            dispatch(diseaseAction(async () => {
                const result = await diseaseService.getAll({
                        page: currentPage,
                        size: currentSize,
                        name: searchValue,
                    }
                )
                setPaging(result.paging);
                return result;
            }));
        }
        onGetDisease();
    }, [currentPage, currentSize, searchValue, diseaseService, dispatch, setPaging])

    return (
        <>
            <div className='p-4 shadow-lg bg-secondary rounded-2'>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className='fw-bold'>
                        <i className='bi bi-clipboard-pulse me-2 text-primary'></i>
                        Daftar Penyakit
                    </h2>
                    <Link to={'/backoffice/diseases/new'} className='btn btn-primary'>
                        <i className='bi bi-plus-lg me-2'></i>
                        <span>Tambah Data Penyakit</span>
                    </Link>
                </div>
                <Searching searchParam={searchParam}
                           setSearchParam={setSearchParam}
                           handleChangeSearch={handleChangeSearch}/>
                {
                    isLoading ? <SkeletonLoading/> :
                        (
                            <>
                                <div className="mt-4 d-flex flex-column gap-4">
                                    {
                                        diseases && !!diseases.length ?
                                            diseases.map((disease) => <DiseaseItem key={disease.id}
                                                                                   currentPage={currentPage}
                                                                                   currentSize={currentSize}
                                                                                   searchValue={searchValue}
                                                                                   setPaging={setPaging}
                                                                                   disease={disease}/>)
                                            : <EmptyState/>
                                    }
                                </div>
                            </>
                        )
                }
                <Pagination
                    url={'/backoffice/diseases'}
                    currentPage={currentPage}
                    currentSize={currentSize}
                    paging={paging}/>
            </div>
        </>
    )
}

export default DiseaseList;
