const fs = require("fs");
const dotEnv = require("dotenv");
const db = require("../database/connection");
const Tour = require("../database/models/tourModel");



dotEnv.config();
db.connectDb();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tour-simple.json`, "utf-8"));

//  IMPORT DATA

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data Successfully Loaded");
    } catch (error) {
        console.log(error)
    }
    process.exit();
}


//  DELETE ALL DATA FROM DB

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data Successfully Deleted")
    } catch (error) {
        console.log("error");
    }
    process.exit();
}

if (process.argv[2] === "--import") {
    importData()
} else if (process.argv[2] === "--delete") {
    deleteData()
}

