const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const VehicleType = require('./VehicleType');

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    modelName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicleTypeId: {
        type: DataTypes.INTEGER,
        references: {
            model: VehicleType,
            key: 'id',
        },
        allowNull: false,
    },
});

Vehicle.belongsTo(VehicleType, { foreignKey: 'vehicleTypeId' });

module.exports = Vehicle;
