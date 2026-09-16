import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  return (
    <footer className="flex flex-row gap-4 align-end">
      <a
        href="https://www.linkedin.com/in/josh-maitland/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedin} size="2xl" />
      </a>
      <a
        href="https://github.com/jmaitlandsoto"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} size="2xl" />
      </a>
    </footer>
  );
}

export default Footer;
