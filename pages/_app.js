import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Added

import React, { Fragment } from "react";
import Router from "next/router";

import * as gtag from "../lib/gtag";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
