import React from 'react';
import useService from './service';
import s from './HomeUser.module.scss';
import { Table } from 'antd';

type Props = {};

const HomeUser = (props: Props) => {
  const { dataDepartment } = useService({});
  const columns = [
    {
      title: 'ID',
      // width: 150,
      dataIndex: 'id',
    },
    {
      title: 'Tên',
      // width: 150,
      dataIndex: 'displayName',
    },
    {
      title: 'Email',
      // width: 150,
      dataIndex: 'email',
    },
    {
      title: 'Email',
      // width: 150,
      dataIndex: 'email',
    },
    {
      title: 'Vị trí',
      // width: 150,
      dataIndex: 'role',
    },
  ];
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{dataDepartment.name}</h2>
      <div className={s.infoWrap}>
        <p>Trưởng phòng: </p>
        <p>Số điện thoại: </p>
        <p>Địa chỉ khoa: </p>
        <Table columns={columns} dataSource={dataDepartment.member} style={{ marginTop: '1rem' }} />
      </div>
    </div>
  );
};

export default HomeUser;
