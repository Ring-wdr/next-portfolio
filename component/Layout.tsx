import NavBar from './NavBar';
import styles from './css/layout.module.css';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.body}>
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
