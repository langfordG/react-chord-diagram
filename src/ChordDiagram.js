import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import { ribbon, chord } from 'd3-chord';
import { scaleOrdinal } from 'd3-scale';
import { range, descending } from 'd3-array';

import Svg from './Svg';
import Groups from './Groups';
import Ribbons from './Ribbons';

import './main.css'

export default class ChordDiagram extends Component {
    static propTypes = {
        matrix: PropTypes.array.isRequired,
        componentId: PropTypes.number.isRequired,
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
        strokeWidth: PropTypes.number,
        resizeWithWindow: PropTypes.bool,
        groupOnClick: PropTypes.func,
    };

    static defaultProps = {
        matrix: [],
        componentId: 1,
        width: 700,
        height: 700,
        style: {},
        className: '',
        outerRadius: null,
        innerRadius: null,
        groupLabels: [],
        groupColors: [],
        groupOnClick: null,
        padAngle: 0.05,
        sortGroups: null,
        sortSubgroups: descending,
        sortChords: null,
        labelColors: ['#000000'],
        disableHover: false,
        strokeWidth: 1,
        resizeWithWindow: false,
    };

    constructor (props) {
        super(props);

        this.setMouseOverGroup = this.setMouseOverGroup.bind(this);
    }

    state = {
        mouseOverGroup: null
    };

    setMouseOverGroup (mouseOverGroup) {
        this.setState({mouseOverGroup});
    }

    render() {
        const {
            matrix,
            componentId,
            width,
            height,
            style,
            className,
            groupLabels,
            groupColors,
            groupOnClick,
            padAngle,
            sortGroups,
            sortSubgroups,
            sortChords,
            labelColors,
            disableHover,
            strokeWidth,
            resizeWithWindow,
        } = this.props;

        const outerRadius = this.props.outerRadius || Math.min(width, height) * 0.5 - 40;
        const innerRadius = this.props.innerRadius || outerRadius - 30;

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
                resizeWithWindow={resizeWithWindow}
            >
                <Groups
                    componentId={componentId}
                    chords={chords}
                    color={color}
                    arc={d3Arc}
                    outerRadius={outerRadius}
                    setMouseOverGroup={this.setMouseOverGroup}
                    groupLabels={groupLabels}
                    labelColors={labelColors}
                    disableHover={disableHover}
                    onClick={groupOnClick}
                />

                <Ribbons
                    chords={chords}
                    color={color}
                    ribbon={d3Ribbon}
                    mouseOverGroup={this.state.mouseOverGroup}
                    strokeWidth={strokeWidth}
                />
            </Svg>
        );
    }
}
