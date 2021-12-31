import React, { useState } from "react";
import Banner from "../components/Banner";
import ProfileImage from "../components/ProfileImage";

const Login = ({ onSignUp, onLogin }) => {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [url, setURL] = useState("");
  const [text, setText] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (signup) {
      console.log(profileImage);
      onSignUp(username, password, name, profileImage).catch(setError);
    } else {
      onLogin(username, password).catch(setError);
    }
  };

  const setError = (error) => {
    setText(error.toString());
    setIsAlert(true);
  };

  const imageUrl = (url) => {
    setProfileImage(url);
  };

  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;
    switch (name) {
      case "username":
        return setUsername(value);
      case "password":
        return setPassword(value);
      case "name":
        return setName(value);
      // case "email":
      //   return setEmail(value);
      // case "url":
      //   return setURL(value);
      case "signup":
        return setSignup(checked);
      default:
    }
  };

  return (
    <>
      <Banner text={text} isAlert={isAlert} />
      <form className="auth-form" onSubmit={onSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Id"
          value={username}
          onChange={onChange}
          className="form-input"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          className="form-input"
          onChange={onChange}
        />
        {signup && (
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={onChange}
            className="form-input"
            required
          />
        )}
        {/* {signup && (
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            className="form-input"
            required
          />
        )} */}
        {/* {signup && (
          <input
            name="url"
            type="url"
            placeholder="Profile Image URL"
            value={url}
            onChange={onChange}
            className="form-input"
          />
        )} */}
        {signup && <ProfileImage imageUrl={imageUrl} />}
        <div className="form-signup">
          <input
            name="signup"
            id="signup"
            type="checkbox"
            onChange={onChange}
            checked={signup}
          />
          <label htmlFor="signup"> 회원가입</label>
        </div>
        <button className="form-btn auth-form-btn" type="submit">
          {signup ? "가입하기" : "로그인"}
        </button>
      </form>
    </>
  );
};

export default Login;
