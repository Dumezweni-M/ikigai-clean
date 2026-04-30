// __tests__/Navbar.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Navbar from '../src/components/Navbar';

// Mock useNavigation hook to intercept and track navigation calls
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

// Mock lucide icons — they're ESM modules that Jest can't transform,
// so we replace them with plain strings that React Native can render
jest.mock('lucide-react-native/dist/esm/icons/scale', () => 'Scale');
jest.mock('lucide-react-native/dist/esm/icons/waves', () => 'Waves');
jest.mock('lucide-react-native/dist/esm/icons/target', () => 'Target');
jest.mock('lucide-react-native/dist/esm/icons/compass', () => 'Compass');
jest.mock('lucide-react-native/dist/esm/icons/sparkle', () => 'Sparkle');

describe('Navbar', () => {

  // Reset mock call history before each test so counts don't bleed between tests
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  // Verify all 5 nav items are present in the rendered output
  test('renders all 5 nav items', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText('Create')).toBeTruthy();
    expect(getByText('Reflect')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Catalysts')).toBeTruthy();
    expect(getByText('Dashboard')).toBeTruthy();
  });

  // Verify pressing Home calls navigate with the correct screen name
  test('navigates to correct screen on press', () => {
    const { getByText } = render(<Navbar />);
    fireEvent.press(getByText('Home'));
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  // Verify pressing Create calls navigate with the correct screen name
  test('navigates to Create on press', () => {
    const { getByText } = render(<Navbar />);
    fireEvent.press(getByText('Create'));
    expect(mockNavigate).toHaveBeenCalledWith('Create');
  });

  // Verify every nav item fires navigation with its own name —
  // ensures no item is hardcoded or wired to the wrong screen
  test('each nav item triggers navigation', () => {
    const { getByText } = render(<Navbar />);
    const items = ['Create', 'Reflect', 'Home', 'Catalysts', 'Dashboard'];
    items.forEach(item => {
      fireEvent.press(getByText(item));
      expect(mockNavigate).toHaveBeenCalledWith(item);
    });
    expect(mockNavigate).toHaveBeenCalledTimes(5);
  });

});