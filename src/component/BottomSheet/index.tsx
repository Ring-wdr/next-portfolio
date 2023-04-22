import {
  useRef,
  useEffect,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useState,
} from "react";
import { useScreenSize } from "@/hooks/useScreenSize";
import styles from "./sheet.module.css";

const mobileKeywords = [
  "android",
  "webos",
  "iphone",
  "ipad",
  "ipod",
  "blackberry",
  "windows phone",
];
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
  const userAgent = navigator.userAgent.toLowerCase();

  const divRef = useRef<HTMLDivElement>(null);
  const topPosition = getPosition(initPosition, bodyHeight);

  const elementDrag = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (divRef.current === null) return;
    const { clientY } = e.touches[0];
    clientY < topPosition
      ? divRef.current.style.setProperty(
          "translate",
          `-50% ${(topPosition + clientY) / 2}px`
        )
      : divRef.current.style.setProperty("translate", `-50% ${clientY}px`);
  };

  const elementMouseDrag = (e: MouseEvent) => {
    e.preventDefault();
    if (divRef.current === null) return;
    e.clientY < topPosition
      ? divRef.current.style.setProperty(
          "translate",
          `-50% ${(topPosition + e.clientY) / 2}px`
        )
      : divRef.current.style.setProperty("translate", `-50% ${e.clientY}px`);
  };

  const closeDragElement = () => {
    if (divRef.current === null) return;
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
      : onClose();

    if (!isMobileBrowser(userAgent)) {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementMouseDrag);
    }
  };

  const dragMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("mousemove", elementMouseDrag);
  };

  useEffect(() => {
    if (divRef.current === null) return;
    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
      divRef.current.style.setProperty("translate", `-50% ${topPosition}px`);
    } else {
      document.body.style.setProperty("overflow", "auto");
      divRef.current.style.setProperty("translate", "");
    }
  }, [isOpen, topPosition]);

  return (
    <div className={isOpen ? styles.backdrop : ""}>
      <div
        ref={divRef}
        className={[styles.bottomSheet, className].join(" ")}
        {...props}
      >
        <div
          className={styles.handle}
          onMouseDown={dragMouseDown}
          onTouchMove={elementDrag}
          onTouchEnd={closeDragElement}
        >
          {/* bottomSheet height: {bodyHeight} */}
          <span />
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
