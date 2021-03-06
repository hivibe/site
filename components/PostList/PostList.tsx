import React from "react";
import Post from "../Post";
import { CardColumns } from "react-bootstrap";

import "./index.scss";

const newestFirst = function (a, b) {
  if (a._createdAt > b._createdAt) return -1;
  if (a._createdAt < b._createdAt) return 1;
  return 0;
};

export default function PostList({ posts }) {
  return (
    <CardColumns className="post-list">
      {posts.sort(newestFirst).map((post, i) => {
        return <Post {...post} key={i} />;
      })}
    </CardColumns>
  );
}
