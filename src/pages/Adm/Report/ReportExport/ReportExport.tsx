import { Checkbox, Col, DatePicker, Form, Input, Radio, Row } from 'antd';
import React from 'react';
import s from './ReportExport.module.scss';
import moment from 'moment';
import CommonButton from 'components/CommonButton/CommonButton';
import { useForm } from 'antd/es/form/Form';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import useService from './service';
const ReportExport = () => {
  const [form] = useForm();
  const { departmentList, groups } = useService();
  const handleMonthChange = (dates: any) => {
    console.log(dates.map((date) => moment(date).format('DD MM YY')));
  };

  const handleSeen = (data) => {
    console.log(data);
  };

  return (
    <div className={s.wapper}>
      <Col className={s.title} span={24}>
        <h2>Báo cáo xuất kho chi tiết theo khoa phòng</h2>
      </Col>
      <Form
        initialValues={{ remember: true }}
        onFinish={handleSeen}
        autoComplete="off"
        form={form}
        name="form-add"
      >
        <Row gutter={[0, 0]} justify="space-around" align="bottom">
          <Col span={12}>
            <span>Chọn thời gian :</span>
            <Form.Item name="timeRange">
              <DatePicker.RangePicker format="DD-MM-YY" onChange={handleMonthChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <CommonButton isSubmit={true}>
                <strong>Xem</strong>
              </CommonButton>
            </Form.Item>
          </Col>

          <Row gutter={[40, 40]}>
            <Col span={12}>
              <span className={s.titleCheckbox}>Chọn khoa phòng</span>
              <Form.Item name="department" className={s.selection_department}>
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row gutter={[0, 10]}>
                    {departmentList.map((d) => (
                      <Col span={24}>
                        <Checkbox value={d.id}>{d.name}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <span className={s.titleCheckbox}>Chọn loại vật tư</span>
              <Form.Item name="group" className={s.selection_group}>
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row gutter={[0, 10]}>
                    {groups.map((g) => (
                      <Col span={24}>
                        <Checkbox value={g.id}>{g.name}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
        </Row>
      </Form>
    </div>
  );
};
export default ReportExport;
