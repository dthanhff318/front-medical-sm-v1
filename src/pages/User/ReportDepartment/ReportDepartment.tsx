import React from 'react';
import useService from './service';
import s from './ReportDepartment.module.scss';
import { getRoleName } from 'helpers/functions';

type Props = {};

const ReportDepartment = (props: Props) => {
  const { dataDepartment } = useService({});

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Báo cáo</h2>
      <div className={s.infoWrap}></div>
    </div>
  );
};

export default ReportDepartment;
