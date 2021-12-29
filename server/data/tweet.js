import MongoDb from "mongodb";
import * as userRepository from "../data/auth.js";
import { getTweets } from "../database/database.js";
const ObjectId = MongoDb.ObjectId;

// let tweets = [
//   {
//     id: "1",
//     text: "드림코더분들 화이팅!",
//     createdAt: new Date().toString(),
//     userId: "1",
//   },
//   {
//     id: "2",
//     text: "안뇽!",
//     createdAt: new Date().toString(),
//     userId: "1",
//   },
// ];

export async function getAll() {
  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const { username, name, url } = await userRepository.findById(
  //       tweet.userId
  //     );
  //     return { ...tweet, username, name, url };
  //   })
  // );
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  // return getAll().then((tweets) =>
  //   tweets.filter((tweet) => tweet.username === username)
  // );
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  // const found = tweets.find((tweet) => tweet.id === id);
  // if (!found) {
  //   return null;
  // }
  // const { username, name, url } = await userRepository.findById(found.userId);
  // return { ...found, username, name, url };
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    // id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
    name: name,
    username: username,
    url: url,
  };
  // tweets = [tweet, ...tweets];
  // return getById(tweet.id);
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}

export async function update(id, text) {
  // const tweet = tweets.find((tweet) => tweet.id === id);
  // if (tweet) {
  //   tweet.text = text;
  // }
  // return getById(tweet.id);
  return getTweets() //
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      { returnDocument: "after" } // update된 후의 객체를 반환
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  // tweets = tweets.filter((tweet) => tweet.id !== id);
  return getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
  // tweets.map((tweet) => mapOptionalTweet(tweet));
}
