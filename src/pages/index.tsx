import React from 'react';
import AppTitle from '../components/AppTitle';

export const config = {
  amp: true,
};

const IndexPage: React.FC = () => {
  const props = {
    text: '🐱着物アプリ🐱',
  };

  return (
    <>
      <AppTitle {...props} />
    </>
  );
};

export default IndexPage;
