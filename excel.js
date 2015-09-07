Excel = {};
Excel.lib = Npm.require('excel-export');

Excel.getColumns = function(fields, data) {
  var rows = [];

  _.each(data, function(item) {
    var row = [];
    _.each(fields, function(field, index) {
      var value = searchObject(item, field.key) || null;
      value = _.isFunction(field.transform) ? field.transform(value, item) : value;
      row[index] = value
    });
    rows.push(row);
  });

  return rows;
};


Excel.export = function(title, fields, data) {
  check(title, String);
  check(fields, [{
    key: String,
    title: String,
    type: Match.Optional(String),
    width: Match.Optional(Number),
    transform: Match.Optional(Function)
  }]);
  check(data, [Match.Any]);

  var rows = this.getColumns(fields, data);

  var excel = {};
  excel.cols = fields.map(function(field) {
    return {
      caption: field.title,
      type: field.type || 'string',
      width: field.width || 28.7109375
    };
  });

  excel.rows = rows;
  return Excel.lib.execute(excel);
}
