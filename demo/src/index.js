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
  constructor(props) {
    super(props);

    this.svgClicked = this.svgClicked.bind(this);
  }

  /* Sample of getting X/Y from the svg */
  svgClicked(evt) {
    const e = evt.target;
    const dim = e.getBoundingClientRect();
    const x = evt.clientX - dim.left;
    const y = evt.clientY - dim.top;
    alert("x: "+x+" y:"+y);
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <ChordDiagram
          matrix={matrix}
          componentId={1}
          style={{fontFamily: 'sans-serif'}}
          groupLabels={['black', 'yellow', 'brown', 'orange']}
          groupColors={['black', 'yellow', 'brown', 'orange']}
          groupOnClick={(idx) => alert('Clicked group: ' + idx)}
          ribbonOnClick={(idx) => alert('Clicked ribbon: ' + idx)}
          height={600}
          width={600}
        />
        <ChordDiagram
          height={600}
          width={600}
          matrix={matrix}
          componentId={2}
          style={{fontFamily: 'sans-serif'}}
          groupLabels={['black', 'yellow', 'brown', 'orange']}
          groupColors={['black', 'yellow', 'brown', 'orange']}
          disableRibbonHover={false}
          blurOnHover={true}
          ribbonOpacity={'0.8'}
          ribbonBlurOpacity={'0.2'}
          strokeWidth={0}
          persistHoverOnClick={true}
          svgOnClick={this.svgClicked}
        />
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'));
