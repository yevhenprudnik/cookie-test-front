import { React, useState, useEffect } from 'react';
import PostCard from './PostCard';
import { getPosts } from '../../redux/PostsSlice';
import { connect } from 'react-redux';
import AddPost from '../../components/Modals/AddPost/AddPost';
import PostModal from '../../components/Modals/AddPost/AddPostModal';
import { unActivatedEmail } from '../../helper/handleUnsignedUser';
import liked from './images/heartLiked.png';
import like from './images/heart.png';

const Main = ({
  posts,
  authorized,
  loadPosts,
  isActivated,
  email,
  userId,
  following,
}) => {
  const [addPostOpen, setAddPostOpen] = useState(false);
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div>
      <div className='test_img_div'>
        <img
          className="test_img"
          src="https://media.istockphoto.com/id/1369182324/vector/abstract-numbers-colorful-linear-set-modern-numeric-lines-with-new-pop-art-colors.jpg?s=612x612&w=0&k=20&c=HfhXlv6y7x5o1PuhBB2X2VC2kmsUcnMLV6lgFbLcjrc="
        />
      </div>

      {!isActivated && authorized && (
        <div className="pt2 confirmEmailDiv">
          <div className="tc confirmEmail">
            We have sent an activation link to {email}. Please confirm your
            email
          </div>
        </div>
      )}
      {authorized && addPostOpen ? (
        <>
          <PostModal>
            <AddPost
              addPostOpen={addPostOpen}
              setAddPostOpen={setAddPostOpen}
            />
          </PostModal>
          <div
            className="addButtonDiv grow"
            onClick={() => {
              setAddPostOpen(true);
            }}
          ></div>
        </>
      ) : (
        authorized && (
          <div
            className="addButtonDiv grow"
            onClick={() => {
              // if (isActivated) {
              setAddPostOpen(true);
              // } else {
              //   unActivatedEmail("create a post")
              // }
            }}
          ></div>
        )
      )}
      {createCards(posts, userId)}
    </div>
  );
};

export function createCards(arr, userId) {
  const Cards = arr.map((post, i) => {
    return (
      <PostCard
        key={post._id}
        id={post._id}
        postUsername={post.postedBy.username}
        postUserId={post.postedBy._id}
        text={post.text}
        date={post.postedAt}
        likedBy={post.likedBy}
        comments={post.comments}
        postUserImg={post.postedBy.profileImage}
        likeImgProp={
          post.likedBy.findIndex(e => e._id === userId) === -1 ? like : liked
        }
      />
    );
  });
  return Cards;
}

function mapStateToProps(state) {
  return {
    posts: state.PostsSlice.posts,
    authorized: state.UserSlice.authorized,
    isActivated: state.UserSlice.isActivated,
    email: state.UserSlice.email,
    userId: state.UserSlice.userId,
    following: state.UserSlice.following,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(getPosts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

//[]  for (let i = 0; i < movies.length; i++) {
//     cardComponent.push(
//         <Card
//         key = {i}
//         id = {movies[i]._id}
//         title = {movies[i].title}
//         subtitle = {movies[i].subtitle}
//         year = {movies[i].year}
//         genre = {getStr(movies[i].genre)}
//         topCast = {getStr(movies[i].topCast)}
//         synopsis = {movies[i].synopsis}
//         image = {movies[i].image}
//         trailer = {movies[i].trailer}
//         Rating = {movies[i].Rating}
//         signedIn = {signedIn}
//         username = {movies[i].username}
//         email = {movies[i].email}
//         link = {movies[i].link}
//         more = {movies[i].more}
//     />
//     )
// }
