import React from 'react';
import PropTypes from 'prop-types';
import { rgb } from 'd3-color';

import { isHiddenRibbon } from './utils/utils';

const Ribbons = ({
    chords,
    color,
    ribbon,
    mouseOverGroup
}) => (
    <g
        className="ribbons"
        fillOpacity="0.67"
    >
        {chords.map((chord, chordIndex) => (
            <path
                key={chordIndex}
                style={{display: `${isHiddenRibbon(mouseOverGroup, chord.source.index, chord.target.index) ? 'none': 'block'}`}}
                fill={color(chord.target.index)}
                stroke={`${rgb(color(chord.target.index)).darker()}`}
                d={`${ribbon({source: chord.source, target: chord.target})}`}
            />
        ))}
    </g>
);

Ribbons.propTypes = {
    chords: PropTypes.array.isRequired,
    color: PropTypes.func.isRequired,
    ribbon: PropTypes.func.isRequired,
    mouseOverGroup: PropTypes.number,
};

export default Ribbons;