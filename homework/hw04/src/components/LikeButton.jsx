import React from "react";
import { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function LikeButton({ post, token }) {
  const [like, setLike] = useState(post.current_user_like_id);

  // helper functions
  async function likePost() {
    if (post.current_user_like_id) {
      await deleteDataFromServer(
        token,
        `/api/likes/${post.current_user_like_id}`
      );
      post.current_user_like_id = null;
      setLike(post.current_user_like_id);
    } else {
      const data = await postDataToServer(token, "/api/likes/", {
        post_id: post.id,
      });
      console.log(data);
      post.current_user_like_id = data.id;
      setLike(post.current_user_like_id);
    }
  }

  return (
    <button onClick={() => likePost()}>
      {like ? (
        <i className="fas fa-heart"></i>
      ) : (
        <i className="far fa-heart"></i>
      )}
    </button>
  );
}
