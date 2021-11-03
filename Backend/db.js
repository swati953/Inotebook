// connectiity to mongoose database
const mongoose = require('mongoose');
//creating a  inotebook database here by self
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connecting mongo succesfull");
    })
}

module.exports = connectToMongo;