import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" id="social">
        <span data-cursor="fit">
          <a href="https://github.com/anirudh1215" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span data-cursor="fit">
          <a href="https://linkedin.com/in/anirudh1215" target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span data-cursor="fit">
          <a href="https://x.com/anirudh_saxena_" target="_blank">
            <FaXTwitter />
          </a>
        </span>
        <span data-cursor="fit">
          <a href="https://www.instagram.com/anirudh_saxena_" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="/Anirudh_Saxena_Resume.pdf" target="_blank" rel="noopener noreferrer">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
