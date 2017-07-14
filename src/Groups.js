import React from 'react';
import PropTypes from 'prop-types';
import { rgb } from 'd3-color';

const Groups = ({
    chords,
    color,
    arc,
    outerRadius,
    setMouseOverGroup,
    groupLabels,
    labelColors,
    disableHover,
}) => (
    <g className="groups">
        {chords.groups.map((group, groupIndex) => (
            <g
                key={groupIndex}
                onMouseOver={!disableHover ? () => setMouseOverGroup(group.index) : null}
                onMouseOut={!disableHover ? () => setMouseOverGroup(null) : null}
            >
                <path
                    id={`group${groupIndex}`}
                    fill={`${color(groupIndex)}`}
                    stroke={`${rgb(color(groupIndex)).darker()}`} d={arc(group)}
                />

                <text x="6" dy="15" fill={labelColors.length === 1 ? labelColors[0] : labelColors[groupIndex]}>
                    <textPath href={`#group${groupIndex}`}>
                        {groupLabels[groupIndex]}
                    </textPath>
                </text>
            </g>
        ))}
    </g>
);

Groups.propTypes = {
    chords: PropTypes.array.isRequired,
    color: PropTypes.func.isRequired,
    arc: PropTypes.func.isRequired,
    outerRadius: PropTypes.number,
    setMouseOverGroup: PropTypes.func.isRequired,
    groupLabels: PropTypes.array,
    labelColors: PropTypes.array,
    disableHover: PropTypes.bool,
};

export default Groups;