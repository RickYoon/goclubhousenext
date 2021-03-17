import Link from "next/link";

export default function Navbarback() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top">
      <div className="container">
        <a
          className="navbar-brand"
          href="/"
          style={{ float: "left", fontWeight: "bold" }}
        >
          goClubHouse
        </a>
        <Link className="navbar-brand" href="/">
          <div
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            다른 이벤트보기
          </div>
        </Link>
      </div>
    </nav>
  );
}
