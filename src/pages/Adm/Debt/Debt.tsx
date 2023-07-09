import * as React from 'react';
import s from './Debt.module.scss';
import useService from './service';
import { DatePicker, Input, Modal, Radio, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDetail from './ModalDetail';

export default function Debt() {
  const { debts, setTime, setStatus, setSearch } = useService();
  const [modal, setModal] = React.useState<'' | 'detail'>('');
  const [data, setData] = React.useState([]);
  const columns = [
    {
      title: 'ID',
      width: '10%',
      dataIndex: 'id',
    },
    {
      title: 'Mã hóa đơn',
      width: '20%',
      dataIndex: 'codeBill',
    },
    {
      title: 'Thời gian nhập',
      width: '20%',
      dataIndex: 'createdTime',
    },
    {
      title: 'Tổng tiền',
      width: '20%',
      dataIndex: 'totalPrice',
    },
    {
      title: 'Tình trạng',
      width: '20%',
      dataIndex: 'isDone',
    },
    {
      title: '',
      width: '10%',
      dataIndex: 'action',
      render: (_, data) => (
        <div className={s.actionBtn}>
          <CommonButton
            onClick={() => {
              setModal('detail');
              setData(data.data);
            }}
          >
            Chi tiết
          </CommonButton>
        </div>
      ),
    },
  ];

  const options = [
    { label: 'Tất cả', value: '' },
    { label: 'Đã thanh toán', value: true },
    { label: 'Chưa thanh toán', value: false },
  ];

  return (
    <div className={s.wrapper}>
      <ModalDetail open={modal === 'detail'} onCancel={() => setModal('')} data={data} />
      <h2 className={s.title}>Thông tin công nợ</h2>
      <div className={s.content}>
        <p className={s.subTitle}>Danh sách các đợt nhập vật tư gần đây:</p>
        <div className={s.filter}>
          <div className={s.filterItem}>
            <strong className={s.label}>Chọn thời gian :</strong>
            <DatePicker.RangePicker
              format="DD MM YY"
              onChange={(e: any) => {
                const startDate = e[0]?.format('DD MM YY');
                const endDate = e[1]?.format('DD MM YY');
                setTime([startDate, endDate]);
              }}
            />
          </div>
          <div className={s.filterItem}>
            <strong className={s.label}>Tình trạng :</strong>
            <Radio.Group options={options} onChange={(e) => setStatus(e.target.value)} />
          </div>
          <div className={s.filterItem}>
            <strong className={s.label}>Mã hóa đơn :</strong>
            <Input onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className={s.listDebt}>
          <Table columns={columns} dataSource={debts} />
        </div>
      </div>
    </div>
  );
}
