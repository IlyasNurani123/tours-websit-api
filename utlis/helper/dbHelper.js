const mongoose = require("mongoose");
const constants = require("../constants");

class DbHelper {

    static formateMongoData(data) {
        if (Array.isArray(data)) {
            const newDataList = [];
            for (let value of data) {
                newDataList.push(value.toObject());
            }
            return newDataList;
        }
        return data.toObject();
    }

    static checkObjectId(id) {
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(constants.databaseMessage.INVALID_ID);
        }
    }
}

module.exports = DbHelper;