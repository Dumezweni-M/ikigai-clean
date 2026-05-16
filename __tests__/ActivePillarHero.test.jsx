import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { useQuery } from '@apollo/client';
import ActivePillarHero from '../src/components/ActivePillarHero';
import { getPillarFrequencies, getActivePillarsCount } from '../src/utils/pillarUtils';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../src/utils/pillarUtils', () => ({
  getPillarFrequencies: jest.fn(),
  getActivePillarsCount: jest.fn(),
}));

jest.mock('../src/styles/typography', () => ({
  label: {},
  h1: {},
  body: {},
}));

jest.mock('../src/graphql/queries', () => ({
  GET_TASKS: 'GET_TASKS',
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const renderWithQuery = ({ data = undefined, loading = false } = {}) => {
  useQuery.mockReturnValue({ data, loading });
  return render(<ActivePillarHero />);
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ActivePillarHero', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    getPillarFrequencies.mockReturnValue({});
    getActivePillarsCount.mockReturnValue(0);
  });

  // Static content always present
  describe('static content', () => {

    test('renders the "State of Mind" label', () => {
      renderWithQuery();
      expect(screen.getByText('State of Mind')).toBeTruthy();
    });

    test('renders "of 4 pillars active" suffix', () => {
      renderWithQuery();
      expect(screen.getByText(/of 4 pillars active/)).toBeTruthy();
    });

    test('renders the quote body text', () => {
      renderWithQuery();
      expect(
        screen.getByText(/Flow is not a reward for hard work/)
      ).toBeTruthy();
    });

    test('renders the design problem label', () => {
      renderWithQuery();
      expect(
        screen.getByText(/It\u2019s a design problem, not a character flaw/)
      ).toBeTruthy();
    });

  });

  // Loading state
  describe('loading state', () => {

    test('shows "--" while loading', () => {
      renderWithQuery({ loading: true });
      expect(screen.getByText(/--\s*of 4 pillars active/)).toBeTruthy();
    });

    test('does not show a number while loading', () => {
      getActivePillarsCount.mockReturnValue(3);
      renderWithQuery({ loading: true });
      expect(screen.queryByText(/3 of 4 pillars active/)).toBeNull();
    });

  });

  // Loaded state — pillar count display
  describe('loaded state', () => {

    test('displays activePillarsCount when not loading', () => {
      getActivePillarsCount.mockReturnValue(3);
      renderWithQuery({
        data: { taskItems: [{ pillar: 'Love' }, { pillar: 'Skill' }, { pillar: 'World' }] },
        loading: false,
      });
      expect(screen.getByText(/3 of 4 pillars active/)).toBeTruthy();
    });

    test('displays 0 when no tasks', () => {
      getActivePillarsCount.mockReturnValue(0);
      renderWithQuery({ data: { taskItems: [] }, loading: false });
      expect(screen.getByText(/0 of 4 pillars active/)).toBeTruthy();
    });

    test('displays 4 when all pillars are active', () => {
      getActivePillarsCount.mockReturnValue(4);
      renderWithQuery({
        data: {
          taskItems: [
            { pillar: 'Love' },
            { pillar: 'Skill' },
            { pillar: 'World' },
            { pillar: 'Wealth' },
          ],
        },
        loading: false,
      });
      expect(screen.getByText(/4 of 4 pillars active/)).toBeTruthy();
    });

  });

  // Data wiring — confirms utils are called with the right tasks
  describe('data wiring', () => {

    test('calls getPillarFrequencies with tasks from query', () => {
      const tasks = [{ pillar: 'Love' }, { pillar: 'Skill' }];
      renderWithQuery({ data: { taskItems: tasks } });
      expect(getPillarFrequencies).toHaveBeenCalledWith(tasks);
    });

    test('calls getActivePillarsCount with tasks from query', () => {
      const tasks = [{ pillar: 'Love' }];
      renderWithQuery({ data: { taskItems: tasks } });
      expect(getActivePillarsCount).toHaveBeenCalledWith(tasks);
    });

    test('passes empty array to utils when data is undefined', () => {
      renderWithQuery({ data: undefined });
      expect(getPillarFrequencies).toHaveBeenCalledWith([]);
      expect(getActivePillarsCount).toHaveBeenCalledWith([]);
    });

    test('passes empty array to utils when taskItems is missing', () => {
      renderWithQuery({ data: {} });
      expect(getPillarFrequencies).toHaveBeenCalledWith([]);
      expect(getActivePillarsCount).toHaveBeenCalledWith([]);
    });

  });

});