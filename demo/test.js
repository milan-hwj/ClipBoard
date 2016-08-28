import Judgment from '../src/main.js';
let s = 10; 
let judg = Judgment({
    conditions: [
        () => { if(s > 1) {return true;} return false;},
        () => { if(s > 3) {return true;} return false;},
        () => { if(s > 8) {return true;} return false;},
        () => { if(s > 10) {return true;} return false;}
    ],
    relations: {
        'result1': ['1110', '111*'],
        'result2': ['1000', '']
    }
});
console.info(judg.run()); // result1, result2

s = 2;
console.info(judg.run()); // result2
