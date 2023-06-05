import { Col, Descriptions, Input, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import useService from './service';
import { toast } from 'react-toastify';
import { EditOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import MPath from 'routes/routes';
import { TSupplier } from 'types/supplier';
type TModal = '' | 'delete' | 'create';
const SupplierDetail = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [descriptions, setDescriptions] = useState<TSupplier>({
    name: '',
    phone: '',
    email: '',
    location: '',
  });

  const { supplierState, handleUpdateSupplier } = useService();

  const { supplierDetail, loading } = supplierState;
  const notify = () => toast('Wow so easy !');
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    handleUpdateSupplier(descriptions);
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
      name: supplierDetail.name,
      phone: supplierDetail.phone,
      email: supplierDetail.email,
      location: supplierDetail.location,
    });
  }, [supplierState]);
  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title} onClick={notify}>
          Thông tin chi tiết nhà cung cấp
        </h2>
        <CommonButton onClick={() => navigate(MPath.ADM_SUPPLIER)}>
          <RollbackOutlined />
        </CommonButton>
        <div className={styles.infoDepartment}>
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
                  <CommonButton loading={loading} onClick={handleSaveClick}>
                    <SaveOutlined />
                    Lưu
                  </CommonButton>
                </Col>
              )}
            </Row>
          </div>
          <Descriptions
            layout="horizontal"
            bordered
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Tên nhà cung cấp" labelStyle={{ width: 200 }}>
              {isEditing ? (
                <Input value={descriptions.name} onChange={(e) => handleInputChange(e, 'name')} />
              ) : (
                <p>{descriptions.name}</p>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {isEditing ? (
                <Input value={descriptions.phone} onChange={(e) => handleInputChange(e, 'phone')} />
              ) : (
                <p>{descriptions.phone}</p>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {isEditing ? (
                <Input value={descriptions.email} onChange={(e) => handleInputChange(e, 'email')} />
              ) : (
                <p>{descriptions.email}</p>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {isEditing ? (
                <Input
                  value={descriptions.location}
                  onChange={(e) => handleInputChange(e, 'location')}
                />
              ) : (
                <p>{descriptions.location}</p>
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
};
export default SupplierDetail;
