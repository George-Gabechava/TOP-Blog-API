import "./Footer.css";

// Assets
import linkedin from "../assets/linkedin.svg";
import github from "../assets/github.png";

function Footer() {
  return (
    <aside>
      <p>
        Website made by{" "}
        <a
          className="fancyText"
          href="https://www.linkedin.com/in/George-Gabechava/"
        >
          George Gabechava
          <img
            id="linkedinIcon"
            src={linkedin}
            className="logo"
            alt="LinkedIn Icon"
          />
        </a>
      </p>
      <p>
        <a
          className="fancyText"
          href="https://github.com/George-Gabechava/TOP-Blog-API"
        >
          Github Source Code{" "}
          <img
            id="githubIcon"
            src={github}
            className="logo"
            alt="Github Icon"
          />
        </a>
      </p>
    </aside>
  );
}
export default Footer;
