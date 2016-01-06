# SuperClipBoard
### Copying text to the clipboard with javascript,  
##### high performance,no Flash, no dependece.  
---
* Just 2KB
* Easy to get started, only two interface(bind and copy)
* <strong>High performance, copy speed: 3000KB/s</strong>

---

## Getting started
---
### Step 1:Install
```javascript
npm install fast-clipboard --save
```
<strong>You can also download the [file](https://raw.githubusercontent.com/milan-hwj/SuperClipBoard/master/dist/superClipBoard.min.js) directly.  </strong>

### Step 2:Import js file
```javascript
<script type="text/javascript" src="../dist/superClipBoard.min.js"></script>
```

### Step 3: Bind
```javascript
<button id="btn" data-copy-content="Hello">copy 'Hello'</button>
<script>
    // fast bind
    superClipBoard.bind(document.getElementById('btn'));
</script>
```

## Usage
---
### Bind copy event
Set a 'data-copy-content' attribute in your trigger element
```javascript
<div class="example1" data-copy-content="Hello World">copy</div>
```
then you can using a variety of selector to bind copy event.
```javascript
// example1: document selector
superClipBoard.bind(document.getElementsByClassName('example1'));

// example2: selector like jquery
superClipBoard.bind('.example2');

// example3: jquery nodes (import jquery)
superClipBoard.bind($('.example3'));

// example4: simple dom array
superClipBoard.bind([
    document.getElementById('example4_1'),
    document.getElementById('example4_2')
]);
```
### DIY copy event
```javascript
// You can use any event such as click, mouseover, mouseover etc.. to bind copy behavior
// IE browser using 'attachEvent' binding event
document.getElementById('btn1').addEventListener("click", function(){
        // use 'copy(content)' to set the copy content
        superClipBoard.copy('Hello');
});
```
### Copy feedback 
Both 'copy' and 'bind' are provide feedback.
```javascript
// copy feedback
var option = {
    success: function(){
        alert('copy success');
    },
    error: function(){
        alert('copy error');
    }
}
// bind Event
document.getElementById('btn1').addEventListener("click", function(){
        superClipBoard.copy('Hello', option);
});
// fast bind
superClipBoard.bind(document.getElementById('btn2'), option);
```

# License
[MIT License](https://raw.githubusercontent.com/milan-hwj/SuperClipBoard/master/LICENSE)