import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({
    width,
    height,
    style,
    children
}) => (
    <svg width={width} height={height} style={style}>
        <g transform={`translate(${width / 2},${height / 2})`}>
            { children }
        </g>
    </svg>
);

Svg.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object,
    children: PropTypes.arrayOf(PropTypes.node)
};

export default Svg;