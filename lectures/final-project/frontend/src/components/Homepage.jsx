import React from "react";
import BarChartComponent from "./BarChart";
import { useEffect } from "react";
import { useState } from "react";


export default function Homepage({ username }) {
  const [items, setItems] = useState([]);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function getItems() {
      const response = await fetch(`${baseURL}/api/plants`);
      const data = await response.json();
      setItems(data);
    }
  
    getItems();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section className="rounded border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">Your app goes here</h1>
        {username ? (
          <p className="mt-2 text-sm text-slate-500">Logged in as {username}</p>
        ) : null}
          <BarChartComponent items={items}/>

      </section>
    </main>
  );
}
