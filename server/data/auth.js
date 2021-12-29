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

import { getUsers } from "../database/database.js";
import MongoDb from "mongodb";
const ObjectId = MongoDb.ObjectId;

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username }) //
    .then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id } : user;
}
