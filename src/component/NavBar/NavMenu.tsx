import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinkList } from "@/lib/route";
import styles from "./navbar.module.css";

export const NavMenu = ({ onClose }: { onClose: () => void }) => {
  const path = usePathname();
  return (
    <ul className={[styles["nav-link"], "align-ic"].join(" ")}>
      {navLinkList.map(([key, route, label]) => (
        <Link href={route} key={key} onClick={onClose}>
          <li className={path === route ? styles.active : ""}>{label}</li>
        </Link>
      ))}
    </ul>
  );
};
