import React, { useState } from "react";
import { withRouter } from "next/router";
import { CardColumns } from "react-bootstrap";

import { logEvent } from "../../lib/analytics";

import Layout, { Divider } from "../../components/Layout";
import Activity from "../../components/Activity";
import ProductList from "../../components/ProductList";
import AlertDismissible from "../../components/AlertDismissible";

import sanity, { urlFor } from "../../lib/sanity";
import { getActivityByName } from "../../queries/activities";

import "./index.scss";

function ActivityPage({ activity = {}, seo }) {
  return (
    <Layout id="activity" seo={seo}>
      <Activity key={activity._id} data={activity} expanded />

      <div className="products">
        <h3>Essential Items</h3>
        <p className="sub-heading">
          Researched brands and products that are amongst the best in the world
          in terms of quality and price satisfaction.
        </p>

        <AlertDismissible />
        <Divider />

        <h5>
          {activity.products
            ? `${activity.products.length} Essential Product${
                activity.products.length === 1 ? "" : "s"
              }`
            : "Essential Products Coming Soon!"}
        </h5>

        {activity.products ? (
          <ProductList
            onClick={(e) =>
              logEvent(
                `/activity/${activity.title}`,
                `product ${activity.title} comission click`
              )
            }
            products={activity.products}
          />
        ) : null}
      </div>
    </Layout>
  );
}

ActivityPage.getInitialProps = async ({ query, asPath }) => {
  const activity = await sanity.fetch(getActivityByName(query.name));

  const { image, title, description } = activity;

  return {
    activity,
    seo: {
      title,
      description,
      openGraph: {
        url: `https://highvib.es${asPath}`,
        title,
        description,
        images: [
          {
            url: urlFor(image).height(800).width(800).url(),
            width: 800,
            height: 800,
            alt: "description",
          },
        ],
      },
    },
  };
};

export default ActivityPage;
