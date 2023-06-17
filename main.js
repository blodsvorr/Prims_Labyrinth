function R (n, min=0)
  { return min + Math.floor( Math.random() * n ) ;};

const D = Object.freeze( { 
  N: 1 << 0, 
  S: 1 << 1, 
  E: 1 << 2, 
  W: 1 << 3,
});

function DKey (b) {
    return Object.keys(this).find(key => this[key]===b);
};

function opp (dv) {
  if ((dv&D.N)===D.N||(dv&D.E)===D.E) {return dv<<1 ;}
  if ((dv&D.S)===D.S||(dv&D.W)===D.W) {return dv>>1 ;}
};

function dir (p0,p1) {
  if (p1.y>p0.y) { return D.N ;}
  if (p1.y<p0.y) { return D.S ;}
  if (p1.x>p0.x) { return D.E ;}
  if (p1.x<p0.x) { return D.W ;}
};

const P = (x,y) => ({
    x: x,
    y: y
});
/*
const MAZE = (h,w,start) => ({
	h: h,
	w: w,
	matrix: buildMaze(h,w,(arguments.length===2 ? P(Math.floor((w-1)/2),h-1) : start)),
	draw: drawMaze(this.matrix)
});
*/
function drawMaze (grid) {
	let maze = document.querySelector('#maze');
	for (let r=0 ; r<grid.length ; r++) {
		let row = grid[grid.length-1-r];
		let rowEl = document.createElement('div');
		rowEl.classList.add('row');
		rowEl.id = 'row' + r ;
		
		for (let c=0 ; c<row.length ; c++) {
			let cell = document.createElement('div');
			cell.classList.add('cell');
			let cellID = 'r' + r + 'c' + c ;
			cell.id = cellID ;
			
			for (let k in D) {
				if ((row[c] & D[k]) === D[k])
					{
						cell.classList.add(k);
					}
			}
			rowEl.appendChild(cell);
		}
		maze.appendChild(rowEl);
	}
	let exitID = 'r0c'+Math.floor( (grid[0].length-1)/2 );
	let exit = document.getElementById(exit);
	exit.classList.add('S');
	return;
};

function buildMaze (h,w,start) {
	let p = (arguments.length===2 ? P(Math.floor((w-1)/2),h-1) : start);
  let maze = buildGrid(h,w);
  let frontier = [p];
  maze[p.y][p.x] |= (D.S|D.N);

  while (frontier.length > 0) {
  	let i = R(frontier.length);
  	let focus = frontier.splice(i,1)[0];
  	tunnel(focus);
  }
 
  function tunnel (f) {
    let ns = getNeighbors(f);
    if (ns.length > 0) {
      let e = ns[R(ns.length)] ;
      let d = dir(e,f);
      maze[e.y][e.x] |= d;
      maze[f.y][f.x] |= opp(d);
    }
    return;
  }; //END tunnel
  
  function getNeighbors (p) {
    let ins = [];
    let neis = [];
    
    if (p.y+1 < h)  // NORTH
      { neis.push( P(p.x, p.y+1)) ;}
    if (p.y-1 >= 0)  // SOUTH
      { neis.push( P(p.x, p.y-1)) ;}
    if (p.x+1 < w)  // EAST
      { neis.push( P(p.x+1, p.y)) ;}
    if (p.x-1 >= 0)  // WEST
      { neis.push( P(p.x-1, p.y)) ;}
      
    for (let i = 0 ; i < neis.length ; i++) {
      let n = neis[i];
      if ( maze[n.y][n.x] > 0) {
        ins.push(n);
      } else if (maze[n.y][n.x]===0) {
          maze[n.y][n.x] = false ;
          frontier.push(n);
      }
    }
    return ins;
  }; //END getNeighbors
  
  function buildGrid (r,c) {
    let grid = [] ;
    for ( let i = 0 ; i < r ; i++ ) {
      let row = [] ;
      for ( let j = 0 ; j < c ; j++ ) {
        row.push(0) ;
      }
      grid.push(row) ;
    }
    return grid;
  }; //END buildGrid
  
  return maze;
}; //END buildMaze

function solve (maze,start) {
	let stepLVL = [];
	stepLVL.push([]);
	stepLVL[0].push(start);
	
	function getN (p) {
    let path = [];
    let ns = [];
    let val = maze[p.y][p.x];
    
    if (p.y+1 < h && ((val&D.N)===D.N))  // NORTH
      { ns.push( P(p.x, p.y+1)) ;}
    if (p.y-1 >= 0 && ((val&D.S)===D.S))  // SOUTH
      { ns.push( P(p.x, p.y-1)) ;}
    if (p.x+1 < w && ((val&D.E)===D.E))  // EAST
      { ns.push( P(p.x+1, p.y)) ;}
    if (p.x-1 >= 0 && ((val&D.W)===D.W))  // WEST
      { ns.push( P(p.x-1, p.y)) ;}
    return;
	};
	return;
};

//END PROGRAM DEFINITION


let ps = P(2,3) ;
let M = buildMaze(32,16) ;
drawMaze(M);
console.log('r' + r + 'c' + c);
