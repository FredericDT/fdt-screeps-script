var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleClaimer = require('role.claimer');

var structureTower = require('structure.tower');

const guid = require('utils.guid');
const creepUtils = require('creep.utils');
require('prototype.spawn')();

var harvester_size = 8;
var upgrader_size = 0;
var builder_size = 1;

var each_creep_cost_decrease_level = 1;

module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1'];

    var upgraders = _.filter(Game.creeps, (creep) => {
        return creep.memory.define_role == 'upgrader';
    });
    if (upgraders.length < upgrader_size) {
        spawn.spawnCreep(creepUtils.getWorkCreepBodyByEnergy(spawn.sumSpawnEnergy() / each_creep_cost_decrease_level), 'Upgrader' + guid.guid(), {
            memory: roleUpgrader.screep.memory
        });
    }

    var builders = _.filter(Game.creeps, (creep) => {
        return creep.memory.define_role == 'builder';
    });
    if (builders.length < builder_size) {
        this.summonBuilder(spawn,guid.guid());
    }

    var harvesters = _.filter(Game.creeps, (creep) => {
        return creep.memory.define_role == 'harvester';
    });
    if (harvesters.length < harvester_size) {
        spawn.spawnCreep(
            // roleHarvester.screep.module
            creepUtils.getWorkCreepBodyByEnergy(spawn.sumSpawnEnergy() / each_creep_cost_decrease_level)
            , 'Harvester' + guid.guid(), {
                memory: roleHarvester.screep.memory
            });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (roleHarvester.hasWork(creep)) {
            creep.memory.role = 'harvester';
        }
        if (roleBuilder.hasWork(creep)) {
            creep.memory.role = 'builder';
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
    }

    var towers = spawn.findTowers();
    for (let t in towers) {
        structureTower.run(towers[t]);
    }

    // for(let t in structureTower.towersId) {
    //     structureTower.run(
    //         Game.getObjectById(
    //             structureTower.towersId[t]
    //         )
    //     );
    // }

    for (let i in Memory.creeps) {
        if (Object.keys(Game.creeps).indexOf(i) >= 0) {

        } else {
            delete Memory.creeps[i];
        }
    }
};

module.exports.summonBuilder = function (spawn, id) {
    var result = spawn.spawnCreep(creepUtils.getWorkCreepBodyByEnergy(spawn.sumSpawnEnergy() / each_creep_cost_decrease_level), 'Builder' + id, {
        memory: roleBuilder.screep.memory
    });
    return result;
};