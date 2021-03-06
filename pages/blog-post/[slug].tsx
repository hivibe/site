import React, { Fragment } from "react";
import { withRouter } from "next/router";
import { Card } from "react-bootstrap";

import sanity, { urlFor } from "../../lib/sanity";
import { getPostBySlug } from "../../queries/posts";

import Layout, { Divider } from "../../components/Layout";
import Block from "../../components/Block";
import Tags from "../../components/Tags";
import MailchimpForm from "../../components/MailchimpForm";
import ShareIcons from "../../components/ShareIcons";

import "./index.scss";

function Post({ post, seo, asPath }) {
  const {
    title = "Missing title",
    authorName = "Missing name",
    tags,
    mainImage,
    description,
    products,
    body = [],
    id,
  } = post;

  return (
    <Layout seo={seo} id="blog-post" fixedNav={true}>
      <div
        className="full-img"
        style={{
          background: `url(${urlFor(
            mainImage
          ).url()}) no-repeat center center fixed`,
        }}
      />
      <div className="body">
        <article>
          <h1>{title}</h1>
          <span>By {authorName}</span>
          {tags && <Tags tags={tags.tags} />}
          <Divider type="left" />

          <Block content={body} />
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <ShareIcons
              path={asPath}
              title={title}
              description={description}
              caption={description}
              media={urlFor(mainImage).url()}
              image={urlFor(mainImage).url()}
              subject={`Check out this article, ${title}, from highvib.es`}
              body="I found this pretty useful and wanted to share it with you!"
              openWindow={true}
              tags={tags}
              quote={description}
            />
          </div>
        </article>
        <div className="sidebar">
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="font-italic">About High Vib.es</h4>
            <p className="mb-0">
              In the Pursuit of Life, to Know and Experience the Truth is our
              ultimate Goal. Highvib.es intends to empower this Journey with the
              Highest Vibrational Content for your Growth and Wellbeing. Thanks
              for reading with us! Check out our Newsletter Signup, as well as
              other Posts and Products related to this post!
            </p>
          </div>
          <div className="sidebar-block newsletter-signup">
            <MailchimpForm source={`Blog Post: ${title}`} />
          </div>
          <div className="sidebar-block featured-products">
            <h3>Product Highlights</h3>
            <Divider />
            {products ? (
              <Fragment>
                {products.map(({ title, link, image, description }) => (
                  <Card className="mb-4">
                    <Card.Img
                      variant="top"
                      src={urlFor(image).width(380).url()}
                    />
                    <Card.Body>
                      <h4>{title}</h4>
                      <small className="text-muted">
                        {description.slice(0, 200) + "..."}
                      </small>
                    </Card.Body>
                    <Card.Footer>
                      <a
                        className="btn btn-primary btn-block"
                        href={link}
                        target="_blank"
                      >
                        Get It Today!
                      </a>
                    </Card.Footer>
                  </Card>
                ))}
              </Fragment>
            ) : (
              <p>Highlights coming soon!</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

Post.getInitialProps = async function ({ query, asPath }) {
  const { slug = "" } = query;
  const post = await sanity.fetch(getPostBySlug, { slug });

  const { title, description, mainImage, authorName, publishedAt, tags } = post;
  const nameSplit = authorName.split();

  return {
    post,
    seo: {
      title,
      description,
      openGraph: {
        url: `https://highvib.es${asPath}`,
        title,
        description,
        images: [
          {
            url: urlFor(mainImage).height(800).width(800).url(),
            width: 800,
            height: 800,
            alt: "description",
          },
        ],
        profile: {
          firstName: nameSplit[0],
          lastName: nameSplit[1],
          username: `${nameSplit[0]}${nameSplit[1]}`,
          gender: "male", // TODO: sanity option
        },
        article: {
          publishedTime: publishedAt,
          authors: [authorName],
          // section: TODO: sanity option.
          tags: tags,
        },
      },
    },
  };
};

export default withRouter(Post);
