import "./header.css";
import { GrLinkNext } from "react-icons/gr";

export default function Header() {
  return (
    <nav className="container">
      <button className="button" data-text="Awesome">
        <span className="actual-text">&nbsp;iMovies&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;iMovies&nbsp;
        </span>
      </button>
    </nav>
  );
}
