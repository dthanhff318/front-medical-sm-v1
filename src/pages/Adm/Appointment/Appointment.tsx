import React, { useEffect } from 'react';
import s from './Appointment.module.scss';
import useService from './service';

const Appointment = () => {
  const { dataService } = useService();

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Cuộc họp</h2>
      <iframe src="https://example.com/meetingsdk" allow="camera; microphone"></iframe>
    </div>
  );
};
export default Appointment;
