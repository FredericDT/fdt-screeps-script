module.exports = function(){
    Creep.prototype.closetNotFullSource = function() {
        var creep = this;
        var sources = creep.room.find(FIND_SOURCES);
        sources = sources.filter((o) => {
            return o.energy > 0;
        });
        sources.sort((a, b) => {
            return Math.abs(creep.pos.x - a.pos.x) + Math.abs(creep.pos.y - a.pos.y) - Math.abs(creep.pos.x - b.pos.x) - Math.abs(creep.pos.y - b.pos.y)
        });

        function isFull(target) {
            var room = target.room;
            var sourcePos = target.pos;

            var availableTiles = 0;
            for (var i in posOffsets) {
                for (var j in posOffsets) {
                    var x = posOffsets[i] + sourcePos.x;
                    var y = posOffsets[j] + sourcePos.y;
                    var roomPosition = new RoomPosition(x, y, room.name);

                    var looks = roomPosition.look();
                    for (var k in looks) {
                        var look = looks[k];
                        if (look.type == 'terrain') {
                            if (look.terrain == 'plain') {
                                ++availableTiles;
                            }
                        } else
                        if(look.type == 'creep') {
                            if (creep && look.creep.id == creep.id) {
                            } else {
                                --availableTiles;
                            }
                        }
                    }
                }
            }
            return availableTiles <= 0;
        }

        while (sources.length > 1 && isFull(sources[0])) {
            sources.shift();
        }

        return sources[0];
    }
};