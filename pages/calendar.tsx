import { useDeferredValue, useEffect, useMemo, useState } from 'react';

export default function Calendar() {
  const [curYear, setCurYear] = useState('');
  const [curMonth, setCurMonth] = useState('');

  const deferredYear = useDeferredValue(curYear);
  const deferredMonth = useDeferredValue(curMonth);

  const [last, curr, next] = useMemo(() => {
    const year = deferredYear;
    const month = deferredMonth;
    const prevLastdate = new Date(Number(year), Number(month) - 1, 0);
    const thisLastdate = new Date(Number(year), Number(month), 0);
    const pday = prevLastdate.getDay();
    const pdate = prevLastdate.getDate();
    const cday = thisLastdate.getDay();
    const cdate = thisLastdate.getDate();

    const lastMonth = Array.from({ length: (pday + 1) % 7 }, (_, idx) => ({
      date: pdate - pday + idx,
      day: idx,
    }));
    const currMonth = Array.from({ length: cdate }, (_, idx) => ({
      date: idx + 1,
      day: (pday + idx + 1) % 7,
    }));

    const prevDays = lastMonth.length + currMonth.length;

    const nextMonth = Array.from(
      { length: prevDays === 28 ? 14 : prevDays > 35 ? 6 - cday : 13 - cday },
      (_, idx) => ({
        date: idx + 1,
        day: (cday + idx + 1) % 7,
      })
    );

    return [lastMonth, currMonth, nextMonth];
  }, [deferredYear, deferredMonth]);

  useEffect(() => {
    const [{ value: year }, , { value: month }] =
      Intl.DateTimeFormat('ko-KR').formatToParts();
    setCurYear(year);
    setCurMonth(month);
  }, []);
  return (
    <div className='calander'>
      <div>
        <span style={{ color: 'white' }}>
          오늘 날짜는 {curYear}년 {curMonth}월 입니다.
        </span>
      </div>
      <div className='current'>
        <button
          onClick={() =>
            setCurMonth((prev) => {
              const temp = Number(prev) - 1;
              if (temp === 0) {
                setCurYear((prevYear) => String(Number(prevYear) - 1));
                return '12';
              } else {
                return String(Number(prev) - 1);
              }
            })
          }
        >
          &lt;
        </button>
        <label style={{ color: 'slategrey' }}>
          년도 바꾸기
          <input value={curYear} onChange={(e) => setCurYear(e.target.value)} />
        </label>
        <label style={{ color: 'slategrey' }}>
          월 바꾸기
          <input
            value={curMonth}
            onChange={(e) => setCurMonth(e.target.value)}
          />
        </label>
        <button
          onClick={() =>
            setCurMonth((prev) => {
              const temp = Number(prev) + 1;
              if (temp === 13) {
                setCurYear((prevYear) => String(Number(prevYear) + 1));
                return '1';
              } else {
                return String(Number(prev) + 1);
              }
            })
          }
        >
          &gt;
        </button>
      </div>
      <div
        className='inner-body'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridGap: '1rem',
          color: 'wheat',
          margin: '2rem',
          textAlign: 'center',
        }}
      >
        {last.map(({ date, day }) => (
          <div
            key={`${date}-${day}`}
            style={{ color: day === 0 ? '#850000' : 'gray' }}
          >
            {date}
          </div>
        ))}
        {curr.map(({ date, day }) => (
          <div
            key={`${date}-${day}`}
            style={{ color: day === 0 ? 'red' : 'white' }}
          >
            {date}
          </div>
        ))}
        {next.map(({ date, day }) => (
          <div
            key={`${date}-${day}`}
            style={{ color: day === 0 ? '#850000' : 'gray' }}
          >
            {date}
          </div>
        ))}
      </div>
      <style>{`
        .calander {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .calander .current {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: rgba(255, 0, 0, 0.1);
            border-radius: 10px;
            padding: 10px;
            margin: 2rem;
        }

        .calander .current button {
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
        }

        .calander .current label {
            display: flex;
            justify-content: space-between;
            width: 12rem;
        }
        
        .calander .current label input {
            width: 50px;
        }

        .calander .inner-body {
            
        }
      `}</style>
    </div>
  );
}
