import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Banner from "./Banner";
import NewTweetForm from "./NewTweetForm";
import TweetCard from "./TweetCard";
import { useAuth } from "../context/AuthContext";

const Tweets = memo(({ tweetService, username, addable }) => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    tweetService
      .getTweets(username)
      .then((tweets) => setTweets([...tweets]))
      .catch(onError);

    let stopSync = tweetService.onSync("tweets", (tweet) => onCreated(tweet));
    stopSync = tweetService.onSync("tweets-updated", (tweet) =>
      onUpdated(tweet)
    );
    stopSync = tweetService.onSync("tweets-deleted", (tweetId) =>
      onDeleted(tweetId)
    );
    return () => stopSync();
  }, [tweetService, username, user]);

  const onCreated = (tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onUpdated = (tweet) => {
    setTweets((tweets) =>
      tweets.map((item) => (item.id === tweet.id ? tweet : item))
    );
  };

  const onDeleted = (tweetId) => {
    setTweets((tweets) => tweets.filter((tweet) => tweet.id !== tweetId));
  };

  const onDelete = (tweetId) => {
    tweetService
      .deleteTweet(tweetId)
      .then(() => {})
      .catch((error) => setError(error.toString()));
  };

  const onUpdate = (tweetId, text) => {
    tweetService
      .updateTweet(tweetId, text)
      .then((updated) => {})
      .catch((error) => error.toString());
  };

  const onUsernameClick = (tweet) => history.push(`/${tweet.username}`);

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      {addable && (
        <NewTweetForm
          tweetService={tweetService}
          onError={onError}
          onCreated={onCreated}
        />
      )}
      {error && <Banner text={error} isAlert={true} transient={true} />}
      {tweets.length === 0 && <p className="tweets-empty">No Tweets Yet</p>}
      <ul className="tweets">
        {tweets.map((tweet) => (
          <TweetCard
            tweetService={tweetService}
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === user.username}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </ul>
    </>
  );
});
export default Tweets;
