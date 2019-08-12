var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var structureTower = require('structure.tower');

var harvester_size = 3;
var upgrader_size = 2;
var builder_size = 2;

module.exports.loop = function () {

    // var tower = Game.getObjectById('50c1180dd188d8201f659093');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }
    //
    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }
    var spawn = Game.spawns['Spawn1'];

    var harvesters = _.filter(Game.creeps, (creep) => {
        return creep.memory.role == 'harvester' || creep.memory.define_role == 'harvester';
    });
    if (harvesters.length < harvester_size) {
        spawn.spawnCreep(roleHarvester.screep.module, 'Harvester' + (++harvesters.length), {
            memory: roleHarvester.screep.memory
        });
    }

    var builders = _.filter(Game.creeps, (creep) => {
        return creep.memory.role == 'builder' || creep.memory.define_role == 'builder';
    });
    if (builders.length < builder_size) {
        this.summonBuilder(spawn,(++builders.length));
    }

    var upgraders = _.filter(Game.creeps, (creep) => {
        return creep.memory.role == 'upgrader' || creep.memory.define_role == 'upgrader';
    });
    if (upgraders.length < upgrader_size) {
        spawn.spawnCreep(roleUpgrader.screep.module, 'Upgrader' + (++upgraders.length), {
            memory: roleUpgrader.screep.memory
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
        }
    }

    for(let t in structureTower.towersId) {
        structureTower.run(
            Game.getObjectById(
                structureTower.towersId[t]
            )
        );
    }
};

module.exports.summonBuilder = function (spawn, id) {
    var result = spawn.spawnCreep(roleBuilder.screep.module, 'Builder' + id, {
        memory: roleBuilder.screep.memory
    });
    // if (result != OK) {
    //     console.log('Builder'+id+' result'+result);
    // }
};