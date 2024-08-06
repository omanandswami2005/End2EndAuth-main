// this file is used to connect to mongodb!

import mongoose from "mongoose";
import chalk from "chalk";

const connect2DB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/tempDBCS`)
        console.log(chalk.bgCyanBright.bold.underline(` 🎉 Connected to Database Successfully!`));
    } catch (error) {
        console.log(chalk.bgRedBright.bold("MONGODB ERROR: ", error));
    }
}

export { connect2DB }