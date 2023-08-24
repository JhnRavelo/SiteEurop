module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        ID_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eMail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    return users
}

// const createUser = async() => {
//     const database = connectDatabase()
    
    
//     await users.sync().then(() => {
//         console.log('Book table created successfully!');
//      }).catch((error) => {
//         console.error('Unable to create table : ', error);
//      });
// }

// module.exports = createUser