//import MongoDb from "mongodb";
import Mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
  // return MongoDb.MongoClient.connect(config.db.host) //
  //   .then((client) => {
  //     db = client.db();
  //   });
  return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema) {
  // _id -> id
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}

let db;
// export function getUsers() {
//   return db.collection("users");
// }

export function getTweets() {
  return db.collection("tweets");
}
