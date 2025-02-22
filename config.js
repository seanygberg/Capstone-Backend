require('dotenv').config();
require('colors');

const client = require("./db")

const config = {
    jwtSecret: process.env.JWT_SECRET || 'default_secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    db: { client },
    server: {
      port: process.env.SERVER_PORT || 3000,
    },
    bcryptWorkFactor: parseInt(process.env.BCRYPT_WORK_FACTOR, 10) || 12,
};

const getDatabaseUri = () => {
    const { user, password, host, port, database } = config.db;
    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
};


module.exports = { ...config, getDatabaseUri };