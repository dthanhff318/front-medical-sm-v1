import React, { useEffect } from 'react';
import s from './Appointment.module.scss';
import useService from './service';

const Appointment = () => {
  const { dataService } = useService();

  useEffect(() => {}, []);

  return (
    <div className={s.plantWrapper}>
      <h2 className={s.title}>Danh sach du tru</h2>
    </div>
  );
};
export default Appointment;
