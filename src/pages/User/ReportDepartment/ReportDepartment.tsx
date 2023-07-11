import React, { useState } from 'react';
import useService from './service';
import s from './ReportDepartment.module.scss';
import { getRoleName } from 'helpers/functions';
import { DatePicker, Form, Radio, Space } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalReport from './ModalReport';
import { useForm } from 'antd/es/form/Form';

type Props = {};

const ReportDepartment = (props: Props) => {
  const [modal, setModal] = useState<'detail' | ''>('');
  const { handleGetReport, handleExportExcel, data } = useService();
  const [form] = useForm();

  return (
    <div className={s.wrapper}>
      <ModalReport
        open={modal === 'detail'}
        listSupply={data}
        onCancel={() => setModal('')}
        handleExportExcel={handleExportExcel}
      />
      <h2 className={s.title}>Báo cáo</h2>
      <div className={s.infoWrap}>
        <Form
          initialValues={{ remember: true }}
          onFinish={(data) => {
            setModal('detail');
            handleGetReport(data);
          }}
          autoComplete="off"
          form={form}
          name="form-add"
        >
          <strong style={{ marginRight: '1rem' }}>Loại báo cáo: </strong>
          <Form.Item name="type" rules={[{ required: true, message: 'Hãy chọn loại báo cáo' }]}>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="export">Báo cáo xuất vật tư</Radio>
                <Radio value="import">Báo cáo nhập vật tư</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <strong>Chọn thời gian :</strong>
          <Form.Item
            name="timeRange"
            rules={[{ required: true, message: 'Vui long chọn khoang thoi gian' }]}
          >
            <DatePicker.RangePicker format="DD MM YY" />
          </Form.Item>
          <Form.Item>
            <CommonButton isSubmit={true}>
              <strong>Xem chi tiết</strong>
            </CommonButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ReportDepartment;
