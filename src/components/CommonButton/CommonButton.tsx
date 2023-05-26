import { Button } from 'antd';
import React, { CSSProperties, ReactNode } from 'react';
import styles from './style.module.scss';

type Props = {
  children: ReactNode;
  danger?: boolean;
  onClick?: () => void;
  isSubmit?: boolean;
  className?: string;
  loading?: boolean;
};

const CommonButton = ({
  children,
  danger = false,
  onClick,
  isSubmit = false,
  className,
  loading = false,
}: Props) => {
  return (
    <Button
      onClick={onClick}
      htmlType={isSubmit ? 'submit' : 'button'}
      danger={danger}
      loading={loading}
      className={`${styles.commonBtn} ${className}`}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
