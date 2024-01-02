import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import MessageBox from "./shared/compoents/MessageBox/MessageBox.jsx";
import BackdropLoading from "./shared/compoents/BackdropLoading/BackdropLoading.jsx";

function App() {
    const { error, errorKey, isLoading } = useSelector((state) => state.ui);

    return (
        <>
            {isLoading && <BackdropLoading title="Mohon menunggu" />}
            {error && <MessageBox key={errorKey} message={error} />}
            <Outlet />
        </>
    )
}

export default App
