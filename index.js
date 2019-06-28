const argv = require('minimist')(process.argv.slice(2));


const rocket =`
       !
       !
       ^
      / \\
     /___\\
    |=   =|
    |     |
    |     |
    |     |
    |     |
   /|##!##|\\
  / |##!##| \\
 /  |##!##|  \\
|  / ^ | ^ \\  |
| /  ( | )  \\ |
|/   ( | )   \\|
    ((   ))
   ((  :  ))
   ((  :  ))
    ((   ))
     (( ))
      ( )
       .
       .
       .
`;



const drawColim = (src, sideSize) => {
  let ptr = 0;
  let line = '';
  let p = 0;
  src.forEach((element, idx) => {
    if(ptr === sideSize){
      console.log(line);
      ptr = 0;
      line= element;
    }
    else{
      line +=element;
    }
    ptr++;
    p++;
  });
  console.log(line);
}


if(argv["size"]){
  const sqrSize = Math.ceil(Math.sqrt(argv["size"]))
  const colimLngth = sqrSize*sqrSize;
  const colim = new Array(colimLngth).fill("()\t",0,colimLngth);


  let shrink = 0;
  let pebble = 1;

  const spaceShip = {
  	pos :{
    	x:0,
    	y:0
  	},
	  acc : {
	    h:1,
    	v:0
    },
    life : new Number(argv["size"])
  }
  
  colim[(spaceShip.pos.y*sqrSize)+spaceShip.pos.x] = `(${pebble})\t`;
  spaceShip.life--;

while(spaceShip.life>0){
  let {pos, acc} = spaceShip;
  if(pos.x + acc.h >= sqrSize-shrink){
    acc.h = 0;
    acc.v = 1;
  }
  else if(pos.x + acc.h < shrink){
    acc.h = 0;
    acc.v = -1;
  }
  if(pos.y + acc.v >= sqrSize-shrink){
    acc.v = 0;
    acc.h =-1;
  }
  else if(acc.v !==0 && pos.y + acc.v === shrink){
    acc.v = 0;
    acc.h = 1;
    shrink++;
  }
  
  pos.x += acc.h;
  pos.y += acc.v; 
  spaceShip.life--;
  pebble++;
  colim[(spaceShip.pos.y*sqrSize)+spaceShip.pos.x] = `(${pebble})\t`;
}

drawColim(colim, sqrSize);

console.log(rocket);
	 
}
else{
console.log('Usage --size=x')
process.exit(-1);
}
