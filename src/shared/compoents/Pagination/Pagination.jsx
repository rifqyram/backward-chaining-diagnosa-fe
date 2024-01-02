import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Pagination = ({url, currentPage, currentSize, paging}) => {
    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                            <Link to={`${url}?page=${currentPage - 1}&size=${currentSize}`}
                                  className="page-link cursor-pointer">
                                Previous
                            </Link>
                        </li>
                        <EllipsisPagination currentSize={currentSize}
                                            currentPage={currentPage}
                                            paging={paging}
                                            url={url}/>
                        <li className={`page-item ${currentPage >= paging.totalPages && 'disabled'}`}>
                            <Link to={`${url}?page=${currentPage + 1}&size=${currentSize}`}
                                  className="page-link cursor-pointer">Next</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

function EllipsisPagination({paging, currentPage, currentSize, url}) {
    return Array.from({length: paging.totalPages}, (_, idx) => idx + 1)
        .reduce((acc, page) => {
            if (page === 1 || page === paging.totalPages) {
                acc.push(
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <Link to={`${url}?page=${page}&size=${currentSize}`}
                              className="page-link">
                            {page}
                        </Link>
                    </li>
                );
            } else if (page >= currentPage - 2 && page <= currentPage + 2) {
                acc.push(
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <Link to={`${url}?page=${page}&size=${currentSize}`}
                              className="page-link">
                            {page}
                        </Link>
                    </li>
                );
            } else if ((page === currentPage - 3 || page === currentPage + 3) && page !== 2 && page !== paging.totalPages - 1) {
                acc.push(
                    <li key={`ellipsis-${page}`} className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }
            return acc;
        }, [])
}

Pagination.propTypes = {
    url: PropTypes.string,
    currentPage: PropTypes.any,
    currentSize: PropTypes.any,
    paging: PropTypes.object,
}

export default Pagination;
