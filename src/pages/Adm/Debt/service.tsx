import debtApi from 'axiosConfig/api/debt';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const useService = () => {
  const nowD = new Date();
  const timeAgo = new Date(
    nowD.getFullYear() - 5,
    nowD.getMonth(),
    nowD.getDate(),
    nowD.getHours(),
    nowD.getMinutes(),
    nowD.getSeconds(),
    nowD.getMilliseconds(),
  );
  const timeFormatNow = moment(nowD).format('DD MM YY');
  const timeFormatAgo = moment(timeAgo).format('DD MM YY');
  const timeRangeDefault = [timeFormatAgo, timeFormatNow];

  const [debts, setDebts] = useState<any>([]);
  const [time, setTime] = useState<any>(timeRangeDefault);
  const [status, setStatus] = useState<string | boolean>('');
  const [search, setSearch] = useState('');

  const getListDebt = async (data) => {
    await debtApi.getListDebt(data).then((res) => {
      const convertData = res.data.map((e) => {
        const totalPrice = e.data.reduce((acc, cur) => (acc += cur.totalPrice), 0);
        return {
          ...e,
          totalPrice,
          isDone: e.isDone ? 'Đã thanh toán' : 'Chưa thanh toán',
        };
      });
      setDebts(convertData);
    });
  };

  useEffect(() => {
    getListDebt({ timeRange: time, isDone: status, search });
  }, [time, search, status]);
  return {
    setTime,
    setStatus,
    setSearch,
    debts,
  };
};

export default useService;
