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
      title: 'Vị trí',
      dataIndex: 'role',
    },
  ];
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{dataDepartment.name}</h2>
      <div className={s.infoWrap}>
        <p>Trưởng phòng: {dataDepartment?.member?.find(e=>e.id===dataDepartment.owner).displayName}</p>
        <p>Email: {dataDepartment?.member?.find(e=>e.id===dataDepartment.owner).email}</p>
        <p>Địa chỉ khoa: {dataDepartment.location}</p>
        <Table
          columns={columns}
          dataSource={dataDepartment.member?.map((e) => ({
            ...e,
            role: e.id === dataDepartment.owner ? 'Trưởng Phòng' : 'Nhan Vien',
          }))}
          style={{ marginTop: '1rem' }}
        />
      </div>
    </div>
  );
};

export default HomeUser;
