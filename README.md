# Judgment

## Getting started
---
### Step 1:Install
```javascript
npm install judyment --save
```

### Step 2:Import
```javascript
import Judgment from 'judgment';
```

### Usage
#### simple demo:
```javascript
let s = 10; 
let judg = Judgment({
    conditions: [
        () => { if(s > 1) {return true;} return false;},
        () => { if(s > 3) {return true;} return false;},
        () => { if(s > 8) {return true;} return false;},
        () => { if(s > 10) {return true;} return false;}
    ],
    relations: {
        // '*' means ignore this condision
        // '111*' is equals '111'
        'result1': ['1111', '111*'],
        'result2': ['1000'],
        // '****' or '' means ignore all condision
        'result3': ['****']
    }
    // If conditions can match with several results, then return the first result, deault: false
    // matchOnce: false
});

console.info(judg.run()); // [result1, result3]

s = 2;
console.info(judg.run()); // [result2, result3]
```
#### custom conditions:
```javascript
let s = 10; 
let judg = Judgment({
    conditions: [
        () => { if(s > 1) {return 'a';} return 'b';},
        () => { if(s > 3) {return 'c';} return 'd';}
    ],
    relations: {
        'result1': ['ac'],
        'result2': ['ad']
    }
});

console.info(judg.run()); // [result1]

s = 2;
console.info(judg.run()); // [result2]
```


# License
MIT License


