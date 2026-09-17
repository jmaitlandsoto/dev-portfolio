import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { StaggerGroup } from "./motion/StaggerGroup";
import { StaggerItem } from "./motion/StaggerItem";

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  return (
    <StaggerGroup as="footer" className="flex flex-row gap-4 align-end">
      <StaggerItem
        as="a"
        href="https://www.linkedin.com/in/josh-maitland/"
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={faLinkedin} size="2xl" />
      </StaggerItem>
      <StaggerItem
        as="a"
        href="https://github.com/jmaitlandsoto"
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={faGithub} size="2xl" />
      </StaggerItem>
    </StaggerGroup>
  );
}

export default Footer;
