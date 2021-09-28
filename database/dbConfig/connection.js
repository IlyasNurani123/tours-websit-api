const mongoose = require("mongoose");



class DbConnect{

    static  async connectDb () {
        try{
            await mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true,useUnifiedTopology: true}); 
            console.log("Database is connected");
        }catch(error){
            console.log("Database connective Error ", error);
            throw new Error(error);
        }
    }
}

module.exports = DbConnect;