import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Router from '../router';

describe('Router', () => {
  it('should contain a dashboard route', () => {
    expect(render(<Router />)).toMatchSnapshot();
  });
});
