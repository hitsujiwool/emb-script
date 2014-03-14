# emb-script

embed external script to HTML

## Installation

```
$ npm install emb-script
```

## Usage

in.html
```
<!DOCTYPE html>
<html>
  <body>
    <script type="text/javascript" src="script.js"></script>
  </body>
</html>
```
script.js
```javascript
console.log('foo');
```
and
```javascript
var emb = require('emb-script');
emb('in.html', function(err, out) {
  console.log(out);
});
```
outputs
```
<!DOCTYPE html>
<html>
  <body>
    <script type="text/javascript">
console.log('foo');
</script>
  </body>
</html>
```

## License 

MIT
