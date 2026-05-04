import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DashboardFilter from '../src/components/DashboardFilter';

jest.mock('lucide-react-native/dist/esm/icons/scale', () => 'Scale');
jest.mock('lucide-react-native/dist/esm/icons/waves', () => 'Waves');
jest.mock('lucide-react-native/dist/esm/icons/target', () => 'Target');
jest.mock('lucide-react-native/dist/esm/icons/compass', () => 'Compass');
jest.mock('lucide-react-native/dist/esm/icons/sparkle', () => 'Sparkle');

describe('DashboardFilter', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all nav items', () => {
    const { getByText } = render(
      <DashboardFilter selectedPillar="All" onSelect={mockOnSelect} />
    );

    expect(getByText('All')).toBeTruthy();
    expect(getByText('Love')).toBeTruthy();
    expect(getByText('Skill')).toBeTruthy();
    expect(getByText('Wealth')).toBeTruthy();
    expect(getByText('World')).toBeTruthy();
  });

  it('calls onSelect with correct pillar name when pressed', () => {
    const { getByText } = render(
      <DashboardFilter selectedPillar="All" onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('Love'));
    expect(mockOnSelect).toHaveBeenCalledWith('Love');

    fireEvent.press(getByText('Wealth'));
    expect(mockOnSelect).toHaveBeenCalledWith('Wealth');
  });

  it('applies selected styles to active pillar', () => {
    const { getByText } = render(
      <DashboardFilter selectedPillar="Skill" onSelect={mockOnSelect} />
    );

    const skillText = getByText('Skill');
    expect(skillText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: expect.any(String) })
      ])
    );
  });

  it('does not apply selected styles to inactive pillars', () => {
    const { getByText } = render(
      <DashboardFilter selectedPillar="All" onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('Love'));
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).not.toHaveBeenCalledWith('All');
  });

  it('calls onSelect once per press', () => {
    const { getByText } = render(
      <DashboardFilter selectedPillar="All" onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('World'));
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});