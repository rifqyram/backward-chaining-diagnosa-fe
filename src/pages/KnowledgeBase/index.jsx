import {Outlet} from "react-router-dom";

const Rule = () => {
    return (
        <div className='d-flex flex-column gap-4'>
            <Outlet/>
        </div>
    );
};

export default Rule;
