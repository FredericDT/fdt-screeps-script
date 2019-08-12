var roleClaimer = require('role.claimer');

module.exports = function(){
    StructureSpawn.prototype.sumSpawnEnergy = function() {
        var spawn = this;
        var r = spawn.energy;
        var targets = spawn.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION;
            }
        });
        targets.forEach((o) => {r += o.energy});
        return r;
    };
    StructureSpawn.prototype.spawnClaimerToTarget = function(target) {
        return this.spawnCreep(roleClaimer.screep.module, 'claimer', {memory:
            roleClaimer.screep.memory
        });
    }
};