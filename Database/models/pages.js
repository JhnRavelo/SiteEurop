module.exports = (sequelize, DataTypes) => {
    const pages = sequelize.define('pages', {
        ID_page:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        page:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return pages
}
// const createPage = async()=>{
//     const database = connectDatabase()
    

//     await pages.sync().then(()=>{
//         console.log('success page')
//     }).catch((err)=>{
//         console.error('Error page',err)
//     })
// }

// module.exports = createPage