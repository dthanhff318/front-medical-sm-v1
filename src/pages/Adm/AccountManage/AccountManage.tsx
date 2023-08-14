import { Col, Descriptions, Input, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import ModalCreateUser from './ModalCreateUser';
import useService from './service';
import { toast } from 'react-toastify';
import { EditOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MPath from 'routes/routes';
import { TDepartment } from 'types/department';

type TModal = '' | 'delete' | 'create';
const AccountManage = () => {
  const navigate = useNavigate();
  const {
    departmentDetail,
    handleCreateUser,
    handleDeleteUser,
    makeAsOwner,
    loading,
    handleUpdateDepartment,
  } = useService();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'displayName',
      key: 'displayName',
      width: '40%',
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      width: '30%',
      key: 'role',
      render: (_, user) => (
        <div className={styles.actionBtn}>
          <CommonButton
            onClick={() => {
              makeAsOwner(user.id);
            }}
            disabled={departmentDetail.owner === user.id}
          >
            {departmentDetail.owner === user.id && 'Trưởng Phòng'}
            {departmentDetail.owner !== user.id && "Chuyển Trưởng Phòng"}
          </CommonButton>
        </div>
      ),
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
            Xóa
          </CommonButton>
        </div>
      ),
    },
  ];
  const [openModal, setOpenModal] = useState<TModal>('');
  const [selectUser, setSelectUser] = useState<any>();
  const [isEditing, setIsEditing] = useState(false);
  const [descriptions, setDescriptions] = useState<TDepartment>({
    name: '',
    phone: '',
    location: '',
  });

  const listUserDepartment = departmentDetail?.member?.map((u) => ({
    ...u,
    key: u?.id,
  }));
  const notify = () => toast('Wow so easy !');
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    handleUpdateDepartment(descriptions);
  };
  const handleInputChange = (e, key: string) => {
    const newValue = e.target.value;
    setDescriptions({
      ...descriptions,
      [key]: newValue,
    });
  };
  useEffect(() => {
    setDescriptions({
      name: departmentDetail?.name,
      phone: departmentDetail?.phone,
      location: departmentDetail?.location,
    });
  }, [departmentDetail]);
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Bạn có chắc chắn muốn xóa ?"
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
        loading={loading}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title} onClick={notify}>
          Thông tin chi tiết khoa phòng
        </h2>
        <div className={styles.infoDepartment}>
          <CommonButton onClick={() => navigate(MPath.ADM_DEPARTMENT)}>
            <RollbackOutlined />
          </CommonButton>
          <div className={styles.groupBtn}>
            <Row>
              {!isEditing ? (
                <Col span={5}>
                  <CommonButton onClick={handleEditClick}>
                    <EditOutlined /> Chỉnh sửa
                  </CommonButton>
                </Col>
              ) : (
                <Col span={6}>
                  <CommonButton onClick={handleSaveClick}>
                    <SaveOutlined />
                    Lưu
                  </CommonButton>
                </Col>
              )}
            </Row>
          </div>
          <Descriptions bordered size="small">
            <Descriptions.Item label="Tên khoa">
              {isEditing ? (
                <Input value={descriptions.name} onChange={(e) => handleInputChange(e, 'name')} />
              ) : (
                <p>{descriptions.name}</p>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Vị trí">
              {isEditing ? (
                <Input
                  value={descriptions.location}
                  onChange={(e) => handleInputChange(e, 'location')}
                />
              ) : (
                <p>{descriptions.location}</p>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Gmail">childlik@gmail.com</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {isEditing ? (
                <Input value={descriptions.phone} onChange={(e) => handleInputChange(e, 'phone')} />
              ) : (
                <p>{descriptions.phone}</p>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Trưởng khoa">Nguyen Van Vinh</Descriptions.Item>
          </Descriptions>
        </div>
        <div className={styles.groupBtn}>
          <CommonButton onClick={() => setOpenModal('create')}>Thêm người dùng mới</CommonButton>
        </div>
        <Table loading={loading === 'user'} dataSource={listUserDepartment} columns={columns} />
      </div>
    </>
  );
};
export default AccountManage;
