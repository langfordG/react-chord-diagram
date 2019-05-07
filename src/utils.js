/* Determines what ribbons should be hidden while mousing over a group */
export const isHiddenRibbon = (mouseOverGroup, sourceIndex, targetIndex) => {

    return mouseOverGroup !== null ? (mouseOverGroup !== sourceIndex && mouseOverGroup !== targetIndex) : false;
};