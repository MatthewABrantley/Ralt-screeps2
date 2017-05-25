//Import Modules
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    // clear memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    
    //for every creep name in game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];
        
        //if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleUpgrader.run(creep);
        }
        // if creep is repairier, call repairer script
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    var minimumNumberOfHarvesters = 6;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfRepairers = 2;
    
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    
    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var name = undefined;
    
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
        

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            name = Game,spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
    }
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    else {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
    }
};
