function getCurrentPage(pos, vidPerP){
    return -Math.floor(pos / (330 * vidPerP)) + 1;
}
function getNumberOfPages(videosNumber, vidPerP){
    return Math.ceil(videosNumber / vidPerP);
}

module.exports = {getCurrentPage, getNumberOfPages};