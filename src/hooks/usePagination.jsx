import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

const usePagination = () => {
    const [paginationParam, setPaginationParam] = useSearchParams();

    const currentPage = parseInt(paginationParam.get('page') || 1);
    const currentSize = parseInt(paginationParam.get('size') || 10);
    const [paging, setPaging] = useState({});

    useEffect(() => {
        if (currentPage < 1 || currentPage > paging.totalPages) {
            paginationParam.set('page', '1');
            setPaginationParam(paginationParam, {replace: true});
        }
    }, [currentPage, paging.totalPages, paginationParam, setPaginationParam]);

    return [currentPage, currentSize, paging, setPaging];
};

export default usePagination;
