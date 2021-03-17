import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./src/component/Navbar";
import Link from "next/link";
import axios from "axios";

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
      // console.log(res.data.Items);
      // setEvents(res.data.Items);
      // console.log(events);
      var sortingField = "eventDate";
      console.log(res.data.Items);
      // console.log(
      // res.data.Items.sort(function (a, b) {
      //   return b.sortingField - a.sortingField;
      // });
      // console.log(res.data.Items[2].eventDate);

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
    console.log(e);
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

  const loadUserstwo = async () => {
    const result = await axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `https://ddjw33n2b0.execute-api.ap-northeast-2.amazonaws.com/production/queryEvents?searchtype=${searchtype}&keyword=${keyword}`,
      // url: `https://z5v2zc0s9i.execute-api.ap-northeast-2.amazonaws.com/production/getLifeInfo`,
    }).then((res) => {
      // console.log(res.data.Items);
      // setEvents(res.data.Items);
      // console.log(events);
      var sortingField = "eventDate";
      console.log(res.data.Items);
      // console.log(
      // res.data.Items.sort(function (a, b) {
      //   return b.sortingField - a.sortingField;
      // });
      // console.log(res.data.Items[2].eventDate);

      // console.log(res.data.Items[2].eventDate);

      // // );
      // console.log(res.data.Items);

      setEvents(res.data.Items);
      // console.log(events);
    });
  };

  <style jsx global>{`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: Lobster;
    }

    * {
      box-sizing: border-box;
    }
  `}</style>;

  // console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <div style={{ backgroundColor: "#f1efe4" }}>
      <Navbar />
      <div className="container mx-auto desktop mb-2 md:mb-10">
        <div className="w-full md:w-5/6 mx-auto bg-white p-4 rounded-md shadow-lg mt-5">
          <form onSubmit>
            <p className="text-left text-xl ff font-semibold mb-1">
              관심있는 이벤트 찾기
            </p>{" "}
            <div className="w-full">
              <input
                style={{ fontSize: "12px" }}
                className="bg-purple-white bg-gray-200 shadow rounded border-0 p-3 w-75 mt-2"
                placeholder="검색어를 입력하고 검색을 누르세요"
              />
              <button className="bg-gray-500 rounded border-0 w-25 p-3">
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
              <div className="card rounded-md">
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
                  <p className="card-subtext mt-3" style={{ fontSize: "12px" }}>
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
  );
}

// 여기는 브라우저 환경이 아님
// export async function getStaticProps() {
//   const apiUrl =
//     "https://ddjw33n2b0.execute-api.ap-northeast-2.amazonaws.com/production/queryEvents?searchtype=newupdates&keyword=";
//   const res = await Axios.get(apiUrl);
//   const data = res.data;
//   // const kk = [1, 2, 3, 4];

//   return {
//     props: {
//       events: data.Items,
//       name: process.env.name,
//     },
//   };
// }
