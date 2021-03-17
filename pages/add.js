import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import "moment/locale/ko";
import ReactLoading from "react-loading";
import Navbarback from "./src/component/Navbarback";

const Add = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showcard, setShowcard] = useState(false);
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
    timezone: "",
  });

  // const {
  //   title,
  //   weekday,
  //   moderators,
  //   moderatorsArray,
  //   images,
  //   description,
  //   datetime,
  //   club,
  // } = infos; // 비구조화 할당을 통해 값 추출

  const [text, setText] = useState("");
  function test(event) {
    // console.log(event);
    event.preventDefault();
    // console.log("form go");
  }

  const onChange = (e) => {
    setText(e.target.value);
    console.log(text);
  };

  const onReset = () => {
    // setText("");
    loadUsers();
    console.log("click button");
  };

  const postEvents = async () => {
    console.log("you clicked post!");

    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `https://ddjw33n2b0.execute-api.ap-northeast-2.amazonaws.com/production/insertEvents`,
      data: { eventdata: infos },
    }).then((res) => {
      console.log(res.data);

      if (res.data.dbinsertResult === "success") {
        alert("성공");
        window.location.href = "/event/mJWjWB8o";
      } else {
        alert("실패");
      }
    });
  };

  const loadUsers = async () => {
    // const url = "https://www.joinclubhouse.com/event/xkL60q1y";
    try {
      setIsLoading(true);

      await axios({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        url: `https://ddjw33n2b0.execute-api.ap-northeast-2.amazonaws.com/production/coopangCrawler?url=${text}`,
      }).then((res) => {
        // console.log(res.data);
        // console.log(res.data.title);
        console.log(res);
        if (res.data.title.length === 0) {
          alert("올바른 주소가 아닙니다.");
        } else {
          setIsLoading(false);

          setShowcard(true);
          console.log(res);
          let date = new Date(res.data.datetime);
          // moment().subtract(7, 'days');
          console.log(moment(date).subtract(9, "hours").day());
          console.log(
            moment(date).subtract(9, "hours").format("YYYY-MM-DD HH:mm:ss dddd")
          );
          // console.log(date.format("YYYY MM"));
          // console.log(new Date(res.data.datetime));
          // console.log(res.data.)
          console.log(infos);

          setInfos({
            ...infos,
            title: res.data.title,
            weekday: res.data.weekday,
            images: res.data.images,
            description: res.data.description,
            datetime: moment(date)
              .subtract(9, "hours")
              .format("YYYY-MM-DD dddd a hh시mm분"),
            datetimeDB: date,
            club: res.data.club,
            moderators: res.data.moderators,
            moderatorsArray: res.data.moderatorsArray,
            url: res.data.url,
          });
        }
      });
    } catch {
      alert("url을 정확하게 입력해주세요!");
    }
  };

  return (
    <>
      <Navbarback />
      <div style={{ backgroundColor: "#f1efe4" }}>
        <div className="container mt-3" style={{ backgroundColor: "#f1efe4" }}>
          <br></br>
          <br></br>
          <div className="max-w-lg mx-auto">
            <h1
              className="my-4 block text-4xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
              style={{ fontSize: "22px" }}
            >
              함께하고 싶은 이벤트를 <br />
              게시하고 더 많은 사람들과 함께해요
            </h1>
            <div className="w-full border p-3 bg-white rounded-md">
              <form onSubmit={test}>
                <p className="text-center" style={{ fontSize: "15px" }}>
                  초대링크를 붙여넣고, 초대장 만들기
                </p>
                <input
                  className="bg-purple-white bg-gray-200 shadow rounded border-0 p-3 w-100 mt-0"
                  onChange={onChange}
                  value={text}
                  style={{ fontSize: "12px" }}
                />
                <button
                  className="bg-gray-500 rounded border-0 w-100 p-3 mt-3"
                  onClick={onReset}
                >
                  추가
                </button>
              </form>
            </div>
            {isLoading ? (
              <ReactLoading
                type="cubes"
                color="black"
                style={{ textAlign: "center", width: "150px", margin: "auto" }}
              />
            ) : (
              <div></div>
            )}

            {showcard === true ? (
              <div className="container mt-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-subtext" style={{ fontSize: "12px" }}>
                      {infos.datetime}
                    </p>
                    <h5 className="card-title" style={{ fontSize: "15px" }}>
                      {infos.title}
                    </h5>
                    {infos.images.map((kk, index) => (
                      <div className="avatarbox">
                        <div className="innerbox">
                          <img
                            src={kk}
                            alt="Avatar"
                            width="40px"
                            style={{ borderRadius: "50%", marginLeft: "5px" }}
                          ></img>
                          <div style={{ fontSize: "10px" }}>
                            {infos.moderatorsArray[index]}
                          </div>
                        </div>
                      </div>
                    ))}
                    <p
                      className="card-subtext mt-3"
                      style={{ fontSize: "12px" }}
                    >
                      {infos.description}
                    </p>

                    <button
                      type="button"
                      class="btn btn-primary btn-lg btn-block mt-2"
                      style={{ width: "100%", marginBottom: "10px" }}
                      onClick={postEvents}
                    >
                      게시하기!
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
