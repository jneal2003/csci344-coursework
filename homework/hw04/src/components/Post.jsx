import React, { useState, useEffect } from "react";
import BookmarkButton from "./BookmarkButton";

export default function Post({ post, token }) {
  // helper function for comments
  function getComments(post) {
    const comments = post.comments;

    if (!comments || comments.length === 0) {
      return null;
    }

    if (comments.length === 1) {
      const comment = comments[0];
      return (
        <p className="text-sm mb-3">
          <strong>{comment.user.username}</strong> {comment.text}
        </p>
      );
    }

    const mostRecent = comments[comments.length - 1];

    return (
      <>
        <button className="text-sm text-gray-500 mb-2">
          View all {comments.length} comments
        </button>

        <p className="text-sm mb-3">
          <strong>{mostRecent.user.username}</strong> {mostRecent.text}
        </p>

        <p className="uppercase text-gray-500 text-xs">
          {mostRecent.display_time}
        </p>
      </>
    );
  }

  return (
    <div className="posts">
      <section className="bg-white border mb-10">
        <div className="p-4 flex justify-between">
          <h3 className="text-lg font-Comfortaa font-bold">
            {post.user.username}
          </h3>
          <button className="icon-button">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
        <img
          src={post.image_url}
          alt={post.alt_text || post.caption}
          width="300"
          height="300"
          className="w-full bg-cover"
        />
        <div className="p-4">
          <div className="flex justify-between text-2xl mb-3">
            <div>
              <button>
                <i className="far fa-heart"></i>
              </button>
              <button>
                <i className="far fa-comment"></i>
              </button>
              <button>
                <i className="far fa-paper-plane"></i>
              </button>
            </div>
            <div>
                <BookmarkButton post={post} token={token}/>
            </div>
          </div>
          <p className="font-bold mb-3">{post.likes.length} likes</p>
          <div className="text-sm mb-3">
            <p>
              <strong>{post.user.username}</strong> {post.caption}
            </p>
          </div>
          <div className="text-sm mb-3">{getComments(post)}</div>
        </div>
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center gap-3 min-w-[80%]">
            <i className="far fa-smile text-lg"></i>
            <input
              type="text"
              className="min-w-[80%] focus:outline-none"
              placeholder="Add a comment..."
            />
          </div>
          <button className="text-blue-500 py-2">Post</button>
        </div>
      </section>
    </div>
  );
}