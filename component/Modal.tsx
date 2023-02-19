import { DetailedHTMLProps, DialogHTMLAttributes, forwardRef } from 'react';
import styles from './css/modal.module.css';

export const Modal = forwardRef<
  HTMLDialogElement,
  DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>
>(function Modal(props, ref) {
  return (
    <dialog className={styles.modal} ref={ref} {...props}>
      <div className={styles.modal_in}>
        <a
          href='https://github.com/Ring-wdr'
          target='_blank'
          rel='noopener noreferrer'
        >
          MOVE TO MY <i className='ri-github-fill'></i>
        </a>
        <form method='dialog'>
          <button>BACK</button>
        </form>
      </div>
    </dialog>
  );
});
