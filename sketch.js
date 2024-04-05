
let numbers = [true];
let count = 1;
let sequence = [];
let index = 0;


function setup() {
  createCanvas(600, 400);
  background(0);
  numbers[index]= true;
sequence.push(index);
for (let i = 0; i < 10; i++){
  step();
}

// console.log(sequence);

}

 function step(){
let next = index - count ;
 if ( next <0 || numbers[next]){
  next = index + count;
 }
  numbers[next] = true;
  sequence.push(next);

let diameter = next - index;
let x = (next+index)/2;
stroke(255);
noFill();
ellipse(x,height/2,diameter);

  index = next;
  count++;
 }

function draw() {
 step();
}
