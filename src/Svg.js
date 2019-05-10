import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({
    width,
    height,
    style,
    className,
    children
}) => (
    <div className="svg-container">
        <svg
            style={style}
            className={`svg-content ${className}`}
            viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
            preserveAspectRatio={"xMidYMid meet"}
        >
            <g>
                { children }
            </g>
        </svg>
    </div>
);

Svg.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object,
    children: PropTypes.arrayOf(PropTypes.node)
};

export default Svg;