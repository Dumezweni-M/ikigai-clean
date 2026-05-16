
import React from 'react';
import { render } from '@testing-library/react-native';
import AchievedGoalsVault from '../src/components/AchievedGoalsVault';

// --- Mock Apollo ---
const mockUseQuery = jest.fn();
jest.mock('@apollo/client', () => ({
  useQuery: (...args) => mockUseQuery(...args),
}));

jest.mock('../src/graphql/queries', () => ({
  GET_ACHIEVED_GOALS: 'GET_ACHIEVED_GOALS',
}));

// --- Mock child components ---
jest.mock('../src/components/Stack', () => {
  const { View } = require('react-native');
  return ({ children, ...props }) => <View {...props}>{children}</View>;
});

jest.mock('../src/components/ScrollVertical', () => {
  const { ScrollView } = require('react-native');
  return ({ children, ...props }) => <ScrollView {...props}>{children}</ScrollView>;
});

// --- Mock styles (avoid missing asset errors) ---
jest.mock('../src/styles/typography', () => ({
  label: { fontSize: 12 },
  light: { fontSize: 14 },
}));
jest.mock('../src/styles/layout', () => ({
  cardXxxs: { padding: 8 },
}));
jest.mock('../src/styles/spacing', () => ({ spacing: {} }));
jest.mock('../src/styles/colors', () => ({ neutral: '#f0f0f0' }));

// --- Fixture data ---
const mockGoals = [
  {
    id: '1',
    title: 'Daily Meditation',
    pillar: 'LOVE',
    avgIntensity: 7.333,
    finalCount: 30,
    achievedAt: '2025-01-15T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Learn TypeScript',
    pillar: 'SKILL',
    avgIntensity: 8.0,
    finalCount: 21,
    achievedAt: '2025-03-01T00:00:00.000Z',
  },
];

describe('AchievedGoalsVault', () => {

  beforeEach(() => {
    mockUseQuery.mockClear();
  });

  // --- Loading state ---

  test('renders loading indicator while query is in flight', () => {
    mockUseQuery.mockReturnValue({ loading: true, error: null, data: null });
    const { getByText } = render(<AchievedGoalsVault />);
    expect(getByText('LOADING...')).toBeTruthy();
  });

  // --- Error state ---

  test('renders error message when query fails', () => {
    mockUseQuery.mockReturnValue({ loading: false, error: new Error('Network error'), data: null });
    const { getByText } = render(<AchievedGoalsVault />);
    expect(getByText('ERROR')).toBeTruthy();
  });

  // --- Empty state ---

  test('renders zero total when achievedGoals is empty', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { achievedGoals: [] },
    });
    const { getByText } = render(<AchievedGoalsVault />);
    expect(getByText('Total: 0')).toBeTruthy();
  });

  // --- Data rendering ---

  test('renders correct total count', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { achievedGoals: mockGoals },
    });
    const { getByText } = render(<AchievedGoalsVault />);
    expect(getByText('Total: 2')).toBeTruthy();
  });

  test('renders each goal title', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { achievedGoals: mockGoals },
    });
    const { getByText } = render(<AchievedGoalsVault />);
    expect(getByText('Daily Meditation')).toBeTruthy();
    expect(getByText('Learn TypeScript')).toBeTruthy();
  });

  test('renders each goal pillar label', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { achievedGoals: mockGoals },
    });
    const { getByText } = render(<AchievedGoalsVault />);
    expect(getByText('LOVE')).toBeTruthy();
    expect(getByText('SKILL')).toBeTruthy();
  });

  test('renders avgIntensity formatted to 1 decimal place', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { achievedGoals: mockGoals },
    });
    const { getByText } = render(<AchievedGoalsVault />);
    // 7.333 → "7.3", 8.0 → "8.0"
    expect(getByText('Average Intesity: 7.3')).toBeTruthy();
    expect(getByText('Average Intesity: 8.0')).toBeTruthy();
  });

  test('renders finalCount days for each goal', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { achievedGoals: mockGoals },
    });
    const { getByText } = render(<AchievedGoalsVault />);
    expect(getByText('Days: 30')).toBeTruthy();
    expect(getByText('Days: 21')).toBeTruthy();
  });

  test('renders achievedAt as a localised date string', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { achievedGoals: mockGoals },
    });
    const { getAllByText } = render(<AchievedGoalsVault />);
    // toLocaleDateString output varies by environment locale —
    // check that an "Achieved :" label exists for each goal
    const labels = getAllByText(/Achieved :/);
    expect(labels).toHaveLength(2);
  });

  test('renders "Completed intentions" header label', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { achievedGoals: mockGoals },
    });
    const { getByText } = render(<AchievedGoalsVault />);
    expect(getByText('Completed intentions')).toBeTruthy();
  });

  // --- Single goal edge case ---

  test('renders correctly with a single goal', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { achievedGoals: [mockGoals[0]] },
    });
    const { getByText } = render(<AchievedGoalsVault />);
    expect(getByText('Total: 1')).toBeTruthy();
    expect(getByText('Daily Meditation')).toBeTruthy();
  });

});