import React, { memo } from "react";

const Header = memo(({ username, onLogout, onMyTweets, onAllTweets }) => {
  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://lh3.googleusercontent.com/proxy/Rj7F6sK7dxeE0bPaQBO6NYeHMh3RbU8QQ10v6cA1DZunpuOxgOh_Aw4TOzsNVgxXhwuV2S57AMV8MoJTFsUwcbKoxpl28F4Zk54qt0L5cIUArvbwaN8u"
          alt="Dwitter Logo"
          className="logo-img"
        />
        <h1 className="logo-name">아산 암병동2020톡</h1>
        {username && <span className="logo-user">@{username}</span>}
      </div>
      {username && (
        <nav className="menu">
          <button onClick={onAllTweets}>모든 아산톡</button>
          <button onClick={onMyTweets}>내 아산톡</button>
          <button className="menu-item" onClick={onLogout}>
            Logout
          </button>
        </nav>
      )}
    </header>
  );
});

export default Header;
