import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import {useDebounce} from "@uidotdev/usehooks";

const useSearch = () => {
    const [searchParam, setSearchParam] = useSearchParams();

    const [searchState, setSearchState] = useState(searchParam.get('search') || '');
    const searchValue = useDebounce(searchState, 500);

    const handleChangeSearch = (e) => {
        const {value} = e.target;
        setSearchState(value);
        searchParam.set('search', value);
        setSearchParam(searchParam, {replace: true});

        if (!searchParam.get('search')) {
            searchParam.delete('search');
            setSearchParam(searchParam, {replace: true});
        }
    };

    return [searchParam, setSearchParam, searchValue, handleChangeSearch]
};

export default useSearch;
