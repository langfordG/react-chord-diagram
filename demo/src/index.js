import React, {Component} from 'react';
import {render} from 'react-dom';

import ChordDiagram from '../../src';

const matrix = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907],
];

class Demo extends Component {
  render() {
    return <ChordDiagram
        matrix={matrix}
        componentId={1}
        width={700}
        height={700}
        style={{fontFamily: 'sans-serif'}}
        groupLabels={['black', 'yellow', 'brown', 'orange']}
        groupColors={['black', 'yellow', 'brown', 'orange']}
    />
  }
}

render(<Demo/>, document.querySelector('#demo'));
