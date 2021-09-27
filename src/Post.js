import React, {useState, useEffect} from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import {db} from "./firebase";
import firebase from "firebase";
import {Button} from "@material-ui/core";

const Post = ({user, postId, username, caption, imageUrl}) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
          setComments(snapshot.docs.map(doc => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = event => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      {/* Header */}

      <img className="post__image" src={imageUrl} alt="" />
      {/* Image */}

      <h4 className="post__text">
        <strong>{username}:</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map(comment => {
          return (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          );
        })}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="Add a Comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <Button
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}

      {/* Username + Caption */}
    </div>
  );
};

export default Post;
