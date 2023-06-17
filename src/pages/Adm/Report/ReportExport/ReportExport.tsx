import { Checkbox, Col, DatePicker, Form, Input, Radio, Row } from 'antd';
import React from 'react';
import s from './ReportExport.module.scss';
import moment from 'moment';
import CommonButton from 'components/CommonButton/CommonButton';
import { useForm } from 'antd/es/form/Form';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
const ReportExport = () => {
  const [form] = useForm();
  const handleMonthChange = (dates: any) => {
    console.log(dates.map((date) => moment(date).format('DD MM YY')));
  };
  const handleAddData = (data: any) => {};
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };
  return (
    <div className={s.wapper}>
      <div></div>
      <Col className={s.title} span={24}>
        <h2>Báo cáo xuất kho chi tiết theo khoa phòng</h2>
      </Col>
      <Form
        initialValues={{ remember: true }}
        onFinish={handleAddData}
        autoComplete="off"
        form={form}
        name="form-add"
      >
        <Row gutter={[0, 0]} justify="space-around" align="bottom">
          <Col span={12}>
            <span>Chọn thời gian :</span>
            <Form.Item name="totalPrice">
              <DatePicker.RangePicker format="DD-MM-YYYY" onChange={handleMonthChange} />
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
              <Form.Item name="radio-group" className={s.selection_group}>
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                  <Row gutter={[0, 10]}>
                    <Col span={24}>
                      <Checkbox value="A">Khoa Nhi</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="B">Khoa cấp cứu</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="C">Khoa thở</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="D">Khoa thanh đần</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="E">Khoa e</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="A">Khoa Nhi</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="B">Khoa cấp cứu</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="C">Khoa thở</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="D">Khoa thanh đần</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="E">Khoa e</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="A">Khoa Nhi</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="B">Khoa cấp cứu</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="C">Khoa thở</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="D">Khoa thanh đần</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="E">Khoa e</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <span className={s.titleCheckbox}>Chọn loại vật tư</span>
              <Form.Item name="radio-group" className={s.selection_department}>
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                  <Row gutter={[0, 10]}>
                    <Col span={24}>
                      <Checkbox value="A">Khoa Nhi</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="B">Khoa cấp cứu</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="C">Khoa thở</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="D">Khoa thanh đần</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="E">Khoa e</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="A">Khoa Nhi</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="B">Khoa cấp cứu</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="C">Khoa thở</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="D">Khoa thanh đần</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="E">Khoa e</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="A">Khoa Nhi</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="B">Khoa cấp cứu</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="C">Khoa thở</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="D">Khoa thanh đần</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="E">Khoa e</Checkbox>
                    </Col>
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
