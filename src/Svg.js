import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({
    width,
    height,
    style,
    className,
    clearHover,
    children,
    resizeWithWindow
}) => (
    <div className="svg-container" style={{...style, ...(!resizeWithWindow ? {width: `${width}px`, height: `${height}px`} : {})}}>
        <svg
            className={`svg-content ${className}`}
            viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
            preserveAspectRatio={"xMidYMid meet"}
        >
            <g>
              <rect
                fillOpacity={0}
                height={height}
                onClick={ () => clearHover() }
                width={width}
                x={`-${width / 2}`}
                y={`-${height / 2}`}
              />
                { children }
            </g>
        </svg>
    </div>
);

Svg.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object,
    children: PropTypes.arrayOf(PropTypes.node),
    resizeWithWindow: PropTypes.bool
};

export default Svg;
