const db = require('./database');
const loadData = require('./loadData');

db.knex.schema.hasTable('machines')
  .then(exists => {
    if (!exists) {
      db.knex.schema.createTable('machines', machine => {
        machine.string('sku', 100).primary();
        machine.string('type', 255); // base, premium, deluxe
        machine.string('size', 100); // small, medium, large
        machine.boolean('compatible');
        machine.timestamps();
      })
        .then(loadData.loadMachines);
    }
  });

db.knex.schema.hasTable('pods')
  .then(exists => {
    if (!exists) {
      db.knex.schema.createTable('pods', pod => {
        pod.string('sku', 100).primary();
        pod.string('type', 255);
        pod.string('flavor', 255);
        pod.integer('size'); // 12, 24, 36
        pod.timestamps();
      })
        .then(loadData.loadPods);
    }
  });