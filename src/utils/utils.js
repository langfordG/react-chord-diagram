import { range } from 'd3-array';

/* Returns an array of tick angles and values for a given group and step. See: https://bl.ocks.org/mbostock/4062006 */
export const groupTicks = (group, step) => {

    let k = (group.endAngle - group.startAngle) / group.value;

    return range(0, group.value, step).map((value) => ({value, angle: value * k + group.startAngle}));
};

/* Determines what ribbons should be hidden while mousing over a group */
export const isHiddenRibbon = (mouseOverGroup, sourceIndex, targetIndex) => {

    return mouseOverGroup !== null ? (mouseOverGroup !== sourceIndex && mouseOverGroup !== targetIndex) : false;
};