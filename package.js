Package.describe({
  name: 'nicolaslopezj:excel-export',
  summary: 'Export data to excel',
  version: '1.0.0',
  git: 'https://github.com/nicolaslopezj/excel-export'
});

Npm.depends({
  'excel-export': '0.4.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use(['underscore'], 'server');
  
  api.addFiles('excel.js', 'server');

  api.export('Excel', 'server');
});
