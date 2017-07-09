# React Chord Diagram

An accessible React component for building [D3 Chord Diagrams](https://github.com/d3/d3-chord)

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Required Props](#required-props)
* [Optional Props](#optional-props)

## Installation

    $ npm install react-chord-diagram

## Usage

    import ChordDiagram from 'react-chord-diagram'

```xml
<ChordDiagram matrix={data}/>
```

## Required Props

### matrix

- type: `array of arrays`

The directed graph (matrix) to be visualized. See [D3 Chord](https://github.com/d3/d3-chord#chord).

example:

    [
      [11975,  5871, 8916, 2868],
      [ 1951, 10048, 2060, 6171],
      [ 8010, 16145, 8090, 8045],
      [ 1013,   990,  940, 6907],
    ]

## Optional Props

### width

- type: `number`

Width of the diagram.

### height 

- type: `number`

Height of the diagram.

### style

- type: `object`

Custom style object applied to the root of diagram.

example: 

        {
            font: '10px sans-serif'
        }

### outerRadius

- type: `number`

Outer radius of the diagram.

### innerRadius

- type: `number`

Inner radius of the diagram.

### groupColors

- type: `array`

List of colors, one for each group.

example: 

    ["#000000", "#FFDD89", "#957244", "#F26223"]
    
### formatValue

- type: `function`

Specifies the [format prefix](https://github.com/d3/d3-format#locale_formatPrefix) for tick marks.

default: d3.formatPrefix(",.0", 1e3)

### padAngle

- type: `number`

Specifies the percent of padding between arcs or groups.

default: .05

### sortGroups

- type: `function`

A function that specifies how the groups should be sorted. See [chord.sortGroups](https://github.com/d3/d3-chord#chord_sortGroups).

default: null

### sortSubGroups

- type: `function`

A function that specifies how subgroups should be sorted. See [chord.sortSubGroups](https://github.com/d3/d3-chord#chord_sortSubgroups).

default: d3.descending

### sortChords

- type: `function`

A function that specifies how chords should be sorted. See [chord.sortChords](https://github.com/d3/d3-chord#chord_sortChords).

default: d3.descending

### labelColors

- type: `array`

The color of each label in the diagram.

default: #000000

### disableHover

- type: `boolean`

Whether to hide other ribbons while mousing over a particular group.

default: false

### hideTicks

- type: `boolean`

Display tick marks or not.

default: true

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
