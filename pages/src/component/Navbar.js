import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top">
      <div className="container">
        <a
          className="navbar-brand"
          href="/"
          style={{ float: "left", fontWeight: "bolder" }}
        >
          goClubHouse
        </a>
        <Link className="navbar-brand" href="/add">
          <div
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            이벤트 추가
          </div>
        </Link>
      </div>
    </nav>
  );
}
