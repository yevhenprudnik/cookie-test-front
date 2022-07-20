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
    return (
      <>
        { settingsOpen && 
            <SettingsModal >
              <ProfileSettings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
            </SettingsModal> }
        <Menu right width={ '200px' } noOverlay >
          <div className="pv2">
            <Link onMouseEnter={() => selectUserToFind(userId)}
            className="f6 link dim ba ph3 pv2 mb2 dib purple grow tc w-100" 
            to={`/userProfile?userToGet=${localStorage.getItem('userToFind')}`}>My Profile</Link>
          </div>
          <div className="pv2">
            <Link className="f6 link dim ba ph3 pv2 mb2 dib purple grow tc w-100" to="/friends">Friends</Link>
          </div>
          <div className="pv2">
            <button onClick={() => {setSettingsOpen(!settingsOpen)}} className="f6 link dim ba ph3 pv2 mb2 dib purple grow tc w-100">Settings</button>
          </div>
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