// This directory contains general utilities that you can use as helper functions throughout other scripts

// coin functions
function coinFlip() {
    return Math.random() > .5 ? "heads" : "tails"
}

function coinFlips(flips) {
    flips = Number(flips)
    let results = []
    let f = 0
    while (f < flips) {
        results[f] = coinFlip()
        f = f + 1
    }
    return results
}


function countFlips(array) {
    let hCount = 0
    let tCount = 0
    for (let f in array) {
        if (array[f] === 'heads') {
            hCount += 1
        } else {
            tCount += 1
        }
    }

    if (tCount == 0) {
        return { 'heads': hCount }
    }

    if (hCount == 0) {
        return { 'tails': tCount }
    }

    return { 'heads': hCount, 'tails': tCount }

}

function flipACoin(call) {
    let flip = coinFlip()
    let result = ""
    if (flip === call) {
        result = 'win'
    } else {
        result = 'lose'
    }

    return { 'call': call, 'flip': flip, 'result': result }

}

module.exports = {
    coinFlips: coinFlips,
    flipACoin: flipACoin,
    countFlips: countFlips,
    coinFlip: coinFlip
};