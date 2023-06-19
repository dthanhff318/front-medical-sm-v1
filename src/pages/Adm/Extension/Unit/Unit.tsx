import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './Unit.module.scss';
import Search from 'antd/es/input/Search';
import useService from './service';
import ModalCreateUnit from './ModalCreateUnit';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom';
import { Value } from 'sass';
import { getUnit } from 'store/slices/unitSlice';
import { useDispatch } from 'react-redux';
type TModal = '' | 'delete' | 'create';
const Unit = () => {
  const dispatch = useDispatch();
  const { unitState, handleDeleteUnit,onCreateUnit } = useService();
  const [selectUnit, setSelectUnit] = useState<number>(-1);

  const { units, pagination } = unitState;
  const [filter, setFilter] = useState({
    page: 1,
    q: '',
  });
  const onChangePage = (page: number, limit: number) => {
    setFilter((prev) => ({ ...prev, page }));
    dispatch(getUnit({ ...filter, page }) as any);
  };
  const unitListMapping =
    units.map((d) => ({
      ...d,
      key: d?.id,
    })) ?? [];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Tên đơn vị',
      dataIndex: 'name',
      key: 'name',
      width: '80%',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, d) => (
        <div className={styles.actionBtn}>
          <CommonButton
            danger
            onClick={() => {
              console.log(d);
              setSelectUnit(d.id);
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
  const onSearch = (value: string) => {
    console.log(value)
    setFilter((prev) => ({ ...prev, q: value }));
    dispatch(getUnit({ ...filter, q: value }) as any);
  };
  
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Bạn có chắc chắn xóa không ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          handleDeleteUnit(selectUnit);
          setOpenModal('');
        }}
      />
      <ModalCreateUnit
        open={openModal === 'create'}
        onCreateUnit={onCreateUnit}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Quản lý đơn vị</h2>
        <Row gutter={[8, 0]} justify = 'space-between'style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Search placeholder="Nhập đơn vị" onSearch={(Value)=>onSearch(Value)} style={{ width: '100%' }} />
          </Col>
          <Col span={4}>
            <CommonButton onClick={() => setOpenModal('create')}>Thêm mới đơn vị</CommonButton>
          </Col>
        </Row>
        <Table scroll={{ x: 'max-content', y: '50vh' }} 
        dataSource={unitListMapping} columns={columns}
        pagination={false}
        rowKey="id"/>
        <Row justify={'center'} style={{ marginTop: '20px' }}>
          <PaginationCustom
            total={pagination.totalResults}
            current={filter.page}
            pageSize={pagination.limit}
            onChange={onChangePage}
          />
        </Row>
      </div>
    </>
  );
};
export default Unit;
