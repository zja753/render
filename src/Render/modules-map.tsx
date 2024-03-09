import { Button } from 'antd';
import React, { FC } from 'react';

const Container: FC<any> = ({ children, style }) => {
  return <div style={style}>{children}</div>;
};

const CustomButton: FC<any> = ({ text, ...others }) => {
  console.log(`others JD==> `, others);
  return (
    <Button
      onClick={() => {
        console.log(`JD==> ???`);
      }}
      {...others}
    >
      {text}
    </Button>
  );
};

const Text: FC<any> = ({ text, ...others }) => {
  return <div {...others}>{text}</div>;
};

export default {
  Container,
  Button: CustomButton,
  Text,
};
