import { useCallback, useDeferredValue, useMemo, useState } from 'react';

const [initYear, initMonth] = Intl.DateTimeFormat('ko-KR').format().split('.');

export const useCalendar = (year?: string, month?: string) => {
  const [y, setY] = useState(year || initYear);
  const [m, setM] = useState(month || initMonth);

  const currYear = useDeferredValue(y);
  const currMonth = useDeferredValue(m);

  const calendar = useMemo(() => {
    const year = currYear;
    const month = currMonth;
    const prevLastdate = new Date(Number(year), Number(month) - 1, 0);
    const thisLastdate = new Date(Number(year), Number(month), 0);
    const pday = prevLastdate.getDay();
    const pdate = prevLastdate.getDate();
    const cday = thisLastdate.getDay();
    const cdate = thisLastdate.getDate();

    const lastArr = Array.from({ length: (pday + 1) % 7 }, (_, idx) => ({
      month: Number(month) - 1,
      date: pdate - pday + idx,
      day: idx,
    }));
    const currArr = Array.from({ length: cdate }, (_, idx) => ({
      month: Number(month),
      date: idx + 1,
      day: (pday + idx + 1) % 7,
    }));

    const prevDays = lastArr.length + currArr.length;

    const nextArr = Array.from(
      { length: prevDays === 28 ? 14 : prevDays > 35 ? 6 - cday : 13 - cday },
      (_, idx) => ({
        month: Number(month) + 1,
        date: idx + 1,
        day: (cday + idx + 1) % 7,
      })
    );

    return [...lastArr, ...currArr, ...nextArr];
  }, [currYear, currMonth]);

  const yearChange = useCallback(
    (year: string, type?: 'PATCH') =>
      type === 'PATCH'
        ? setY(year)
        : setY((prev) => String(Number(prev) + Number(year))),
    []
  );
  const monthChange = useCallback((month: string, type?: 'PATCH') => {
    setM((prev) => {
      const tempMonth =
        type === 'PATCH' ? month : String(Number(prev) + Number(month));
      if (tempMonth === '13') {
        yearChange('1');
        return '01';
      } else if (tempMonth === '0') {
        yearChange('-1');
        return '12';
      } else return tempMonth;
    });
  }, []);
  return { calendar, currYear, currMonth, yearChange, monthChange };
};
