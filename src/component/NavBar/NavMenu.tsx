import Link from "next-intl/link";
import { usePathname } from "next-intl/client";
import { navLinkList } from "@/lib/route";
import styles from "./navbar.module.css";
import clsx from "clsx";

interface NavMenuProps {
  onClose: () => void;
  locale?: string;
}

export const NavMenu = ({ onClose, locale }: NavMenuProps) => {
  const path = usePathname();
  return (
    <ul className={clsx(styles["nav-link"], "align-ic")}>
      {navLinkList.map(([key, route, label]) => (
        <Link href={route} key={key} onClick={onClose}>
          <li className={path === route ? styles.active : ""}>{label}</li>
        </Link>
      ))}
    </ul>
  );
};
