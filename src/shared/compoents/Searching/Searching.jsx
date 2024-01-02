import PropTypes from "prop-types";
import {useState} from "react";

const Searching = ({searchParam, setSearchParam, handleChangeSearch}) => {
    const [selectedSize, setSelectedSize] = useState('10');

    const handleSelectChange = (e) => {
        searchParam.set('size', e.target.value);
        setSearchParam(searchParam);
        setSelectedSize(e.target.value);
    };

    return (
        <>
            <div className="filter row d-flex gap-4 justify-content-between my-4">
                <div className="col-md-3 col-sm-12 d-flex align-self-center gap-2">
                    <span className='align-self-center'>Tampilkan</span>
                    <select
                        onChange={handleSelectChange}
                        className="form-select"
                        value={selectedSize}
                        name="size"
                        id="size">
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                    <span className='align-self-center'>data</span>
                </div>
                <div className='col-md-4 col-sm-12'>
                    <input
                        type='search'
                        autoComplete='off'
                        name="search"
                        id="search"
                        className='form-control'
                        onChange={handleChangeSearch}
                        placeholder='Cari Nama Penyakit'/>
                </div>
            </div>
        </>
    );
};

Searching.propTypes = {
    searchParam: PropTypes.any,
    setSearchParam: PropTypes.any,
    handleChangeSearch: PropTypes.any,
}

export default Searching;
