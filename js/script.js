function solveMaze(map, callback) {
    var startPoint = findEnter();
    
    var move = {   
      x: 0,
      y: 0,
      direction: null,
      routes: 0,
      freeCell: 0,
      defaultCell: 0,
      finish: false,
      callback: callback,
      run: function() {
        this.x = startPoint[1];
        this.y = startPoint[0];
        
        while(!this.finish) {
          this.search();
          this.checkRoad();
          if(this.callback) this.callback(this.y, this.x, map[this.y][this.x]);
          this[this.direction]();
          this.freeCell = this.defaultCell;
        }
      },
      removeMarkers: function() {
        for(var i = 0; i < map.length; i++) {
          for(var j = 0; j < map[i].length; j++) {
            if(map[i][j] == 3) {
              map[i][j] = 0
            }
          }
        }
      },
      checkFinish: function() {
        var cells = [map[this.y-1][this.x], map[this.y][this.x+1], map[this.y+1][this.x], map[this.y][this.x-1]];
        if(cells.includes(undefined)) {
          this.finish = true;
          map[this.y][this.x] = 2;
          this.removeMarkers();
        }
      },
      checkDeadlock: function() {
        this.freeCell = 2;
        this.search();
      },
      checkRoad: function() {
        if(this.routes >= 1) {
          if(this.freeCell == 0) {
            map[this.y][this.x] = 2;
          }
        } else {
          map[this.y][this.x] = 3;
          this.checkFinish();
          this.checkDeadlock();
        }
      },
      search: function() {
        this.routes = 0;
          
        if(map[this.y-1][this.x] == this.freeCell) {
          this.direction = "up";
          this.routes++;
        }
        if(map[this.y][this.x+1] == this.freeCell) {
          this.direction = "right";
          this.routes++;
        }
        if(map[this.y+1][this.x] == this.freeCell) {
          this.direction = "down";
          this.routes++;
        }
        if(map[this.y][this.x-1] == this.freeCell) {
          this.direction = "left";
          this.routes++;
        }
      },
      right: function() {
        this.x++;
      },
      down: function() {
        this.y++;
      },
      up: function() {
        this.y--;
      },
      left: function() {
        this.x--;
      }
    }

    function findEnter() {
      var enter = [];
     
      for(var y = 0; y < map.length; y++) {
        for(var x = 0; x < map[y].length; x++) {

          if(!map[0][x]) { enter.push(0,x); break}
          if(!map[map.length - 1][x]) { enter.push(map.length - 1,x); break}
          if(!map[y][0]) { enter.push(y,0); break}
          if(!map[y][map[y].length-1]) { enter.push(y,map[y].length - 1); break}
        }
      }

      return enter;
    }
    move.run();
    
    return map;
}