import React from "react";
import { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function BookmarkButton({ post, token }) {
  const [bookmark, setBookmark] = useState(post.current_user_bookmark_id);

  // helper functions
  async function bookmarkPost() {
    if (post.current_user_bookmark_id) {
      await deleteDataFromServer(
        token,
        `/api/bookmarks/${post.current_user_bookmark_id}`
      );
      post.current_user_bookmark_id = null;
      setBookmark(post.current_user_bookmark_id);
    } else {
      const data = await postDataToServer(token, "/api/bookmarks/", {
        post_id: post.id,
      });
      console.log(data);
      post.current_user_bookmark_id = data.id;
      setBookmark(post.current_user_bookmark_id);
    }
  }

  return (
    <button onClick={() => bookmarkPost()}>
      {bookmark ? (
        <i className="fas fa-bookmark"></i>
      ) : (
        <i className="far fa-bookmark"></i>
      )}
    </button>
  );
}
