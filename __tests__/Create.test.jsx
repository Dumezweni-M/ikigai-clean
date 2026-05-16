import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Create from '../src/screens/Create';

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockAddTask = jest.fn();
jest.mock('@apollo/client', () => ({
  useMutation: jest.fn(),
  gql: (q) => q,
}));

jest.mock('../src/graphql/mutations', () => ({
  CREATE_TASK: 'CREATE_TASK',
}));

jest.mock('../src/styles/typography', () => ({
  h1: {}, h2: {}, light: {}, label: {}, body: {},
}));
jest.mock('../src/styles/layout', () => ({
  cardSm: {}, cardXxsTertiary: {}, cardSmDark: {},
}));
jest.mock('../src/styles/colors', () => ({
  border: '#000',
}));

jest.mock('../src/components/ScreenWrapper', () => ({ children }) => <>{children}</>);
jest.mock('../src/components/ScrollVertical', () => ({ children }) => <>{children}</>);
jest.mock('../src/components/Stack', () => ({ children }) => <>{children}</>);

jest.mock('../src/components/Buttons', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ label, onPress, disabled }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
});

// PillarSelector calls onSelect when a pillar is tapped
jest.mock('../src/components/PillarSelector', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ onSelect }) => (
    <TouchableOpacity onPress={() => onSelect('Love')} accessibilityLabel="pillar-selector">
      <Text>Love</Text>
    </TouchableOpacity>
  );
});

// FrequencySelector calls onValueChange with duration + targetDays data
jest.mock('../src/components/FrequencySelector', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ onValueChange }) => (
    <TouchableOpacity
      onPress={() => onValueChange({ interval: 'Daily', duration: '30', targetDays: '7' })}
      accessibilityLabel="frequency-selector"
    >
      <Text>Set Frequency</Text>
    </TouchableOpacity>
  );
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const renderCreate = () => render(<Create />);

const selectPillar = () =>
  fireEvent.press(screen.getByLabelText('pillar-selector'));

const typeIntention = (text = 'Morning run') =>
  fireEvent.changeText(screen.getByPlaceholderText('Set your intention'), text);

const setFrequency = () =>
  fireEvent.press(screen.getByLabelText('frequency-selector'));

const pressActivate = () =>
  fireEvent.press(screen.getByLabelText('Activate'));

const isDisabled = () =>
  screen.getByLabelText('Activate').props.accessibilityState?.disabled;

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Create screen', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    useMutation.mockReturnValue([mockAddTask, { loading: false, error: null }]);
  });

  // ── Initial render ──────────────────────────────────────────────────────────

  describe('initial render', () => {

    test('shows the pillar selection heading', () => {
      renderCreate();
      expect(screen.getByText('Select a pillar')).toBeTruthy();
    });

    test('does not show intention input before a pillar is selected', () => {
      renderCreate();
      expect(screen.queryByPlaceholderText('Set your intention')).toBeNull();
    });

    test('does not show horizon section before a pillar is selected', () => {
      renderCreate();
      expect(screen.queryByText('Set your horizon')).toBeNull();
    });

    test('renders the Activate button', () => {
      renderCreate();
      expect(screen.getByLabelText('Activate')).toBeTruthy();
    });

    test('Activate button is disabled initially', () => {
      renderCreate();
      expect(isDisabled()).toBe(true);
    });

  });

  // ── Progressive disclosure ──────────────────────────────────────────────────

  describe('progressive disclosure', () => {

    test('reveals intention input after pillar is selected', () => {
      renderCreate();
      selectPillar();
      expect(screen.getByPlaceholderText('Set your intention')).toBeTruthy();
    });

    test('shows "Add Intention" heading after pillar is selected', () => {
      renderCreate();
      selectPillar();
      expect(screen.getByText('Add Intention')).toBeTruthy();
    });

    test('does not show horizon section when intention is empty', () => {
      renderCreate();
      selectPillar();
      expect(screen.queryByText('Set your horizon')).toBeNull();
    });

    test('reveals horizon section once intention has text', () => {
      renderCreate();
      selectPillar();
      typeIntention();
      expect(screen.getByText('Set your horizon')).toBeTruthy();
    });

    test('hides horizon section again if intention is cleared', () => {
      renderCreate();
      selectPillar();
      typeIntention();
      typeIntention('');
      expect(screen.queryByText('Set your horizon')).toBeNull();
    });

  });

  // ── canActivate / button state ──────────────────────────────────────────────

  describe('Activate button enabled state', () => {

    test('remains disabled with pillar but no intention', () => {
      renderCreate();
      selectPillar();
      expect(isDisabled()).toBe(true);
    });

    test('remains disabled with pillar + intention but no horizon', () => {
      renderCreate();
      selectPillar();
      typeIntention();
      expect(isDisabled()).toBe(true);
    });

    test('becomes enabled when pillar, intention, and horizon are all set', () => {
      renderCreate();
      selectPillar();
      typeIntention();
      setFrequency();
      expect(isDisabled()).toBe(false);
    });

    test('is disabled while mutation is loading', () => {
      useMutation.mockReturnValue([mockAddTask, { loading: true, error: null }]);
      renderCreate();
      selectPillar();
      typeIntention();
      setFrequency();
      expect(isDisabled()).toBe(true);
    });

  });

  // ── handleActivate / mutation ───────────────────────────────────────────────

  describe('handleActivate', () => {

    test('does not call mutation when intention is empty', () => {
      renderCreate();
      pressActivate();
      expect(mockAddTask).not.toHaveBeenCalled();
    });

    test('does not call mutation when only whitespace is entered', () => {
      renderCreate();
      selectPillar();
      typeIntention('   ');
      pressActivate();
      expect(mockAddTask).not.toHaveBeenCalled();
    });

    test('calls addTask with correct variables when form is complete', () => {
      renderCreate();
      selectPillar();
      typeIntention('Morning run');
      setFrequency();
      pressActivate();

      expect(mockAddTask).toHaveBeenCalledWith({
        variables: {
          taskItem: 'Morning run',
          pillar: 'Love',
          intensity: 1,
          interval: 'Daily',
          duration: '30',
          targetDays: '7',
        },
      });
    });

    test('navigates to Intentions on successful mutation', () => {
      useMutation.mockImplementation((mutation, { onCompleted }) => {
        return [
          (opts) => { mockAddTask(opts); onCompleted(); },
          { loading: false, error: null },
        ];
      });

      renderCreate();
      selectPillar();
      typeIntention('Morning run');
      setFrequency();
      pressActivate();

      expect(mockNavigate).toHaveBeenCalledWith('Intentions');
    });

  });

});