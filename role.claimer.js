module.exports = {

    /** @param {Creep} creep **/
    run(creep) {
        // if in target room
        if (creep.room.name != creep.memory.target) {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    screep: {
        module: [
            CLAIM, MOVE
            // ,WORK,CARRY
        ],
        memory: {
            role: 'claimer',
            define_role: 'claimer'
        }
    },
    size: 1,
};