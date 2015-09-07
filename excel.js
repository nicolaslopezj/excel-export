Excel = {};
Excel.lib = Npm.require('excel-export');

Excel.getColumns = function(fields, data) {
  var rows = [];

  _.each(data, function(item) {
    var row = [];
    _.each(fields, function(field, index) {
      var value = orion.helpers.searchObjectWithDots(item, field.key) || null;
      value = _.isFunction(field.transform) ? field.transform(value) : value;
      value = String(value);
      row[index] = value
    });
    rows.push(row);
  });

  return rows;
};


Excel.export = function(title, fields, data) {
  var rows = getColumns(fields, data);

  var excel = {};
  excel.cols = fields.map(function(field) {
    return {
      caption: field.title,
      type: 'string',
      width: 28.7109375
    };
  });

  excel.rows = rows;
  return Excel.execute(excel);
}
