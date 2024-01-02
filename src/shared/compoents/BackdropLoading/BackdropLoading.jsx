import Lottie from "lottie-react";
import animation from './meds.json';
import PropTypes from "prop-types";

const BackdropLoading = ({title}) => {
    return (
        <div className="loading-wrapper">
            <div className="loading-content">
                <Lottie animationData={animation} style={{ width: 350, height: 350 }} />
                {title}
            </div>
        </div>
    );
};

BackdropLoading.propTypes = {
    title: PropTypes.string,
}

export default BackdropLoading;
