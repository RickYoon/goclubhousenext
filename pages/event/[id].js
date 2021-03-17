import { useRouter } from "next/router";
import Axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
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

  //   const router = useRouter();
  //   const { id } = router.query;
  //   //   const [item, setItem] = useState({});

  //   //   const API_URL = `https://ddjw33n2b0.execute-api.ap-northeast-2.amazonaws.com/production/queryDetailEvent?eventID=${id}`;

  //   //   function getData() {
  //   //     Axios.get(API_URL).then((res) => {
  //   //       console.log(res);
  //   //     });
  //   //   }

  //   //   useEffect(() => {
  //   //     // if (id && id > 0) {
  //   //     getData();
  //   //     // }
  //   //   }, []);

  //   //   const url = window.location.href;
  //   const [events, setEvents] = useState({
  //     title: "",
  //     weekday: "",
  //     moderators: "",
  //     moderatorsArray: "",
  //     images: [],
  //     description: "",
  //     datetime: "",
  //     datetimeDB: "",
  //     club: "",
  //     url: "",
  //   });
  //   // const {
  //   //   title,
  //   //   weekday,
  //   //   moderators,
  //   //   moderatorsArray,
  //   //   images,
  //   //   description,
  //   //   datetime,
  //   //   club,
  //   // } = events; // 비구조화 할당을 통해 값 추출

  //   //   let history = useHistory();
  //   //   const { id } = useParams();
  //   // const back = () => {
  //   //   history.push("/");
  //   // };

  //   useEffect(() => {
  //     loadUsers();
  //   }, []);

  //   const loadUsers = async () => {
  //     const result = await Axios({
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       url: `https://ddjw33n2b0.execute-api.ap-northeast-2.amazonaws.com/production/queryDetailEvent?eventID=${id}`,
  //     }).then((res) => {
  //       setEvents({
  //         ...events,
  //         title: res.data[0].title,
  //         weekday: res.data[0].weekday,
  //         images: res.data[0].images,
  //         description: res.data[0].description,
  //         club: res.data[0].club,
  //         moderators: res.data[0].moderators,
  //         moderatorsArray: res.data[0].moderatorsArray,
  //         url: res.data[0].url,
  //         datetimeKorea: res.data[0].datetimeKorea,
  //       });

  //       console.log(events);
  //     });
  //   };

  //   const gotoclub = () => {
  //     // window.location.href = "https://ios.joinclubhouse.com/event/M8NOG6q7";
  //   };
  //   console.log(events.events[0].title);
  if (router.isFallback) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Head>
          <title>detail</title>

          <meta property="og:url" content="http://www.bbsetheme.com/" />
          <meta
            property="og:title"
            content="보부상 워드프레스 테마, BBS e-theme"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="http://www.bbsetheme.com/wp-content/uploads/2017/11/bbsetheme_logo.png"
          />
          <meta
            property="og:description"
            content="한국형 워드프레스 테마, 플러그인, 독립형 쇼핑몰 솔루션 제작, 반응형웹, 웹접근성, SEO 지원"
          />
        </Head>
        <div style={{ backgroundColor: "#f1efe4" }}>
          <div>nice</div>
          {/* <div className="container" style={{ backgroundColor: "#f1efe4" }}>
        <div onClick={gotoclub} style={{ cursor: "pointer" }}>
          <div className="templetebox">
            <div
              className="w-full mt-3 rounded-md"
              onClick={() => {
                console.log(events.eventCode);
              }}
            >
              <div className="card-body">
                <p className="card-subtext" style={{ fontSize: "12px" }}>
                  {events.datetimeKorea}
                </p>
                <h5 className="card-title" style={{ fontSize: "15px" }}>
                  {events.title}
                </h5>
                {events.images.map((kk, index) => (
                  <div className="avatarbox">
                    <div className="innerbox">
                      <img
                        src={kk}
                        alt="Avatar"
                        width="40px"
                        style={{ borderRadius: "50%", marginLeft: "5px" }}
                      ></img>
                      <div style={{ fontSize: "10px" }}>
                        {events.moderators[index]}
                      </div>
                    </div>
                  </div>
                ))}

                <p className="card-subtext mt-3" style={{ fontSize: "12px" }}>
                  {events.description}
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
                text={"aa"}
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
                url={`http://www.goclubhouse.co.kr/event/xe2AOvd3`}
              >
                <FacebookIcon size={38} round />
              </FacebookShareButton>
              <div style={{ fontSize: "10px" }}>facebook</div>
            </div>
            <div className="col50">
              <LinkedinShareButton
                size={64}
                round={true}
                url={`http://www.goclubhouse.co.kr/event/xe2AOvd3`}
              >
                <LinkedinIcon size={38} round />
              </LinkedinShareButton>
              <div style={{ fontSize: "10px" }}>Linkedin</div>
            </div>
          </div>
        </div>
      </div> */}
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
