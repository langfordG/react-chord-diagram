import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import { ribbon, chord } from 'd3-chord';
import { scaleOrdinal } from 'd3-scale';
import { range, descending } from 'd3-array';

import Svg from './Svg';
import Groups from './Groups';
import Ribbons from './Ribbons';

import './main.css';

const ChordDiagram = ({
    matrix = [],
    width = 700,
    height = 700,
    style = {},
    className = '',
    outerRadius: outerRadiusProp = null,
    innerRadius: innerRadiusProp = null,
    groupLabels = [],
    groupColors = [],
    padAngle = 0.05,
    sortGroups = null,
    sortSubgroups = descending,
    sortChords = null,
    labelColors = ['#000000'],
    disableHover = false,
    disableGroupHover = false,
    disableRibbonHover = true,
    strokeWidth = 1,
    resizeWithWindow = false,
    groupOnClick = null,
    ribbonOnClick = null,
    svgOnClick = null,
    blurOnHover = false,
    ribbonOpacity = '0.67',
    ribbonBlurOpacity = '0.2',
    persistHoverOnClick = false,
}) => {
    const [hoverPersist, setHoverPersistState] = useState(false);
    const [mouseOverGroup, setMouseOverGroup] = useState(null);
    const [mouseOverRibbon, setMouseOverRibbon] = useState(null);

    const clearHover = useCallback(() => {
        setHoverPersistState(false);
        setMouseOverGroup(null);
        setMouseOverRibbon(null);
    }, []);

    const setHoverPersist = useCallback((next) => {
        if (persistHoverOnClick) setHoverPersistState(next);
    }, [persistHoverOnClick]);

    const outerRadius = outerRadiusProp || Math.min(width, height) * 0.5 - 40;
    const innerRadius = innerRadiusProp || outerRadius - 30;

    const d3Chord = chord()
        .padAngle(padAngle)
        .sortGroups(sortGroups)
        .sortSubgroups(sortSubgroups)
        .sortChords(sortChords);

    const chords = d3Chord(matrix);

    const d3Arc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const d3Ribbon = ribbon()
        .radius(innerRadius);

    const color = scaleOrdinal()
        .domain(range(groupColors.length))
        .range(groupColors);

    return (
        <Svg
            width={width}
            height={height}
            style={style}
            className={className}
            clearHover={clearHover}
            resizeWithWindow={resizeWithWindow}
            onClick={svgOnClick}
        >
            <Groups
                chords={chords}
                color={color}
                arc={d3Arc}
                outerRadius={outerRadius}
                setMouseOverGroup={setMouseOverGroup}
                groupLabels={groupLabels}
                labelColors={labelColors}
                disableHover={disableHover || disableGroupHover}
                hoverPersist={hoverPersist}
                setHoverPersist={setHoverPersist}
                onClick={groupOnClick}
            />

            <Ribbons
                chords={chords}
                color={color}
                disableHover={disableHover || disableRibbonHover}
                ribbon={d3Ribbon}
                setMouseOverRibbon={setMouseOverRibbon}
                mouseOverGroup={mouseOverGroup}
                mouseOverRibbon={mouseOverRibbon}
                strokeWidth={strokeWidth}
                hoverPersist={hoverPersist}
                setHoverPersist={setHoverPersist}
                onClick={ribbonOnClick}
                blurOnHover={blurOnHover}
                ribbonOpacity={ribbonOpacity}
                ribbonBlurOpacity={ribbonBlurOpacity}
            />
        </Svg>
    );
};

ChordDiagram.propTypes = {
    matrix: PropTypes.array.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    outerRadius: PropTypes.number,
    innerRadius: PropTypes.number,
    groupLabels: PropTypes.array,
    groupColors: PropTypes.array,
    padAngle: PropTypes.number,
    sortGroups: PropTypes.func,
    sortSubgroups: PropTypes.func,
    sortChords: PropTypes.func,
    labelColors: PropTypes.array,
    disableHover: PropTypes.bool,
    disableGroupHover: PropTypes.bool,
    disableRibbonHover: PropTypes.bool,
    strokeWidth: PropTypes.number,
    resizeWithWindow: PropTypes.bool,
    groupOnClick: PropTypes.func,
    ribbonOnClick: PropTypes.func,
    svgOnClick: PropTypes.func,
    blurOnHover: PropTypes.bool,
    ribbonOpacity: PropTypes.string,
    ribbonHoverOpacity: PropTypes.string,
    persistHoverOnClick: PropTypes.bool,
};

export default ChordDiagram;
