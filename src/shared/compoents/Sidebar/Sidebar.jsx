import {NavLink} from "react-router-dom";

const masterNav = [
    {
        name: 'Dashboard',
        to: '/backoffice',
        icon: 'bi bi-house me-3 text-primary fs-5'
    },
    {
        name: 'Penyakit',
        to: '/backoffice/diseases',
        icon: 'bi bi-virus me-3 text-primary fs-5'
    },
    {
        name: 'Gejala',
        to: '/backoffice/symptoms',
        icon: 'bi bi-person-check me-3 text-primary fs-5'
    },
    {
        name: 'Basis Pengetahuan',
        to: '/backoffice/knowledge-based',
        icon: 'bi bi-file-ruled me-3 text-primary fs-5'
    },
    {
        name: 'Pengguna',
        to: '/backoffice/users',
        icon: 'bi bi-person me-3 text-primary fs-5'
    }
]

const setIsActiveClass = ({isActive}) => `text-decoration-none text-primary-text ${isActive ? 'fw-bold' : ''}`;

function Sidebar() {
    return (
        <>
            <div className="font-logo text-center mb-5">
                <h2 className="fs-5 fw-bold lh-lg font-primary">System Diagnosa Backward Chaining</h2>
                <h2 className="fs-6 mt-2 font-primary fw-bold">Backoffice V1.0.0</h2>
            </div>
            <nav>
                <ul className="d-flex flex-column gap-2 nav-list list-unstyled">
                    <p className="fw-bold">Master</p>
                    <ul className="cursor-pointer d-flex flex-column gap-4  list-unstyled">
                        {
                            masterNav.map((nav, idx) => {
                                return (
                                    <NavLink key={idx} className={setIsActiveClass} to={nav.to} end>
                                        <li className="gap-2 cursor-pointer">
                                            <i className={nav.icon}></i>
                                            <span>{nav.name}</span>
                                        </li>
                                    </NavLink>
                                )
                            })
                        }
                    </ul>
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;
