module.exports = {
    getWorkCreepBodyByEnergy(energy) {
        // console.log(energy);
        var body = [];
        var countOfParts = Math.floor(energy / 200);
        for (let i = 0; i < countOfParts; ++i) {
            body.push(WORK);
            body.push(CARRY);
            body.push(MOVE);
        }

        return body;
    }
};