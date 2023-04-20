import { Descriptions, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import React, { useState } from 'react';
import styles from './style.module.scss';
import ModalCreateUser from './ModalCreateUser';
import useService from './service';

type TModal = '' | 'delete' | 'create';
const AccountManage = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      department: 'Khoa nhi',
    },
    {
      key: '2',
      name: 'John',
      department: 'Khoa san',
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Ten nguoi dung',
      dataIndex: 'displayName',
      key: 'displayName',
      width: '40%',
    },
    {
      title: 'Quyen',
      dataIndex: 'role',
      width: '30%',
      key: 'role',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <div className={styles.actionBtn}>
          <CommonButton>Chi tiet</CommonButton>
          <CommonButton danger onClick={() => setOpenModal('delete')}>
            Xoa
          </CommonButton>
        </div>
      ),
    },
  ];
  const [openModal, setOpenModal] = useState<TModal>('');
  const { departmentDetail, handleCreateUser } = useService();

  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Ban co chac chan xoa khong ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => setOpenModal('')}
      />
      <ModalCreateUser
        open={openModal === 'create'}
        onCreateUser={handleCreateUser}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Thong tin chi tiet khoa phong</h2>
        <div className={styles.infoDepartment}>
          <Descriptions bordered title="Custom Size" size="small">
            <Descriptions.Item label="Ten khoa">{departmentDetail.name}</Descriptions.Item>
            <Descriptions.Item label="Vi tri">{departmentDetail.location}</Descriptions.Item>
            <Descriptions.Item label="Gmail">childlik@gmail.com</Descriptions.Item>
            <Descriptions.Item label="So dien thoai">{departmentDetail.phone}</Descriptions.Item>
            <Descriptions.Item label="Truong khoa">Nguyen Van Vinh</Descriptions.Item>
          </Descriptions>
        </div>
        <div className={styles.groupBtn}>
          <CommonButton onClick={() => setOpenModal('create')}>Them nguoi dung moi</CommonButton>
        </div>
        <Table dataSource={departmentDetail.member} columns={columns} />
      </div>
    </>
  );
};
export default AccountManage;
