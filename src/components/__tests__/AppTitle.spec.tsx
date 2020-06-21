import React from 'react';
import renderer from 'react-test-renderer';
import AppTitle from '../AppTitle';
import { testProps } from '../AppTitle.stories';

test('AppTitle', () => {
  const component = renderer.create(<AppTitle {...testProps} />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
