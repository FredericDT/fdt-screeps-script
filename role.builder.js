var logicSource = require('logic.source');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {


		if(creep.memory.building && creep.carry.energy == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}

        if(creep.memory.building) {
            creep.memory.role = 'builder';
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            targets.sort((a, b) => {
                return Math.abs(creep.pos.x - a.pos.x) + Math.abs(creep.pos.y - a.pos.y) - Math.abs(creep.pos.x - b.pos.x) - Math.abs(creep.pos.y - b.pos.y)
            });

            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
            	creep.memory.role = 'upgrader';
            }
        }

        else {
            // var sources = creep.room.find(FIND_SOURCES);
            // sources.sort((a, b) => {
            //     return Math.abs(creep.pos.x - a.pos.x) + Math.abs(creep.pos.y - a.pos.y) - Math.abs(creep.pos.x - b.pos.x) - Math.abs(creep.pos.y - b.pos.y)
            // });
            var target;// = sources[0];
			target = logicSource.closetNotFullSource(creep);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	},
	screep: {
		module: [WORK,CARRY,MOVE,WORK,CARRY],
		memory: {
			role: 'builder',
			define_role: 'builder'
		}
	},
	size: 1,
	hasWork(creep) {
    	if (creep.memory.define_role == 'builder') {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            return targets.length > 0;
		}
        return false;
	}

};

module.exports = roleBuilder;