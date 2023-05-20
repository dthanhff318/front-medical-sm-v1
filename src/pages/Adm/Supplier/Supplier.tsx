import React, { useState } from 'react';
import { Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './style.module.scss';
import MPath from 'routes/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { replacePathParams } from 'helpers/functions';
import useService from './service';
type TModal = '' | 'delete' | 'create';
const Supplier = () => {
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
      width: '70%',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, d) => (
        <div className={styles.actionBtn}>
          <Link to={replacePathParams(MPath.ADM_SUPPLIER_DETAIL, { id: d.id })}>
            <CommonButton>Chi tiet</CommonButton>
          </Link>
          <CommonButton
            danger
            onClick={() => {
              console.log(d);
              setSelectSupplier(d.id);
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
  const [selectSupplier, setSelectSupplier] = useState<number>(-1);
  const { supplierState, handleDeleteSupplier } = useService();

  const { suppliers, pagination } = supplierState;
  const supplierListMapping =
    suppliers.map((d) => ({
      ...d,
      key: d?.id,
      owner: d?.owner ? d.owner?.displayName : '',
    })) ?? [];
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Bạn có chắc chắn xóa không ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          handleDeleteSupplier(selectSupplier);
          setOpenModal('');
        }}
      />
      {/* <ModalCreateDepartment
        open={openModal === 'create'}
        onCreateDepartment={onCreateDepartment}
        onCancel={() => setOpenModal('')}
      /> */}
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Quản ly nhà cung cấp</h2>
        <div className={styles.groupBtn}>
          <CommonButton onClick={() => setOpenModal('create')}>Thêm mới nhà cung cấp</CommonButton>
        </div>
        <Table dataSource={supplierListMapping} columns={columns} />
      </div>
    </>
  );
};
export default Supplier;
