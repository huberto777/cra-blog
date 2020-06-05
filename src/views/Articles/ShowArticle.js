import React, { useState, useEffect, useContext } from 'react';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ArticlesAPI from '../../api/ArticlesApi';
import AuthContext from '../../context/AuthContext';
import CommentItem from '../Comments/CommentItem';

function ShowArticle(props) {
  const { accessToken } = useContext(AuthContext);
  const [author, setAuthor] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [views, setViews] = useState();
  const [date, setDate] = useState();
  const [commentsCount, setCommentsCount] = useState();
  const [likesCount, setLikesCount] = useState();
  const [isLiked, setIsLiked] = useState();
  const [tags, setTags] = useState();
  const [comments, setComments] = useState([]);
  // console.log(props);
  useEffect(() => {
    ArticlesAPI.getArticle(props.match.params.slug)
      .then((response) => {
        setAuthor(response.user.map((user) => user.name));
        setTitle(response.title);
        setContent(response.content);
        setViews(response.views);
        setDate(response.date);
        setCommentsCount(response.comments_count);
        setLikesCount(response.likes_count);
        setIsLiked(response.is_liked);
        setTags(
          response.tags.map((tag) => (
            <span key={tag.id} className="badge badge-danger mr-1">
              {tag.name}
            </span>
          )),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const deleteComment = (id) => {
    if (accessToken) {
      // const comments = [...this.state.comments];
      // const index = comments.findIndex((comment) => comment.id === id);
      // comments.splice(index, 1);
      // this.setState({
      //   comments,
      //   comments_count: this.state.comments_count - 1,
      // });
    }
  };
  const handleLike = () => {
    if (accessToken) {
      
      // this.setState({
      //   likes_count: this.state.likes_count + 1,
      //   isLiked: !this.state.isLiked,
      // });
      //   axios
      //     .post(
      //       `http://localhost:8000/api/articles/${this.props.match.params.slug}/likes`,
      //       {},
      //       this.getToken(),
      //     )
      //     .then((res) => res.data)
      //     .catch((err) => console.log(err));
    }
    // else {
    //   alert('musisz się zalogować');
    // }
  };
  const handleUnLike = () => {
    // this.setState({
    //   likes_count: this.state.likes_count - 1,
    //   isLiked: !this.state.isLiked,
    // });
    // axios
    //   .post(
    //     `http://localhost:8000/api/articles/${this.props.match.params.slug}/unlikes`,
    //     {},
    //     this.getToken,
    //   )
    //   .then((res) => res.data)
    //   .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="card">
        <div className="card-header">autor: {author}</div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
        </div>
        <div className="card-footer col-md-12">
          <span className="col-md-3">
            liczba wizyt:
            <span className="badge badge-pill badge-danger">{views}</span>
          </span>
          <span className="col-md-3">
            dodano: <span className="badge badge-pill badge-danger">{date}</span>
          </span>
          <span className="col-md-3">
            ilość komentarzy:
            <span className="badge badge-pill badge-danger">{commentsCount}</span>
          </span>
          {accessToken ? (
            <span className="col-md-3">
              <button
                className="btn btn-warning mr-2 text-white"
                disabled={isLiked}
                onClick={handleLike}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              {likesCount}
              <button className="btn btn-secondary ml-2" disabled={!isLiked} onClick={handleUnLike}>
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
            </span>
          ) : (
            <p className="ml-2">zaloguj się aby dodać like</p>
          )}

          <hr />
          {tags}
        </div>

        <Link to="/" className="btn btn-secondary btn-block mb-2">
          powrót
        </Link>
      </div>

      {accessToken ? (
        <Link
          to={`${props.match.params.slug}/comment/create`}
          className="btn btn-warning btn-block mb-2"
        >
          dodaj komentarz
        </Link>
      ) : (
        <p className="ml-2">zaloguj się aby dodać komentarz</p>
      )}

      <div className="m-2">Komentarze:</div>
      <div className="card">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            user={comment.user.map((user) => user.name)}
            comment={comment}
            slug={props.match.params.slug}
            delete={deleteComment}
          />
        ))}
      </div>
    </>
  );
}

export default ShowArticle;
