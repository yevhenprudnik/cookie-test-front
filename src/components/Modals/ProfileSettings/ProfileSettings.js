import { React, useState} from "react";
import { connect } from 'react-redux'
import Swal from "sweetalert2";
import "./ProfileSettings.css"
import { updNameAndImg } from "../../../redux/UserSlice";

const ProfileSettings = ({ setSettingsOpen, username, updNameAndImg, profileImage, memberSince, userId }) => {
  const [newName, setNewName] = useState(username)
  const [newImg, setNewImg] = useState(profileImage)
    return (
        <div className='profile-modal'>
        <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center cardModal'>
          <main className='pa4 black-80 w-80'>
            <img
              src={profileImage}
              className='h3 w3 dib br-100 highlight' alt='Profile Image'
            />
            <h1>{newName}</h1>
            <p>{`Member since: ${memberSince}`}</p>
            <label className='mt2 fw6' htmlFor='user-name'>Name:</label>
            <input type='text' name='user-name' maxLength='15' minLength='5' placeholder={username} className='pa2 br2 ba w-100'
              onChange={(e) => setNewName(e.target.value)}>
            </input>
            <label className='mt2 fw6' htmlFor='user-name'>Profile Image</label>
            <input type='text' name='profile-image' placeholder={profileImage} className='pa2 br2 ba w-100'
              onChange={(e) => setNewImg(e.target.value)}>
            </input>
            <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
              <button className='b br2 pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
              onClick={() => {
                if (!newName) {
                    Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Blank name field is unacceptable`,
                  })
                } else if(newName.length < 5){
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Name should be at least 5 characters`,
                  })
                } else {
                    updNameAndImg({ userId, newName, newImg })
                    Swal.fire({
                      title: newName,
                      imageUrl: newImg,
                      imageWidth: 300,
                      imageHeight: 300,
                    })
                    setSettingsOpen(false)
                }
              }}
              >
                Save
              </button>
              <button className='b br2 pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                onClick={() => setSettingsOpen(false)}>
                Cancel
              </button>
            </div>
          </main>
          <div className='modal-close' onClick={() => setSettingsOpen(false)}>
            &times;
          </div>
        </article>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
      userId: state.UserSlice.userId,
      username: state.UserSlice.username, 
      authorized: state.UserSlice.authorized,
      profileImage: state.UserSlice.profileImage,
      memberSince: state.UserSlice.memberSince
    }
}
const mapDispatchToProps = (dispatch) => {
  return { 
    updNameAndImg: (updateData) => dispatch(updNameAndImg(updateData))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)