import './App.css';
import { React, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from '../pages/Main/Main';
import Following from '../pages/Main/Following';
import SignIn from '../pages/SignIn/SignIn';
import Register from '../pages/Register/Register';
import Navigation from '../components/Navigation/Navigation';
import SlideMenu from '../components/slideMenu/slideMenu';
import Profile from '../pages/Profile/Profile';
import Friends from '../components/Friends/Friends';
import { logGebrish } from '../redux/UserSlice';

function App({ user, doLog }) {
  const body = document.body;

  body.classList.add(localStorage.getItem('theme'));
  body.classList.add('dark');

  // if (localStorage.getItem('theme')) {
  //   body.classList.add(localStorage.getItem('theme'))
  // } else {
  //   localStorage.setItem('theme', 'light')

  // }

  doLog();

  useEffect(() => {
    localStorage.getItem('accessToken') && user.checkAuth();
  });
  return (
    <>
      {user.authorized && <SlideMenu />}
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Main />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userProfile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/following" element={<Following />} />
        </Route>
      </Routes>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.UserSlice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doLog: () => dispatch(logGebrish()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
