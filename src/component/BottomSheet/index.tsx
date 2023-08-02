import {
  useRef,
  useEffect,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useState,
} from "react";
import { useScreenSize } from "@/hooks/useScreenSize";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./sheet.module.css";

const mobileKeywords = [
  "android",
  "webos",
  "iphone",
  "ipad",
  "ipod",
  "blackberry",
  "windows phone",
] as const;
const isMobileBrowser = (input: string) =>
  mobileKeywords.some((keyword) => input.indexOf(keyword) > -1);
/**
 * 설정할 위치값을 반환하는 함수
 * @param pos 현재 위치
 * @param height 브라우저의 세로 크기
 * @returns
 */
const getPosition = (pos: number | `${number}%`, height: number) =>
  typeof pos === "number" ? pos : ~~((Number(pos.slice(0, -1)) * height) / 100);

export interface BottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  /** 바텀 시트 활성화 여부 */
  isOpen: boolean;
  /** 바텀 시트 활성화 변경 메서드 */
  onClose: () => void;
  /** 퍼센트(%, '20%') 입력시 비율, 숫자 입력시 고정 픽셀(px)
   * ```
   * 0%: 초기 위치보다 아래인 경우 닫기
   * 50%: 화면 중간 아래인 경우 닫기
   * 100%: 화면 아래인 경우 닫기
   * ```
   */
  initPosition?: number | `${number}%`;
  /** 바텀 시트가 몇 프로 이하로 내려갔을 때 닫게 하는지 결정 */
  closePosition?: `${number}%`;
}

export const BottomSheet = ({
  isOpen,
  onClose,
  initPosition = "20%",
  closePosition = "50%",
  children,
  className,
  ...props
}: BottomSheetProps) => {
  /** 페이지의 크기 */
  const bodyHeight = useScreenSize();
  // const userAgent = navigator.userAgent.toLowerCase();

  const [isDragging, setDragging] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const topPosition = getPosition(initPosition, bodyHeight);

  const elementDrag = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (divRef.current === null) return;
    const { clientY } = e.touches[0];
    divRef.current.style.setProperty(
      "translate",
      `-50% ${clientY < topPosition ? (topPosition + clientY) / 2 : clientY}px`
    );
  };

  const elementMouseDrag = (e: ReactMouseEvent) => {
    e.preventDefault();
    if (divRef.current === null || !isDragging) return;

    divRef.current.style.setProperty(
      "translate",
      `-50% ${
        e.clientY < topPosition ? (topPosition + e.clientY) / 2 : e.clientY
      }px`
    );
  };

  const closeDragElement = () => {
    if (divRef.current === null) return;
    setDragging(false);
    /**
     * ```
     * 0%: topPosition
     * 50%: bodySize / 2 + topPostiion / 2
     * 100%: bodySize
     * ```
     */
    const dividePercentage = Number(closePosition.slice(0, -1)) / 100;
    /** 현재 위치 */
    const currentTopPosition = Number(
      divRef.current.style.translate.split(" ")[1].slice(0, -2)
    );
    /** 바텀 시트가 닫히는 기준 위치 */
    const standardClosePosition =
      bodyHeight * dividePercentage + topPosition * (1 - dividePercentage);

    currentTopPosition < standardClosePosition
      ? divRef.current.style.setProperty("translate", `-50% ${topPosition}px`)
      : (() => {
          document.body.style.removeProperty("overflow");
          let _position = currentTopPosition;
          const timer = setInterval(() => {
            _position += 30;
            divRef.current?.style.setProperty(
              "translate",
              `-50% ${_position}px`
            );
            _position > document.body.clientHeight && clearInterval(timer);
          }, 30);
          setTimeout(onClose, 300);
        })();
  };

  useEffect(() => {
    if (divRef.current === null) return;
    if (isOpen) {
      setTimeout(() => {
        document.body.style.setProperty("overflow", "hidden");
        divRef.current?.style.setProperty("translate", `-50% ${topPosition}px`);
      }, 100);
    } else {
      document.body.style.removeProperty("overflow");
      setDragging(false);
      setTimeout(() => {
        divRef.current?.style.removeProperty("translate");
      }, 100);
    }
  }, [isOpen, topPosition]);

  return isOpen
    ? createPortal(
        <div
          className={styles.backdrop}
          onMouseUp={closeDragElement}
          onMouseMove={elementMouseDrag}
          onClick={closeDragElement}
          onMouseLeave={closeDragElement}
        >
          <div
            ref={divRef}
            className={clsx(styles.bottomSheet, className)}
            {...props}
          >
            <div
              className={styles.handle}
              onMouseDown={() => setDragging(true)}
              onTouchStart={() => setDragging(true)}
              onMouseUp={() => setDragging(false)}
              onTouchMove={elementDrag}
              onTouchEnd={closeDragElement}
            >
              {/* bottomSheet height: {bodyHeight} */}
              <span />
            </div>
            <div className={styles.children}>{children}</div>
          </div>
        </div>,
        document.getElementById("bottom-sheet") as HTMLElement
      )
    : null;
};
