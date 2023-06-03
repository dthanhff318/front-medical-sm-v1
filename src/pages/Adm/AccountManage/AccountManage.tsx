import { Descriptions, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import React, { useState } from 'react';
import styles from './style.module.scss';
import ModalCreateUser from './ModalCreateUser';
import useService from './service';
import { toast } from 'react-toastify';
import { RollbackOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MPath from 'routes/routes';

type TModal = '' | 'delete' | 'create';
const AccountManage = () => {
  const navigate = useNavigate();
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
      render: (_, user) => (
        <div className={styles.actionBtn}>
          <CommonButton
            danger
            onClick={() => {
              setSelectUser(user.id);
              setOpenModal('delete');
            }}
          >
            Xoa
          </CommonButton>
        </div>
      ),
    },
  ];
  const [openModal, setOpenModal] = useState<TModal>('');
  const [selectUser, setSelectUser] = useState<any>();
  const { departmentDetail, handleCreateUser, handleDeleteUser } = useService();
  const listUserDepartment = departmentDetail.member?.map((u) => ({
    ...u,
    key: u?.id,
  }));
  const notify = () => toast('Wow so easy !');
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Ban co chac chan xoa khong ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          handleDeleteUser(selectUser);
          setOpenModal('');
        }}
      />
      <ModalCreateUser
        open={openModal === 'create'}
        onCreateUser={handleCreateUser}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title} onClick={notify}>
          Thong tin chi tiet khoa phong
        </h2>
        <div className={styles.infoDepartment}>
          <Descriptions
            bordered
            title={
              <CommonButton onClick={() => navigate(MPath.ADM_DEPARTMENT)}>
                <RollbackOutlined />
              </CommonButton>
            }
            size="small"
          >
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
        <Table dataSource={listUserDepartment} columns={columns} />
      </div>
    </>
  );
};
export default AccountManage;
