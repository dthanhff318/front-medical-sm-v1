import { Col, Descriptions, Input, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import useService from './service';
import { toast } from 'react-toastify';
import { EditOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import MPath from 'routes/routes';
import { TSupplier } from 'types/supplier';
import uploadApi from 'axiosConfig/api/upload';
import { useDispatch } from 'react-redux';
import { updateSupplier } from 'store/slices/supplierSlice';
const SupplierDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [descriptions, setDescriptions] = useState<TSupplier>({
    name: '',
    phone: '',
    email: '',
    location: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerUpload = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (e) => {
    try {
      if (e.target.files && e.target.files.length && supplierDetail.id) {
        const fileUpload = e.target.files[0];
        // Check is Image
        const listImageType = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!listImageType.includes(fileUpload.type)) {
          return;
        }
        const formImg = new FormData();
        formImg.append('file', fileUpload);
        const res = await uploadApi.uploadPhotoSupplier(formImg, supplierDetail.id);
        dispatch(updateSupplier(res.data) as any);
      }
    } catch (err) {
      toast.error('Tải ảnh lên không thành công');
    }
  };
  const { supplierState, handleUpdateSupplier } = useService();

  const { supplierDetail, loading } = supplierState;
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
        <h2 className={styles.title}>Thông tin chi tiết nhà cung cấp</h2>
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
        <div className={styles.photo}>
          {supplierDetail.photo ? (
            <img src={supplierDetail.photo} className={styles.img} />
          ) : (
            <div className={styles.img}>Chưa có ảnh nào</div>
          )}
          <CommonButton onClick={triggerUpload}>Tải ảnh lên</CommonButton>
          <input ref={inputRef} type="file" className={styles.inputFile} onChange={handleUpload} />
        </div>
      </div>
    </>
  );
};
export default SupplierDetail;
