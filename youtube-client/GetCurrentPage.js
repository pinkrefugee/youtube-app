function getCurrentPage(pos, vidPerP){
    return -Math.floor(pos / (330 * vidPerP)) + 1
}
module.exports = {getCurrentPage};