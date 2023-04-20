import React, { ReactNode } from 'react';
import { Modal } from 'antd';
import styles from './style.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';

type Props = {
  title: ReactNode;
  subTitle: ReactNode;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const ModalDelete = ({ title, subTitle, open, onOk, onCancel }: Props) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={
        <div className={styles.footer}>
          <CommonButton onClick={onCancel}>Huy</CommonButton>
          <CommonButton danger onClick={onOk}>
            Xoa
          </CommonButton>
        </div>
      }
    >
      <p>{subTitle}</p>
    </Modal>
  );
};

export default ModalDelete;
