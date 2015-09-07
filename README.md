Excel Export
============

```sh
nicolaslopezj:excel-export
```

Export data to excel in Meteor.

**Example:**

```js
Router.route('/download-data', function() {
  var data = Posts.find({}).fetch();
  var fields = [
    {
      key: 'id',
      title: 'URL',
      transform: function(val) {
        return Router.url('posts.show', { _id: val });
      } 
    },
    {
      key: 'message',
      title: 'Message'
    }
  ];

  var title = 'Posts';
  var file = exportToExcel(title, fields, data);
  var headers = {
    'Content-type': 'application/vnd.openxmlformats',
    'Content-Disposition': 'attachment; filename=' + title + '.xlsx'
  };

  this.response.writeHead(200, headers);
  this.response.end(file, 'binary');
}, { where: 'server' });
```