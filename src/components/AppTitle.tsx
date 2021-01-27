import React from 'react';

type Props = {
  text: string;
};

const AppTitle: React.FC<Props> = ({ text }: Props) => (
  <>
    <h1>{text}</h1>
    <style jsx>{`
      h1 {
        color: red;
        font-size: 50px;
      }
    `}</style>
  </>
);

export default AppTitle;
