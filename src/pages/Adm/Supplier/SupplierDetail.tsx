import { Descriptions, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import styles from './style.module.scss';
import useService from './service';
import { toast } from 'react-toastify';
import { RollbackOutlined } from '@ant-design/icons';
import MPath from 'routes/routes';
type TModal = '' | 'delete' | 'create';
const SupplierDetail = () => {
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
  const { supplierState } = useService();

  const { supplierDetail, pagination } = supplierState;
  console.log(supplierDetail);
  const notify = () => toast('Wow so easy !');
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Ban co chac chan xoa khong ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          //handleDeleteUser(selectUser);
          setOpenModal('');
        }}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title} onClick={notify}>
          Thông tin chi tiết nhà cung cấp
        </h2>
        <div className={styles.infoDepartment}>
          <Descriptions
            title={
              <CommonButton onClick={() => navigate(MPath.ADM_SUPPLIER)}>
                <RollbackOutlined />
              </CommonButton>
            }
            layout="horizontal"
            bordered
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Tên nhà cung cấp">{supplierDetail.name}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{supplierDetail.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{supplierDetail.email}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" span={2}>
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
};
export default SupplierDetail;
