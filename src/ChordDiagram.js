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
        disableGroupHover: false,
        disableRibbonHover: true,
        strokeWidth: 1,
        resizeWithWindow: false,
        ribbonOnClick: null,
        blurOnHover: false,
        ribbonOpacity: '0.67',
        ribbonHoverOpacity: '0.2',
        persistHoverOnClick: false,
        svgOnClick: null,
    };

    constructor (props) {
        super(props);

        this.clearHover = this.clearHover.bind(this);
        this.setHoverPersist = this.setHoverPersist.bind(this);
        this.setMouseOverGroup = this.setMouseOverGroup.bind(this);
        this.setMouseOverRibbon = this.setMouseOverRibbon.bind(this);
    }

    state = {
        hoverPersist: false,
        mouseOverGroup: null,
        mouseOverRibbon: null,
    };

    clearHover() {
        this.setState({ hoverPersist: false, mouseOverGroup: null, mouseOverRibbon: null })
    }

    setHoverPersist (hoverPersist) {
        if (this.props.persistHoverOnClick) {
            this.setState({hoverPersist});
        }
    }

    setMouseOverGroup (mouseOverGroup) {
        this.setState({mouseOverGroup});
    }

    setMouseOverRibbon (mouseOverRibbon) {
        this.setState({mouseOverRibbon});
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
            disableGroupHover,
            disableRibbonHover,
            strokeWidth,
            resizeWithWindow,
            ribbonOnClick,
            blurOnHover,
            ribbonOpacity,
            ribbonBlurOpacity,
            persistHoverOnClick,
            svgOnClick,
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
                clearHover={this.clearHover}
                resizeWithWindow={resizeWithWindow}
                onClick={svgOnClick}
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
                    disableHover={disableHover || disableGroupHover}
                    hoverPersist={this.state.hoverPersist}
                    setHoverPersist={this.setHoverPersist}
                    onClick={groupOnClick}
                />

                <Ribbons
                    chords={chords}
                    color={color}
                    disableHover={disableHover || disableRibbonHover}
                    ribbon={d3Ribbon}
                    setMouseOverRibbon={this.setMouseOverRibbon}
                    mouseOverGroup={this.state.mouseOverGroup}
                    mouseOverRibbon={this.state.mouseOverRibbon}
                    strokeWidth={strokeWidth}
                    hoverPersist={this.state.hoverPersist}
                    setHoverPersist={this.setHoverPersist}
                    onClick={ribbonOnClick}
                    blurOnHover={blurOnHover}
                    ribbonOpacity={ribbonOpacity}
                    ribbonBlurOpacity={ribbonBlurOpacity}
                />
            </Svg>
        );
    }
}
