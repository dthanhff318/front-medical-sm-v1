import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './Group.module.scss';
import Search from 'antd/es/input/Search';
import useService from './service';
import ModalCreateGroup from './ModalCreateGroup';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom';
import { useDispatch } from 'react-redux';
import { getGroup } from 'store/slices/groupSlice';
type TModal = '' | 'delete' | 'create';
const Group = () => {
  const dispatch = useDispatch();
  const { groupState, handleDeleteGroup,onCreateGroup } = useService();
  const [selectGroup, setSelectGroup] = useState<number>(-1);

  const { groups, pagination } = groupState;
  const [filter, setFilter] = useState({
    page: 1,
    q: '',
  });
  const onChangePage = (page: number, limit: number) => {
    setFilter((prev) => ({ ...prev, page }));
    dispatch(getGroup({ ...filter, page }) as any);
  };
  const groupListMapping =
    groups.map((d) => ({
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
      title: 'Tên nhóm vật tư',
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
          <CommonButton
            danger
            onClick={() => {
              console.log(d);
              setSelectGroup(d.id);
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
    dispatch(getGroup({ ...filter, q: value }) as any);
  };
  
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Bạn có chắc chắn xóa không ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          handleDeleteGroup(selectGroup);
          setOpenModal('');
        }}
      />
      <ModalCreateGroup
        open={openModal === 'create'}
        onCreateGroup={onCreateGroup}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Quản lý nhóm vật tư</h2>
        <Row gutter={[8, 0]} justify = 'space-between'style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Search placeholder="Nhập nhóm vật tư" onSearch={(Value)=>onSearch(Value)} style={{ width: '100%' }} />
          </Col>
          <Col span={4}>
            <CommonButton onClick={() => setOpenModal('create')}>Thêm mới nhóm</CommonButton>
          </Col>
        </Row>
        <Table dataSource={groupListMapping} columns={columns}
        scroll={{ x: 'max-content', y: '50vh' }}
        pagination={false}
        rowKey="id" />
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
export default Group;
