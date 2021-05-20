const mongoose = require('mongoose');




const dbConnection = async ()=>{

    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } );
        console.log('Base de datos ONLINE');

    } catch (error) {
        throw new Error ('Error a la hora de inicializar la base de datos');
    }


}



module.exports = {
    
    dbConnection

}
