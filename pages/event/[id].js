import { useRouter } from "next/router";
import Axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../src/component/Navbar";

// import Card from "../src/component/Card";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  LivejournalIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const event = (events) => {
  const router = useRouter();
  console.log(router);

  if (router.isFallback) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Head>
          <title>{events.events[0].title}</title>
          <meta property="og:url" content="http://www.goClubHouse.co.kr/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={events.events[0].title} />
          <meta
            property="og:description"
            content={events.events[0].description}
          />
          <meta property="og:site_name" content={events.events[0].title} />
          <meta
            property="og:image"
            content="https://goclubhouse.s3.ap-northeast-2.amazonaws.com/logo.jpeg"
          />
        </Head>
        <Navbar />
        <div style={{ backgroundColor: "#f1efe4" }}>
          <div className="container" style={{ backgroundColor: "#f1efe4" }}>
            <div style={{ cursor: "pointer" }}>
              <div className="templetebox">
                <div
                  className="w-full mt-3 rounded-md"
                  onClick={() => {
                    console.log(events.eventCode);
                  }}
                >
                  <div className="card-body">
                    <p className="card-subtext" style={{ fontSize: "12px" }}>
                      {events.events[0].datetimeKorea}
                    </p>
                    <h5 className="card-title" style={{ fontSize: "15px" }}>
                      {events.events[0].title}
                    </h5>
                    {events.events[0].images.map((kk, index) => (
                      <div className="avatarbox">
                        <div className="innerbox">
                          <img
                            src={kk}
                            alt="Avatar"
                            width="40px"
                            style={{ borderRadius: "50%", marginLeft: "5px" }}
                          ></img>
                          <div style={{ fontSize: "10px" }}>
                            {events.events[0].moderators[index]}
                          </div>
                        </div>
                      </div>
                    ))}

                    <p
                      className="card-subtext mt-3"
                      style={{ fontSize: "12px" }}
                    >
                      {events.events[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div style={{ textAlign: "center" }}>Share event</div>

              <div className="sharebox">
                <div className="col50">
                  <CopyToClipboard
                    text={`https://goclubhousenext12.vercel.app${router.asPath}`}
                    onCopy={() => alert("복사되었습니다!")}
                  >
                    <button>
                      <LivejournalIcon size={38} round />
                    </button>
                  </CopyToClipboard>
                  <div style={{ fontSize: "10px" }}>url복사</div>
                </div>
                <div className="col50">
                  <FacebookShareButton
                    size={64}
                    round={true}
                    url={`https://goclubhousenext12.vercel.app${router.asPath}`}
                  >
                    <FacebookIcon size={38} round />
                  </FacebookShareButton>
                  <div style={{ fontSize: "10px" }}>facebook</div>
                </div>
                <div className="col50">
                  <LinkedinShareButton
                    size={64}
                    round={true}
                    url={`https://goclubhousenext12.vercel.app${router.asPath}`}
                  >
                    <LinkedinIcon size={38} round />
                  </LinkedinShareButton>
                  <div style={{ fontSize: "10px" }}>Linkedin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default event;

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "PN69W9gq" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  console.log(id);
  const apiUrl = `https://ddjw33n2b0.execute-api.ap-northeast-2.amazonaws.com/production/queryDetailEvent?eventID=${id}`;
  const res = await Axios.get(apiUrl);
  console.log(res.data);
  //   const data = res.data;
  // const kk = [1, 2, 3, 4];
  //   con

  return {
    props: {
      events: res.data,
    },
  };
}
