import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Practice() {
  const baseURL = "https://dummyjson.com/products";
  const [post, setPost] = useState(null);
  const [item, setItem] = useState(null);
  const [lastItem, setLastItem] = useState(null);

  console.log("item ", { item });

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      if (item && lastItem) {
        console.log("data slic", response.data.products.slice(item, lastItem));
        setPost(post.slice(item, lastItem));
      } else {
        setPost(response.data.products);
      }
    });
  }, [item, lastItem]);

  if (!post) return null;
  console.log("data", post);

  return (
    <div>
      <h1>hello world</h1>

      <input
        type="number"
        id="item"
        placeholder="item"
        onChange={(e) => setItem(e.target.value)}
      ></input>
      <input
        type="number"
        id="lastitem"
        placeholder="lastitem"
        onChange={(e) => setLastItem(e.target.value)}
      ></input>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {post.map((data, index) => (
            <tr>
              <td>{index}</td>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{data.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Practice;
