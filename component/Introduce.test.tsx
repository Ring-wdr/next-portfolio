import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Introduce } from './Introduce';

describe('자기소개 컴포넌트', () => {
  it('test for rendering', () => {
    render(<Introduce />);

    // const floatImg = screen.getAllByRole('paragraph');
    // expect(floatImg).not.toBeNull();
  });
});
