import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { getCalendar } from "./getCalendar";

const [initYear, initMonth] = Intl.DateTimeFormat("ko-KR").format().split(".");

export const useCalendar = (year?: string, month?: string) => {
  const [y, setY] = useState(year || initYear);
  const [m, setM] = useState(month || initMonth);

  const currYear = useDeferredValue(y);
  const currMonth = useDeferredValue(m);

  const calendar = useMemo(
    () => getCalendar(currYear, currMonth),
    [currYear, currMonth]
  );

  const yearChange = (year: string, type?: "PATCH") =>
    type === "PATCH"
      ? setY(year)
      : setY((prev) => String(Number(prev) + Number(year)));

  const monthChange = (month: string, type?: "PATCH") =>
    setM((prev) => {
      const tempMonth =
        type === "PATCH" ? month : String(Number(prev) + Number(month));
      if (tempMonth === "13") {
        yearChange("1");
        return "01";
      } else if (tempMonth === "0") {
        yearChange("-1");
        return "12";
      } else return tempMonth;
    });

  return { calendar, currYear, currMonth, yearChange, monthChange };
};
