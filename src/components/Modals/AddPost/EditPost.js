import { React, useState } from "react";
import { connect } from 'react-redux'
import { editPost } from "../../../redux/PostsSlice";
import Loader from "../Loader/Loader";
import LoaderModal from "../Loader/LoaderModal";
import "./PostModal.css"

const EditPost = ({ setEditPostOpen, editPost, postId, setEdited }) => {
  const [newText, setText] = useState('')
  const [loading, setLoading] = useState(false)
    return (
        <div className='post-modal'>
          {loading && 
          <LoaderModal>
            <Loader />
          </LoaderModal>}
        <article className='br3 ba b--black-10 mv4 w-100 mw7 shadow-5 center cardModal'>
          <main className='pa4 black-80 w-80'>
            <label className='mt2 fw6' htmlFor='user-name'>New Text:</label>
            <textarea type='text' onChange={(e) => setText(e.target.value)} className='pa2 br2 ba w-100'></textarea>
            <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
              <button className='b pa2 br2 grow pointer hover-white w-20 bg-light-blue b--black-20'
              onClick={() => {
                editPost({postId, newText})
                setLoading(true)
                setTimeout(() => {
                  setLoading(false)
                  setEditPostOpen(false)
                  setEdited(true)
                },500)
              }}
              >
                Edit
              </button>
              <button className='b br2 pa2 grow pointer hover-white w-20 bg-light-red b--black-20'
                onClick={() => setEditPostOpen(false)}>
                Cancel
              </button>
            </div>
          </main>
          <div className='modal-close' onClick={() => setEditPostOpen(false)}>
            &times;
          </div>
        </article>
      </div>
    )
}
function mapDispatchToProps(dispatch){
  return { 
      editPost: (postData) => dispatch(editPost(postData)),
    }
  }
  const mapStateToProps = (state) => {
    return {
      username: state.UserSlice.username,
      userId: state.UserSlice.userId
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(EditPost)