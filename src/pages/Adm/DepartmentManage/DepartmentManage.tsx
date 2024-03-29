import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import Search from 'antd/es/input/Search';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './style.module.scss';
import ModalCreateDepartment from './ModalCreateDepartment';
import MPath from 'routes/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useService from './service';
import { createQueryUrl, replacePathParams } from 'helpers/functions';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom';

type TModal = '' | 'delete' | 'create';
const DepartmentManage = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Tên khoa phòng',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: 'Trưởng khoa',
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
            <CommonButton>Chi tiết</CommonButton>
          </Link>
          <CommonButton
            danger
            onClick={() => {
              setSelectDepartment(d.id);
              setOpenModal('delete');
            }}
          >
            Xóa
          </CommonButton>
        </div>
      ),
    },
  ];
  const [openModal, setOpenModal] = useState<TModal>('');
  const [selectDepartment, setSelectDepartment] = useState<number>(-1);
  const { departmentState, urlQueryParams, onCreateDepartment, handleDeleteDepartment } =
    useService();
  const { departmentList, pagination } = departmentState;
  const location = useLocation();
  const navigate = useNavigate();
  const onChangePage = (page: number, limit: number) => {
    navigate(createQueryUrl(location, { ...urlQueryParams, page, limit }));
  };
  const onSearch = (value: string) => {};
  const departmentListMapping =
    departmentList.map((d) => ({
      ...d,
      key: d?.id,
      owner: d?.owner ? d.owner?.displayName : '',
    })) ?? [];
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Bạn có chắc chắn muốn xóa không ?"
        subTitle="Xóa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          handleDeleteDepartment(selectDepartment);
          setOpenModal('');
        }}
      />
      <ModalCreateDepartment
        open={openModal === 'create'}
        onCreateDepartment={onCreateDepartment}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Quản lý khoa phòng</h2>
        <Row gutter={[8, 0]} justify="space-between" style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Search
              placeholder="Nhập tên khoa phòng"
              onSearch={onSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={4}>
            <CommonButton onClick={() => setOpenModal('create')}>Thêm mới khoa phòng</CommonButton>
          </Col>
        </Row>
        {/* <div className={styles.groupBtn}>
          <CommonButton onClick={() => setOpenModal('create')}>Them moi khoa phong</CommonButton>
        </div> */}
        <Table dataSource={departmentListMapping} columns={columns} pagination={false} />
        <Row justify={'center'} style={{ marginTop: '20px' }}>
          <PaginationCustom
            total={pagination.totalResults}
            current={pagination.page}
            pageSize={pagination.limit}
            onChange={onChangePage}
          />
        </Row>
      </div>
    </>
  );
};
export default DepartmentManage;
