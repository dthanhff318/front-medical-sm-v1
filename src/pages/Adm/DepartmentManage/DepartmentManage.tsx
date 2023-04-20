import React, { useState } from 'react';
import { Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './style.module.scss';
import ModalCreateUser from './ModalCreateUser';
import MPath from 'routes/routes';
import { Link } from 'react-router-dom';
import useService from './service';

type TModal = '' | 'delete' | 'create';
const DepartmentManage = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Khoa nhi',
      owner: 'Khoa',
    },
    {
      key: '2',
      name: 'Khoa san',
      owner: 'Ngoc',
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
      title: 'Ten khoa phong',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: 'Truong khoa',
      dataIndex: 'owner',
      width: '30%',
      key: 'owner',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <div className={styles.actionBtn}>
          <Link to={MPath.ADM_DEPARTMENT_DETAIL}>
            <CommonButton>Chi tiet</CommonButton>
          </Link>
          <CommonButton danger onClick={() => setOpenModal('delete')}>
            Xoa
          </CommonButton>
        </div>
      ),
    },
  ];
  const [openModal, setOpenModal] = useState<TModal>('');
  const {} = useService();
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
        onCreateUser={() => {}}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Quan ly khoa phong</h2>
        <div className={styles.groupBtn}>
          <CommonButton onClick={() => setOpenModal('create')}>Them moi khoa phong</CommonButton>
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
};
export default DepartmentManage;
