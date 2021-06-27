const mongoose = require("mongoose");
const constants = require("../constants");

class DbHelper {

  static formateMongoData(data){
        if (Array.isArray(data)) {
            const newDataList = [];
            let value;
            // eslint-disable-next-line no-restricted-syntax
            for (value of data) {
                newDataList.push(value.toObject());
            }
            return newDataList;
        }
        return data.toObject();
    }

    static checkObjectId(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(constants.databaseMessage.INVALID_ID);
        }
    }
}

module.exports = DbHelper;