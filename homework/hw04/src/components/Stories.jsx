import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Stories({ token, rootURL }) {
  const [stories, setStories] = useState([]);

  async function getStories() {
    const data = await getDataFromServer(token, "/api/stories");
    setStories(data);
  }

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div className="flex gap-4" id="storiesContainer">
      {stories.map((story) => (
        <div
          className="flex flex-col justify-center items-center"
          key={story.id}
        >
          <img
            src={story.user.image_url}
            className="rounded-full border-4 border-gray-300 w-16 h-16 object-cover"
            alt={`${story.user.username} profile pic`}
          />
          <p className="text-xs text-gray-500">{story.user.username}</p>
        </div>
      ))}
    </div>
  );
}
