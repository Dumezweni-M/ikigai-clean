import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';


/**
 * Smoke Test — App Bootstrap
 * Verifies the app mounts and renders without crashing.
 * Does not test logic or interactions, only that the entry point
 * initialises successfully (navigation, Apollo, screens).
 */

test('renders correctly', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Loading tasks/i)).toBeTruthy();
});