var logicSource = require('logic.source');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy < creep.carryCapacity) {
            // var sources = creep.room.find(FIND_SOURCES);
            // sources.sort((a, b) => {
                // return Math.abs(creep.pos.x - a.pos.x) + Math.abs(creep.pos.y - a.pos.y) - Math.abs(creep.pos.x - b.pos.x) - Math.abs(creep.pos.y - b.pos.y)
            // });

            var target;// = sources[0];
            target = logicSource.closetNotFullSource(creep);

            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

            targets.sort((a, b) => {
                return Math.abs(creep.pos.x - a.pos.x) + Math.abs(creep.pos.y - a.pos.y) - Math.abs(creep.pos.x - b.pos.x) - Math.abs(creep.pos.y - b.pos.y)
            });

            if(targets.length > 0) {
                creep.memory.role = 'harvester';
                var dest = targets[0];

                if(creep.transfer(dest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dest, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.memory.role = 'upgrader';
            }
        }
    },
    screep: {
        module: [
            WORK,CARRY,MOVE,MOVE
            // ,WORK,CARRY
        ],
        memory: {
            role: 'harvester',
            define_role: 'harvester'
        }
    },
    size: 1,
    hasWork(creep) {
        if (creep.memory.define_role == 'harvester') {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            return (targets.length > 0);
        }
        return false;
    }
};

module.exports = roleHarvester;