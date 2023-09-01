import React from "react";
import PropTypes from "prop-types";

const Timer = ({ timeConverter }) => {
    return (
        <div className="timer">
            <span>{timeConverter}</span>
        </div>
    );
};

Timer.propTypes = {
    timeConverter: PropTypes.string,
};

export default Timer;
