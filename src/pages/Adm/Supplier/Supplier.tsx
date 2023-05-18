import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './style.module.scss';
import MPath from 'routes/routes';
import { Link } from 'react-router-dom';
import { replacePathParams } from 'helpers/functions';
import useService from '../DepartmentManage/service';
import supplierApi from 'axiosConfig/api/supplier';

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
      render: (_, d) => (
        <div className={styles.actionBtn}>
          <Link to={replacePathParams(MPath.ADM_DEPARTMENT_DETAIL, { id: d.id })}>
            <CommonButton>Chi tiet</CommonButton>
          </Link>
          <CommonButton
            danger
            onClick={() => {
              setSelectDepartment(d.id);
              setOpenModal('delete');
            }}
          >
            Xoa
          </CommonButton>
        </div>
      ),
    },
  ];
  // useEffect(() => {
  //   supplierApi.getListsupplier().then((res) => {
  //     console.log('vvv');
  //   });
  // }, []);
  const [openModal, setOpenModal] = useState<TModal>('');
  const [selectDepartment, setSelectDepartment] = useState<number>(-1);
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Ban co chac chan xoa khong ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          setOpenModal('');
        }}
      />
      {/* <ModalCreateDepartment
        open={openModal === 'create'}
        onCreateDepartment={onCreateDepartment}
        onCancel={() => setOpenModal('')}
      /> */}
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Quan ly nhà cung cấp</h2>
        <div className={styles.groupBtn}>
          <CommonButton onClick={() => setOpenModal('create')}>Them moi khoa phong</CommonButton>
        </div>
        <Table dataSource={[]} columns={columns} />
      </div>
    </>
  );
};
export default Supplier;
