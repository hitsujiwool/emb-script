
var fs = require('fs');
var path = require('path');
var Cheerio = require('cheerio');
var async = require('async');

function handle(el, err, data) {
}

module.exports = function(file, cb) {
  fs.readFile(file, { encoding: 'utf8' }, function(err, data) {
    var $;
    var tasks = [];

    if (err) {
      cb(err);
      return;
    }

    $ = Cheerio.load(data);
    $('script[src]').each(function(i) {
      var $this = $(this);
      var src = $this.attr('src');
      if (!src.match(/^https?:\/\//)) {
        tasks.push(function(cb) {
          fs.readFile(path.resolve(path.dirname(file), src), { encoding: 'utf8' }, function(err, data) {
            if (!err) {
              $this.html("\n" + data);
              $this.removeAttr('src');
            }
            cb(err);
          });
        });
      }
    });
    async.parallel(tasks, function(err) {
      if (err) {
        cb(err);
      } else {
        cb(null, $.html());
      }
    });
  });
};
