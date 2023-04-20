import { Button } from 'antd';
import React, { ReactNode } from 'react';
import styles from './style.module.scss';

type Props = {
  children: ReactNode;
  danger?: boolean;
  onClick?: () => void;
  isSubmit?: boolean;
};

const CommonButton = ({ children, danger = false, onClick, isSubmit = false }: Props) => {
  return (
    <Button
      onClick={onClick}
      htmlType={isSubmit ? 'submit' : 'button'}
      danger={danger}
      className={styles.commonBtn}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
