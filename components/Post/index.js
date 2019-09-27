import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "react-bootstrap";
import moment from "moment";
import { urlFor } from "../../lib/sanity";
import { Button } from "react-bootstrap";
import Link from "next/link";

import { Divider } from "../Layout";
import Feature from "../Feature";

import "./index.scss";

export default function Post({
  _id,
  title,
  slug,
  description,
  mainImage,
  authorName,
  featured,
}) {
  return (
    <Card key={_id} className={`${featured ? "featured" : ""}`}>
      <Feature />
      <Card.Img variant="top" src={urlFor(mainImage).url()} />
      <Card.Body>
        <Card.Title>
          {title} by {authorName}
        </Card.Title>
        <Card.Text style={{ fontSize: "0.88rem" }}>{`${description.substring(
          0,
          180,
        )}...`}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div
          className="btn-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alingItems: "center",
          }}>
          <Link
            prefetch
            href={`/blog-post/[slug]`}
            as={`/blog-post/${slug.current}`}>
            <a className="btn btn-primary">Read More</a>
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
}
