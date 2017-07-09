import React from 'react';
import PropTypes from 'prop-types';

const GroupTicks = ({
    tick,
    tickIndex,
    formatValue,
    outerRadius
}) => (
    <g
        key={tickIndex}
        className="group-tick"
        transform={`rotate(${(tick.angle * 180 / Math.PI - 90)}) translate(${outerRadius},0)`}
    >
        <line x2={6} stroke="#000" />

        {tick.value % 5e3 === 0 ?
            <text
                x={8}
                dy=".35em"
                transform={tick.angle > Math.PI ? "rotate(180) translate(-16)" : null}
                style={{textAnchor: tick.angle > Math.PI ? "end" : null}}

            >
                {formatValue(tick.value)}
            </text> : null}
    </g>
);

GroupTicks.propTypes = {
    tick: PropTypes.object.isRequired,
    tickIndex: PropTypes.number.isRequired,
    formatValue: PropTypes.func,
    outerRadius: PropTypes.number
};

export default GroupTicks;