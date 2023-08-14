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
  disabled?: boolean;
};

const CommonButton = ({
  children,
  danger = false,
  onClick,
  isSubmit = false,
  className,
  loading = false,
  disabled,
}: Props) => {
  return (
    <Button
      onClick={onClick}
      htmlType={isSubmit ? 'submit' : 'button'}
      danger={danger}
      loading={loading}
      className={`${styles.commonBtn} ${className}`}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
