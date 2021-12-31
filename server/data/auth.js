// abcd123: $2b$12$ehsy8RjAlkww1Zmawzi8hOayQbOM3WFYgkWGot9t9DCiWXZrTTGoK
// let users = [
//   {
//     id: "1",
//     username: "bob",
//     password: "$2b$12$ehsy8RjAlkww1Zmawzi8hOayQbOM3WFYgkWGot9t9DCiWXZrTTGoK",
//     name: "Bob",
//     email: "bob@gmail.com",
//     url: "https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/1200px-Chelsea_FC_Logo.svg.png",
//   },
// ];

import { useVirtualId } from "../database/database.js";
// import MongoDb from "mongodb";
import Mongoose from "mongoose";
// const ObjectId = MongoDb.ObjectId;

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  // email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);
const User = Mongoose.model("User", userSchema);

export async function findByUsername(username) {
  return User.findOne({ username });
  // return getUsers()
  //   .findOne({ username })
  //   .next()
  //   .then(mapOptionalUser);
}

export async function findById(id) {
  return User.findById(id);
  // return getUsers()
  //   .findOne({ _id: new ObjectId(id) })
  //   .next()
  //   .then(mapOptionalUser);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
  // return getUsers()
  //   .insertOne(user)
  //   .then((data) => data.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
