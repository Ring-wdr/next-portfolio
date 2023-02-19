import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getCalendar } from '../hooks/getCalendar';
import Calendar from './calendar';

describe('달력 테스트', () => {
  it('오늘 날짜 기준 달력이 불러와지는지', () => {
    render(<Calendar />);
    const comparison = getCalendar();
    /** 달력 존재 여부 */
    const calendarComponent = screen.getByTestId('calendarcomp');
    expect(calendarComponent).toBeInTheDocument();
    /** 날짜 입력칸 여부 */
    const dateinput = screen.getByTestId('dateInput');
    expect(dateinput).toBeInTheDocument();

    /** 날짜 컴포넌트에 7 x 6개의 원소가 있는지 */
    const dateChildren = screen.getAllByRole('listitem');
    expect(dateChildren.length).toBe(42);
    /** 날짜 컴포넌트에 이번 달 날짜가 들어있는지 */
    dateChildren.forEach(({ textContent }, idx: number) =>
      expect(textContent).toBe(String(comparison[idx].date))
    );
  });
});
