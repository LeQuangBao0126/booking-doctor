
const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize('khambenh', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB