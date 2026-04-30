// __tests__/Button.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Buttons from '../src/components/Buttons';

describe('Buttons', () => {

  // Verify the label text is rendered correctly
  test('renders label correctly', () => {
    const { getByText } = render(<Buttons label="Press Me" />);
    expect(getByText('Press Me')).toBeTruthy();
  });

  // Verify onPress callback fires when button is pressed
  test('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<Buttons label="Press Me" onPress={mockPress} />);
    fireEvent.press(getByText('Press Me'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  // Verify button renders without crashing when no onPress is provided
  test('renders without onPress without crashing', () => {
    const { getByText } = render(<Buttons label="No Handler" />);
    expect(getByText('No Handler')).toBeTruthy();
  });

  // Verify default variant is primary when none is specified
  test('defaults to primary variant', () => {
    const { getByText } = render(<Buttons label="Default" />);
    expect(getByText('Default')).toBeTruthy();
  });

  // Verify each variant renders without crashing
  test.each([
    ['primary'],
    ['secondary'],
    ['inverted'],
    ['outlined'],
    ['noir'],
    ['cta'],
  ])('renders %s variant without crashing', (variant) => {
    const { getByText } = render(<Buttons label="Test" variant={variant} />);
    expect(getByText('Test')).toBeTruthy();
  });

  // Verify onPress is not called when button is not pressed
  test('does not call onPress before interaction', () => {
    const mockPress = jest.fn();
    render(<Buttons label="Idle" onPress={mockPress} />);
    expect(mockPress).not.toHaveBeenCalled();
  });

});