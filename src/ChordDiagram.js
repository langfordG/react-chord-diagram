import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import { ribbon, chord } from 'd3-chord';
import { scaleOrdinal } from 'd3-scale';
import { range, descending } from 'd3-array';
import { formatPrefix } from 'd3-format';

import Svg from './Svg';
import Groups from './Groups';
import Ribbons from './Ribbons';

export default class ChordDiagram extends Component {

    static propTypes = {
        matrix: PropTypes.array.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        style: PropTypes.object,
        outerRadius: PropTypes.number,
        innerRadius: PropTypes.number,
        groupColors: PropTypes.array,
        formatValue: PropTypes.func,
        padAngle: PropTypes.number,
        sortGroups: PropTypes.func,
        sortSubgroups: PropTypes.func,
        sortChords: PropTypes.func,
        labels: PropTypes.array,
        labelColors: PropTypes.array,
        disableHover: PropTypes.bool,
        hideTicks: PropTypes.bool
    };

    static defaultProps = {
        matrix: [],
        width: 700,
        height: 700,
        style: {
            font: '10px sans-serif'
        },
        outerRadius: null,
        innerRadius: null,
        groupColors: [],
        formatValue: formatPrefix(",.0", 1e3),
        padAngle: 0.05,
        sortGroups: null,
        sortSubgroups: descending,
        sortChords: null,
        labels: [],
        labelColors: [],
        disableHover: false,
        hideTicks: false
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
          width,
          height,
          style,
          groupColors,
          formatValue,
          padAngle,
          sortGroups,
          sortSubgroups,
          sortChords,
          labels,
          labelColors,
          disableHover,
          hideTicks
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
        <Svg width={width} height={height} style={style}>
            <Groups
                chords={chords}
                color={color}
                arc={d3Arc}
                outerRadius={outerRadius}
                formatValue={formatValue}
                setMouseOverGroup={this.setMouseOverGroup}
                labels={labels}
                labelColors={labelColors}
                disableHover={disableHover}
                hideTicks={hideTicks}
            />

            <Ribbons
                chords={chords}
                color={color}
                ribbon={d3Ribbon}
                mouseOverGroup={this.state.mouseOverGroup}
            />
        </Svg>
    );
  }
}