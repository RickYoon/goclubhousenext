import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./src/component/Navbar";
import Link from "next/link";
import axios from "axios";
import ReactLoading from "react-loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchtrigger, setSearchtrigger] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchtype, setSearchtype] = useState("fromtoday");
  const [infos, setInfos] = useState({
    title: "",
    weekday: "",
    moderators: "",
    moderatorsArray: "",
    images: [],
    description: "",
    datetime: "",
    datetimeDB: "",
    club: "",
    url: "",
  });

  const {
    title,
    weekday,
    moderators,
    moderatorsArray,
    images,
    description,
    datetime,
    club,
  } = infos;

  useEffect(() => {
    loadUsers();
  }, [searchtype]);

  const loadUsers = async () => {
    setIsLoading(true);

    const result = await axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `https://ddjw33n2b0.execute-api.ap-northeast-2.amazonaws.com/production/queryEvents?searchtype=${searchtype}&keyword=${keyword}`,
      // url: `https://z5v2zc0s9i.execute-api.ap-northeast-2.amazonaws.com/production/getLifeInfo`,
    }).then((res) => {
      setIsLoading(false);
      var sortingField = "eventDate";
      console.log(res.data.Items);
      if (searchtype === "fromtoday") {
        res.data.Items.sort(function (a, b) {
          if (a.eventDate < b.eventDate) {
            return -1;
          } else if (a.eventDate > b.eventDate) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        console.log("newupdates");
      }

      // console.log(res.data.Items[2].eventDate);

      // // );
      // console.log(res.data.Items);

      setEvents(res.data.Items);
      // console.log(events);
    });
  };

  const goDetailpage = (e) => {
    window.location.href = "/add";
    console.log("you clicked!");
  };

  const searchbutton = (e) => {
    // window.location.href = "/add";
    // console.log(e);
  };
  function searchstart(event) {
    // console.log(event);
    event.preventDefault();
    // console.log("form go");
  }

  const onChange = (e) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const onReset = () => {
    // setText("");
    loadUsers();
    if (searchtrigger === true) {
      setSearchtrigger(false);
    } else {
      setSearchtrigger(true);
    }
    console.log("click button");
  };

  return (
    <>
      <Head>
        <title>goClubHouse | welcome!</title>
        <meta name="title" content="goClubHouse" />
        <meta
          name="description"
          content="goclubhouse 를 통해서 더 많은 이벤트를 만나보세요."
        />
        <meta
          name="keywords"
          content="클럽하우스, RSVP, clubhouse, goclubhouse, 스타트업, 재테크, 주식, 명상, 인싸, 클하초대장, 클하이벤트"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="goClubHouse - 클럽하우스를 통해 더 넓은 세상을 만나는 방법"
        />
        <meta
          property="og:description"
          content="클럽하우스를 통해서 더 많은 이벤트와 사람을 만날 수 있도록 돕습니다."
        />
        <meta property="og:site_name" content="goClubHouse" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="쇼피랩스 shopeelabs - 마진계산기 & 시장조사"
        />
        <meta
          name="twitter:description"
          content="쇼피셀러를 위한 모든 툴과 정보를 제공하기 위해서 연구하는 쇼피랩스입니다. 쇼피제품판매를 위해 소요되는 시간을 절약하고, 더 잘팔릴 물건을 올릴 수 있도록 돕도록 하겠습니다."
        />{" "}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div style={{ backgroundColor: "#f1efe4" }}>
        <Navbar />
        <div className="container mx-auto desktop mb-2 md:mb-10">
          <div className="w-full md:w-5/6 mx-auto bg-white p-4 rounded-md shadow-lg mt-5">
            <form onSubmit={searchstart}>
              <p className="text-left text-xl ff font-semibold mb-1">
                관심있는 이벤트 찾기
              </p>{" "}
              <div className="w-full">
                <input
                  onChange={onChange}
                  value={keyword}
                  style={{ fontSize: "12px" }}
                  className="bg-purple-white bg-gray-200 shadow rounded border-0 p-3 w-75 mt-2"
                  placeholder="검색어를 입력하고 검색을 누르세요"
                />
                <button
                  className="bg-gray-500 rounded border-0 w-25 p-3"
                  onClick={onReset}
                >
                  검색
                </button>
              </div>
            </form>{" "}
          </div>
          {searchtype === "fromtoday" ? (
            <div
              className="w-full mt-3 rounded-md"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                textAlign: "center",
                borderRadius: "100px",
              }}
            >
              <div
                className="card-body w-50"
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  console.log("fromtoday");
                  setSearchtype("fromtoday");
                }}
              >
                from today
              </div>
              <div
                className="card-body w-50"
                style={{ backgroundColor: "gray" }}
                onClick={() => {
                  console.log("newupdates");
                  setSearchtype("newupdates");
                }}
              >
                new updates
              </div>
            </div>
          ) : (
            <div
              className="w-full mt-3 rounded-md"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                textAlign: "center",
              }}
            >
              <div
                className="card-body w-50"
                style={{ backgroundColor: "gray" }}
                onClick={() => {
                  console.log("fromtoday");
                  setSearchtype("fromtoday");
                  // loadUsers(searchtype);
                }}
              >
                from today
              </div>
              <div
                className="card-body w-50"
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  console.log("newupdates");
                  setSearchtype("newupdates");

                  // loadUsers(searchtype);
                }}
              >
                new updates
              </div>
            </div>
          )}
          {isLoading ? (
            <ReactLoading
              type="cubes"
              color="gray"
              style={{
                textAlign: "center",
                width: "150px",
                margin: "auto",
                height: "500px",
              }}
            />
          ) : (
            <div></div>
          )}
          {events.map((event) => (
            <Link
              href={`/event/[id]`}
              as={`/event/${event.eventCode}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <div
                className="w-full mt-3 rounded-md shadow-lg "
                onClick={() => {
                  console.log(event.eventCode);
                }}
              >
                <div
                  className="card rounded-md"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="card-body rounded-md">
                    <p className="card-subtext" style={{ fontSize: "12px" }}>
                      {event.datetimeKorea}
                    </p>
                    <h5 className="card-title" style={{ fontSize: "15px" }}>
                      {event.title}
                    </h5>
                    {event.images.map((kk, index) => (
                      <div className="avatarbox">
                        <div className="innerbox">
                          <img
                            src={kk}
                            alt="Avatar"
                            width="40px"
                            style={{ borderRadius: "50%", marginLeft: "5px" }}
                          ></img>
                          <div
                            style={{
                              fontSize: "10px",
                              width: "50px",
                              height: "30px",
                            }}
                          >
                            {event.moderators[index]}
                          </div>
                        </div>
                      </div>
                    ))}
                    <p
                      className="card-subtext mt-3"
                      style={{ fontSize: "12px" }}
                    >
                      {event.description}
                      {name} 환경입니다.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
