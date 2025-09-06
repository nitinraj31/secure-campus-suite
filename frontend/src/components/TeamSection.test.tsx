import { render, screen } from '@testing-library/react';
import TeamSection from './TeamSection';

describe('TeamSection', () => {
  test('renders team member names and photos', () => {
    render(<TeamSection />);
    const memberNames = ['Ansari', 'Aslam Ansari', 'Babli', 'Port'];
    memberNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(memberNames.length);
  });
});
