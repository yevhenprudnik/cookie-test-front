import { slide as Menu } from 'react-burger-menu'
import { React, useState} from 'react';
import { Link, Outlet } from 'react-router-dom'
import { connect } from 'react-redux';
import { selectUserToFind } from '../../redux/UserSlice';
import './slideMenu.css'
import SettingsModal from '../Modals/ProfileSettings/SettingsModal'
import ProfileSettings from '../Modals/ProfileSettings/ProfileSettings'
const SlideMenu = ({ userId, selectUserToFind }) => {
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [myForceRender, setMyForceRender] = useState(0)
    const body = document.body;
    const handleTheme = (e) => {
      console.log(e)
      if (e) {
        localStorage.setItem('theme', 'dark');
        body.classList.replace('light', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
        body.classList.replace('dark', 'light');
      }
    }

    return (
      <>
        { settingsOpen && 
            <SettingsModal >
              <ProfileSettings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
            </SettingsModal> }
        <Menu right width={ '200px' } noOverlay >
          <div className="pv2">
            <Link onMouseEnter={() => selectUserToFind(userId)}
            className="navLinks f6 link dim ba ph3 pv2 mb2 dib grow tc w-100 br2" 
            to={`/userProfile?userToGet=${userId}`}>My Profile</Link>
          </div>
          <div className="pv2">
            <Link className="navLinks f6 link dim ba ph3 pv2 mb2 dib grow tc w-100 br2" to="/friends">Friends</Link>
          </div>
          <div className="pv2">
            <div onClick={() => {setSettingsOpen(!settingsOpen)}} className="navLinks f6 link dim ba ph3 br2 pv2 mb2 dib grow tc w-100 pointer">Settings</div>
          </div>
          <div className="themeButton">
              <label className="switch btn-color-mode-switch">
                    <input type="checkbox" name="color_mode" id="color_mode" 
                    defaultChecked={localStorage.getItem('theme') === 'dark'} 
                    onClick={(e) => handleTheme(e.target.checked)}/>
                    <label htmlFor="color_mode" data-on="Dark" data-off="Light" className="btn-color-mode-switch-inner"></label>
              </label>
          </div>
            {/* onClick={() => {body.classList.add('dark')}}  */}
        </Menu>
        <Outlet />
      </>
    );
}

const mapDispatchToProps = (dispatch) => {
  return { 
    selectUserToFind : (userId) => dispatch(selectUserToFind(userId))
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.UserSlice.userId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideMenu)