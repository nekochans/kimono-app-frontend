import React from 'react';
import AppTitle from './AppTitle';

export default {
  title: 'src/components/AppTitle.tsx',
  component: AppTitle,
  includeStories: ['showAppTitleWithProp'],
};

export const testProps = {
  text: '🐱KimonoApp🐱🐱',
};

export const showAppTitleWithProp = () => <AppTitle {...testProps} />;
