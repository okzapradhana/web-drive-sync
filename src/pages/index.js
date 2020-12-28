import React from "react";
import Header from "../components/Header";
import { Link, StaticQuery, graphql } from "gatsby";

class Home extends React.Component {

  signIn = () => {
    const scope = 'https://www.googleapis.com/auth/drive';
    const redirectUri = 'https://localhost:8000/publications';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&prompt=consent&response_type=code&client_id=${process.env.GATSBY_GOOGLE_CLIENT_ID}&scope=${scope}&access_type=offline`
    console.log(url);
    window.location.href = url;
  }

  render() {
    console.log(window.gapi);
    return (
      <div>
        <Header text="Hello this is Header!" status="member" />
        <div style={{ color: 'blue' }}>Hello world!</div>
        <Link to="/publications">Go to Pub</Link>
        <button onClick={() => this.signIn()}>
          Login with Google
        </button>
        <p>What an achievement!</p>
      </div>
    )
  }
}

export default Home;