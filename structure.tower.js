module.exports = {
    run(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        } else {
            var closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            closestDamagedStructure.sort((a, b) => {
                if (a.structureType == STRUCTURE_WALL && b.structureType != STRUCTURE_WALL) {
                    return 1;
                } else
                if (a.structureType == STRUCTURE_RAMPART && b.structureType != STRUCTURE_RAMPART) {
                    return 1;
                }
                return a.hits / a.hitsMax - b.hits / b.hitsMax;
            });
            if (closestDamagedStructure.length > 0) {
                tower.repair(closestDamagedStructure[0]);
            }
        }
    },
    towersId: [
        // '5fab52b1580c5b3',
        // '58de54692de16b7',

    ],

};
