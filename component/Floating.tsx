import Image, { ImageProps } from 'next/image';
import styles from './css/float.module.css';

type FloatImgProps = Omit<ImageProps, 'src' | 'alt'>;

export const Floating = ({ width, height, ...props }: FloatImgProps) => (
  <Image
    className={styles.float}
    src={`https://raw.githubusercontent.com/judygab/web-dev-projects/3099dfd4ab2683c422e0f4e662d84b8a147db245/personal-portfolio/src/assets/img/header-img.svg`}
    alt='두둥실'
    width={400}
    height={400}
    {...props}
  />
);
