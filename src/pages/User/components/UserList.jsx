import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {ServiceContext} from "../../../context/ServiceContext.jsx";
import {useNavigate} from "react-router-dom";
import usePagination from "../../../hooks/usePagination.jsx";
import useSearch from "../../../hooks/useSearch.jsx";
import {userAction} from "../../../slices/userSlice.js";
import Searching from "../../../shared/compoents/Searching/Searching.jsx";
import SkeletonLoading from "../../../shared/compoents/SkeletonTable/SkeletonLoading.jsx";
import ConfirmationModal from "../../../shared/compoents/ConfirmationModal/ConfirmationModal.jsx";
import EmptyState from "../../../shared/compoents/EmptyState/EmptyState.jsx";
import Pagination from "../../../shared/compoents/Pagination/Pagination.jsx";
import UserForm from "./UserForm.jsx";

const UserList = () => {
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.users);
    const {isLoading} = useSelector(state => state.ui);
    const {authService} = useContext(ServiceContext);
    const navigate = useNavigate();

    const [currentPage, currentSize, paging, setPaging] = usePagination();
    const [searchParam, setSearchParam, searchValue, handleChangeSearch] = useSearch();

    const handleDelete = (id) => {
        dispatch(userAction(async () => {
            await authService.deleteById(id)
            const result = await authService.getAll({
                page: currentPage,
                size: currentSize,
                username: searchValue
            });
            setPaging(result.paging);
            navigate('/backoffice/users')
            return result;
        }));
    }

    const handleUpdateModal = (id) => {
        navigate(`/backoffice/users/${id}`)
    }

    useEffect(() => {
        const onGetUsers = () => {
            dispatch(userAction(async () => {
                const result = await authService.getAll({
                    page: currentPage,
                    size: currentSize,
                    username: searchValue
                });
                setPaging(result.paging);
                console.log(result)
                return result;
            }));
        }
        onGetUsers();
    }, [currentPage, currentSize, dispatch, searchValue, setPaging, authService])

    return (
        <>
            <UserForm currentPage={currentPage}
                          currentSize={currentSize}
                          searchValue={searchValue}
                          setPaging={setPaging}/>
            <div className='bg-secondary p-4 rounded-2'>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className='fw-bold mb-3'><i className='bi bi-list-ul me-2 text-primary me-3'></i>Daftar Pengguna
                    </h2>
                    <button data-bs-toggle="modal" data-bs-target="#userForm" className='btn btn-primary'>
                        <i className='bi bi-plus-lg me-2'></i>
                        <span>Tambah User</span>
                    </button>
                </div>
                <Searching searchParam={searchParam}
                           setSearchParam={setSearchParam}
                           handleChangeSearch={handleChangeSearch}/>
                <table className="table align-middle">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td><SkeletonLoading/></td>
                        </tr>
                    ) : (users && !!users.length ?
                            users.map(({id, username, role}, idx) => {
                                return (
                                    <tr key={id}>
                                        <td>{++idx}</td>
                                        <td>{username}</td>
                                        <td>{role}</td>
                                        <td>
                                            <div>
                                                <span
                                                    onClick={() => handleUpdateModal(id)}
                                                    className='cursor-pointer'
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#userForm">
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
                <Pagination url={'/backoffice/user'}
                            currentSize={currentSize}
                            currentPage={currentPage}
                            paging={paging}/>
            </div>
        </>
    );
};

export default UserList;