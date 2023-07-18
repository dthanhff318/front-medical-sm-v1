import React from 'react';
import useService from './service';
import s from './HomeUser.module.scss';
import { Table } from 'antd';
import { getRoleName } from 'helpers/functions';

type Props = {};

const HomeUser = (props: Props) => {
  const { dataDepartment } = useService({});
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'displayName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Vị trí',
      dataIndex: 'role',
    },
  ];
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{dataDepartment.name}</h2>
      <div className={s.infoWrap}>
        <p>Trưởng phòng: Chưa chỉ định</p>
        <p>Số điện thoại: 098833322</p>
        <p>Địa chỉ khoa: Phòng D3 Khu 5</p>
        <Table
          columns={columns}
          dataSource={dataDepartment.member?.map((e) => ({
            ...e,
            role: getRoleName(e.role),
          }))}
          style={{ marginTop: '1rem' }}
        />
      </div>
    </div>
  );
};

export default HomeUser;
