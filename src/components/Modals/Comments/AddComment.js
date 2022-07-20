import { React, useState } from "react";
import { connect } from 'react-redux';
import { addComment, getPosts } from "../../../redux/PostsSlice";
import Swal from 'sweetalert2'
import "./CommentModal.css";
import LoaderModal from "../Loader/LoaderModal";
import Loader from "../Loader/Loader";

const AddComment = ({ setCommentModal, comments, addComment, loadPosts, id, userId }) => {
  const [ comment, setComment ] = useState('')
  const [loading, setLoading] = useState(false)
  const [myForceRender, setMyForceRender] = useState(0)
    return (
      <div>
        {loading && 
          <LoaderModal>
            <Loader />
          </LoaderModal>
        }
        <div className='comment-modal'>
          <article className='br3 ba b--black-10 w-100 mw7 shadow-5 center bg-white'>
            <main className='pa4 black-80 w-80'>
              {comments.map((comment, i) =>{ return(
                <div className='commentDiv'key = {i}>
                  <h2>@{comment.writtenBy.username}:</h2>
                  <h3>{comment.comment}</h3>
                </div>
              )})}
            </main>
            <div className='modal-close' 
            onClick={() => setCommentModal(false)}
            >
              &times;
            </div>
          </article>
          <div className='AcommentDiv'>
            <article className='br3 ba b--black-10 w-100 mw8 shadow-5 center bg-white'>
              <main className='pa2 black-80 w-80'>
                <div className='pb2'>
                  <label className='fw6' htmlFor='user-name'>Comment:</label>
                </div>
                <div className="">
                  <textarea type='text' value={comment} onChange={(e) => setComment(e.target.value)} className='pt2 br2 ba w-100'></textarea>
                </div>
                <div className='mt1' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                  <button className='b1 br2 pa1 grow pointer hover-white w-20 bg-light-blue b--black-20'
                  onClick={() => {
                    if (comment) {
                      addComment({
                        userId,
                        postId: id,
                        comment
                      })
                      setLoading(true)
                      setTimeout(() =>{
                        loadPosts()
                        setLoading(false)
                      }, 1500)
                      setComment('')
                      setMyForceRender(myForceRender+1)
                    }
                    else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Blank comment is unacceptable`,
                      })
                    }
                  }}
                  >
                    Add
                  </button>
                  <button className='b1 br2 pa1 grow pointer hover-white w-20 bg-light-red b--black-20'
                    onClick={() => setCommentModal(false)}
                    >
                    Cancel
                  </button>
                </div>
              </main>
            </article>
          </div>
        </div>
      </div>
    )
}
function mapDispatchToProps(dispatch){
  return { 
      addComment: (commentData) => dispatch(addComment(commentData)), 
      loadPosts: () => dispatch(getPosts())
    }
}
const mapStateToProps = (state) => {
  return {
    username: state.UserSlice.username,
    userId: state.UserSlice.userId
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
//connect(mapStateToProps, mapDispatchToProps)(AddPost)