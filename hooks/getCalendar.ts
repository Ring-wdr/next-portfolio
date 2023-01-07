const [initYear, initMonth] = Intl.DateTimeFormat('ko-KR').format().split('.');

export const getCalendar = (
  year: string = initYear,
  month: string = initMonth
) => {
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
};
