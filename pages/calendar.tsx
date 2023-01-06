import { ChangeEvent, useDeferredValue, useEffect, useState } from 'react';
import { useCalendar } from '../hooks/useCalendar';

export default function Calendar() {
  const { calendar, currYear, currMonth, yearChange, monthChange } =
    useCalendar();
  const [input, setInput] = useState(
    `${currYear}-${currMonth.length === 1 ? `0${currMonth}` : currMonth}`
  );
  const defInput = useDeferredValue(input);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  useEffect(() => {
    setInput((prev) => {
      prev.split('-').forEach((value, idx) => {
        if (idx === 1 && value.length > 2) return `${currYear}-${currMonth}`;
      });
      return `${currYear}-${
        currMonth.length === 1 ? `0${currMonth}` : currMonth
      }`;
    });
  }, [currYear, currMonth]);

  return (
    <div className='calendar'>
      <div className='current'>
        <button onClick={() => monthChange('-1')}>&lt;</button>
        <input
          type='text'
          value={defInput}
          onChange={(e) => {
            onChange(e);
            const tempInput = e.target.value.split('-');
            tempInput.forEach((value, idx) => {
              idx === 0 && yearChange(value, 'PATCH');
              idx === 1 &&
                value !== '0' &&
                value !== '' &&
                monthChange(value, 'PATCH');
            });
          }}
        />
        <button onClick={() => monthChange('1')}>&gt;</button>
      </div>
      <ul className='inner-body'>
        {calendar && calendar.length !== 0
          ? calendar.map(({ month, date, day }) => (
              <li key={`${month}-${date}-${day}`}>
                <button
                  disabled={month !== Number(currMonth)}
                  style={{
                    color:
                      month === Number(currMonth)
                        ? day === 0
                          ? 'red'
                          : 'white'
                        : day === 0
                        ? '#850000'
                        : 'gray',
                  }}
                  onClick={() =>
                    setInput(
                      `${currYear}-${
                        currMonth.length === 1 ? `0${currMonth}` : currMonth
                      }-${date < 10 ? `0${date}` : date}`
                    )
                  }
                >
                  {date}
                </button>
              </li>
            ))
          : null}
      </ul>
      <style jsx>{`
        .calendar {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .calendar .current {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 0, 0, 0.1);
          border-radius: 10px;
          padding: 10px;
          margin: 0 0 2rem;
        }
        .calendar .current input {
          text-align: center;
          width: 20rem;
          height: 5rem;
          font-size: 2rem;
          color: white;
          background: none;
          border: none;
        }

        .calendar .current input:focus {
          outline: none;
        }

        .calendar .current button {
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
        }

        .calendar .current label {
          display: flex;
          justify-content: space-between;
          width: 12rem;
        }

        .calendar .current label input {
          width: 50px;
        }

        .calendar .inner-body {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-gap: 1rem;
          color: wheat;
          margin: 2rem;
          text-align: center;
          list-style: none;
          margin: none;
          padding: none;
        }

        .calendar .inner-body button {
          background: none;
          border: none;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}
