const {Sequelize, DataTypes} = require('sequelize');

const models = require('../models')

let db = {}

function instance_db(){
    return new Sequelize({
        dialect:"sqlite",
        storage:"../db.sqlite"
    })
}

const init = async () => {

    if(db && db.sequelize){
        return 
    }
    const sequelize = instance_db()

    models.forEach(model => { 
        const mod = require(model)(sequelize, DataTypes)
        db[mod.name] = mod
        
    })

    db.sequelize = sequelize
    db.Sequelize = Sequelize

    return Promise.resolve(db)
}

module.exports = {
    db, init
}