import * as React from "react";

export interface INavButtonProps {
  href: string;
  onClick: () => void;
  children?: React.ReactNode;
  currentHash: string;
}

export function NavButton(props: INavButtonProps) {
  const { href, onClick, children, currentHash } = props;



  const isHash = React.useCallback(
    (hash: string) => currentHash === hash,
    [currentHash]
  );

  React.useEffect(() => {
    console.log(isHash(href))
    // if (isHash(href)) {
    //   onClick();
    // }
  }, [isHash, href, currentHash]);

  return (
    <a
      href={href}
      onClick={onClick}
      className={"d-flex flex-row align-items-center nav-button " + (isHash(href) ? "selected" : "")}
    >
      <span className={"nav-indicator"}></span>
      <>{children}</>
    </a>
  );
}
