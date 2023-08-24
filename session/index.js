const session = require('express-session')
const mysqlDBSession = require('express-mysql-session')(session)

const initSession = () => {
    const store = new mysqlDBSession({
        host: process.env.HOST,
        port: process.env.DB_PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        createDatabaseTable: true
        
    })
    return session({
        secret: process.env.KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // true si vous utilisez HTTPS, false pour HTTP
            httpOnly: true, // Empêche le JavaScript côté client d'accéder au cookie
            sameSite: 'strict' // Protège le cookie contre certaines vulnérabilités CSRF
          },
        store: store,
    })
    
}


module.exports = initSession