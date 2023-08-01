import * as React from "react";

export interface INavButtonProps {
  href: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export function NavButton(props: INavButtonProps) {
  const { href, onClick, children } = props;

  const [currentHash, setCurrentHash] = React.useState(window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup after unmount
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isHash = (hash: string) => currentHash === hash;

  return (
    <div className={"d-flex flex-row align-items-center nav-button"}>
      <span className={"nav-indicator"}></span>
      <a href={href} onClick={onClick}>
        {children}
      </a>
    </div>
  );
}
