import {
  useRef,
  useEffect,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  useCallback,
} from "react";
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
  const bodySize = document.body.scrollHeight;
  const userAgent = navigator.userAgent.toLowerCase();

  const divRef = useRef<HTMLDivElement>(null);
  const topPosition =
    typeof initPosition === "number"
      ? initPosition
      : ~~((Number(initPosition.slice(0, -1)) * bodySize) / 100);

  const elementDrag = useCallback((e: TouchEvent) => {
    if (divRef.current === null) return;
    const { clientY } = e.touches[0];
    clientY < topPosition
      ? divRef.current.style.setProperty(
          "top",
          `${(topPosition + clientY) / 2}px`
        )
      : divRef.current.style.setProperty("top", `${clientY}px`);
  }, []);

  const elementMouseDrag = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (divRef.current === null) return;
    e.clientY < topPosition
      ? divRef.current.style.setProperty(
          "top",
          `${(topPosition + e.clientY) / 2}px`
        )
      : divRef.current.style.setProperty("top", `${e.clientY}px`);
  }, []);

  const closeDragElement = useCallback(() => {
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
      divRef.current.style.top.replace("px", "")
    );
    /** 바텀 시트가 닫히는 기준 위치 */
    const standardClosePosition =
      bodySize * dividePercentage + topPosition * (1 - dividePercentage);

    currentTopPosition < standardClosePosition
      ? divRef.current.style.setProperty("top", `${topPosition}px`)
      : onClose();

    if (isMobileBrowser(userAgent)) {
      document.removeEventListener("touchend", closeDragElement);
      document.removeEventListener("touchmove", elementDrag);
    } else {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementMouseDrag);
    }
  }, []);

  const dragTouchDown = () => {
    document.addEventListener("touchend", closeDragElement);
    document.addEventListener("touchmove", elementDrag);
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
      divRef.current.style.setProperty("top", `${topPosition}px`);
    } else {
      document.body.style.setProperty("overflow", "auto");
      divRef.current.style.setProperty("top", `100%`);
    }
  }, [isOpen]);

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
          onTouchStart={dragTouchDown}
        >
          <span />
        </div>
        <div style={{ overflowY: "auto", height: "100%" }}>{children}</div>
      </div>
    </div>
  );
};
