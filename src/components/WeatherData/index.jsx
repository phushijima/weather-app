import React from "react";

import './index.scss';

const WeatherData = ({ variableName, variable, icon }) => {

    return (
        <div className='weather-data'>
            <div className='variable-name'>
                <p>{variableName}</p>
            </div>
            <div className='variable-number'>
                <p>{variable}</p>
                {icon}
            </div>
        </div>
    );
};

export default WeatherData;