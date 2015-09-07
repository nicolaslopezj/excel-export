Excel Export
============

```sh
nicolaslopezj:excel-export
```

Export data to excel in Meteor.

### ```Excel.export(title, fields, data)```:

- ```title```: ```String```. The name of the file.
- ```fields```: ```[field]```. Description of the fields to include in the file.
- ```data```: ```[Object]```. Array of data.

**```field```:**

- ```key```: ```String```. The path to the key, accept dot for nesting.
- ```title```: ```String```. The title of the column.
- ```type```: ```String```. Optional. The type of the data for the column, defaults to ```string```. Allowed values: ```string```, ```date```, ```bool``` and ```number```.
- ```width```: ```Number```. Optional. The width of the column. defaults to ```28.7109375```.
- ```transform```: ```Function```. Optional. A function that takes the value of the field as the first argument and the document as the second, must return the new value for the row.

### Example:

```js
Router.route('/download-data', function() {
  var data = Posts.find().fetch();
  var fields = [
    {
      key: 'id',
      title: 'URL',
      transform: function(val, doc) {
        return Router.url('posts.show', { _id: val });
      } 
    },
    {
      key: 'message',
      title: 'Message'
    },
    {
      key: 'viewsCount',
      title: 'Views',
      type: 'number'
    }
  ];

  var title = 'Posts';
  var file = Excel.export(title, fields, data);
  var headers = {
    'Content-type': 'application/vnd.openxmlformats',
    'Content-Disposition': 'attachment; filename=' + title + '.xlsx'
  };

  this.response.writeHead(200, headers);
  this.response.end(file, 'binary');
}, { where: 'server' });
```