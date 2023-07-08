import { CameraOutlined } from '@ant-design/icons';
import { Descriptions, Modal } from 'antd';
import uploadApi from 'axiosConfig/api/upload';
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import './DefaultLayout.scss';
import { saveUser } from 'store/slices/authSlice';

type Props = {
  open: boolean;
  handleCancel: () => void;
};

const DEFAULT_AVT =
  'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg';

const ModalUserInfo = ({ handleCancel, open }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerUpload = () => {
    inputRef.current?.click();
  };
  const handleUpload = async (e) => {
    try {
      setLoading(true);
      if (e.target.files && e.target.files.length) {
        const fileUpload = e.target.files[0];
        // Check is Image
        const listImageType = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!listImageType.includes(fileUpload.type)) {
          return;
        }
        const formAvt = new FormData();
        formAvt.append('file', fileUpload);
        const res = await uploadApi.uploadAvatar(formAvt);
        dispatch(saveUser(res.data as any));
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal title="" open={open} onCancel={handleCancel} width="70vw">
      <div className="user-info-wrapper">
        <Descriptions
          title={
            <div className="title-info">
              <h2>Thông tin cá nhân</h2>
              <div className="avatar-wrapper">
                {loading ? (
                  <div className="avatar-loading" />
                ) : (
                  <img src={currentUser.photo ?? DEFAULT_AVT} alt="" className="avatar-user" />
                )}
                <CameraOutlined className="upload-button" onClick={triggerUpload} />
                <input ref={inputRef} type="file" className="input-file" onChange={handleUpload} />
              </div>
            </div>
          }
          bordered
          layout="horizontal"
          column={1}
        >
          <Descriptions.Item label="Ten hien thi">{currentUser.displayName}</Descriptions.Item>
          <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
          <Descriptions.Item label="Vi tri">{currentUser.role}</Descriptions.Item>
          {currentUser.department && (
            <Descriptions.Item label="Khoa phong">{currentUser.department}</Descriptions.Item>
          )}
        </Descriptions>
      </div>
    </Modal>
  );
};

export default ModalUserInfo;
