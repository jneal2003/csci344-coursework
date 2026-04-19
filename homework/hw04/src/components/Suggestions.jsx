import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Suggestions({ token }) {
  const [suggestions, setSuggestions] = useState([]);

  async function getSuggestions() {
    const data = await getDataFromServer(token, "/api/suggestions");
    setSuggestions(data);
  }

  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <div className="mt-4">
      <p className="text-base text-gray-400 font-bold mb-4">
        Suggestions for you
      </p>

      {suggestions.map((suggestion) => (
        <section class="flex justify-between items-center mb-4 gap-2">
          <img
            src={suggestion.image_url}
            class="rounded-full w-10 h-10 object-cover"
            alt={`${suggestion.username} profile pic`}
          />
          <div class="w-[180px]">
            <p class="font-bold text-sm truncate">${suggestion.username}</p>
            <p class="text-gray-500 text-xs truncate">suggested for you</p>
          </div>
          <button class="text-blue-500 text-sm py-2">follow</button>
        </section>
      ))}
    </div>
  );
}
