import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function CommentItem(props) {
  const { accessToken } = useContext(AuthContext);
  const { comment, user, slug } = props;
  // console.log(props);
  return (
    <>
      <div className="card-header">
        <p>autor: {user}</p>
      </div>
      <div className="card-body">
        <p className="card-title">{comment.content}</p>
        <hr />
        <p className="card-text">
          ocena: {comment.rating} <FontAwesomeIcon icon={faStar} />
        </p>
        {accessToken ? (
          <>
            <Link
              to={`/articles/${slug}/comment/${comment.id}/edit`}
              className="btn btn-sm btn-success mr-1"
            >
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            <button className="btn btn-sm btn-danger" onClick={() => props.delete(comment.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default CommentItem;
