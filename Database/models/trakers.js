module.exports = (sequelize,DataTypes) => {
    const trakers = sequelize.define('trakers', {
        // ID_user: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // ID_page: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eMail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        page: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
    return trakers 
}
// const { Sequelize, Datatypes } = require('sequelize')
// const dotnev = require('dotenv')
// const connectDatabase = require('./db-config')

// const createTrakers = async() => {
//     const database = connectDatabase()


//     await trakers.sync().then(()=>{
//         console.log('page table crée')
//     }).catch((err)=>{
//         console.error('unable to create:', err)
//     })
// }

// module.exports = createTrakers