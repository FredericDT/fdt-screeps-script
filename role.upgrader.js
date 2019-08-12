var logicSource = require('logic.source');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // var sources = creep.room.find(FIND_SOURCES);
            // sources.sort((a, b) => {
            //     return Math.abs(creep.pos.x - a.pos.x) + Math.abs(creep.pos.y - a.pos.y) - Math.abs(creep.pos.x - b.pos.x) - Math.abs(creep.pos.y - b.pos.y)
            // });
            var target = logicSource.closetNotFullSource(creep);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	},
    screep: {
        module: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],
        memory: {
            role: 'upgrader',
            define_role: 'upgrader'
        }
    },
    size: 1,
};

module.exports = roleUpgrader;