const path = require('path');

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve('./db/', 'database.sqlite')
    },
    useNullAsDefault: true
};