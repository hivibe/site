import React, { useEffect } from "react";
import { useGlobal } from "reactn";
import Head from "next/head";
import Pixel from "../Pixel";
import { NextSeo } from "next-seo";

import { initGA, logPageView } from "../../lib/analytics";

import Navigation from "../Navigation";
import Footer from "../Footer";
import GlobalModal from "../GlobalModal";

import Divider from "./Divider";
import SectionHeader from "./SectionHeader";

import "./index.scss";

function Layout({ id, children, seo, ...props }) {
  useEffect(() => {
    function analyze() {
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }

      logPageView();
    }

    analyze();
  }, []);

  const { fixedNav = false } = props;
  const [modal] = useGlobal("modal");

  return (
    <div id={id} className="page">
      <Head>
        <meta
          name="google-site-verification"
          content="sO6wuMmvZ9hsBHpkHZaNRqqA9xnwGV8_YRN6N2TU2nc"
        />
      </Head>
      <NextSeo {...seo} />
      <Navigation fixedNav={fixedNav} />
      <GlobalModal modal={modal} />
      {children}
      <Footer />
      <Pixel name="FACEBOOK_PIXEL_1" />
    </div>
  );
}

export default Layout;
export { Divider, SectionHeader };
