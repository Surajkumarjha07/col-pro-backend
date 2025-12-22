import { connect } from "mongoose";

async function connectToDB() {
    await connect(process.env.MONGO_URI);
}

export default connectToDB;