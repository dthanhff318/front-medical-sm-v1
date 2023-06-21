import React from 'react';
import { Checkbox, Col, DatePicker, Form, Row } from 'antd';
import moment from 'moment';
import s from './ReportExport.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { useForm } from 'antd/es/form/Form';
import useService from './service';
import { listTypePlanImport } from 'const';
import reportApi from 'axiosConfig/api/report';

const DEPARTMENT = 'department';
const TYPE_PLAN = 'typePlan';
const GROUP = 'group';

const ReportExport = () => {
  const [form] = useForm();
  const { departmentList, groups } = useService();
  const handleSeen = async (data) => {
    const timeRange = data.timeRange.map((time) => time.format('DD MM YY'));
    const res = await reportApi.getDataReport({ ...data, timeRange });
    console.log(res);
  };

  const handleSelectAll = (e, fieldName: string) => {
    const isChecked = e.target.checked;
    let dataSet: number[];
    switch (fieldName) {
      case DEPARTMENT:
        dataSet = departmentList.map((d) => (d.id as number) ?? []);
        break;
      case TYPE_PLAN:
        dataSet = listTypePlanImport.map((t) => (t.value as number) ?? []);
        break;
      case GROUP:
        dataSet = groups.map((d) => (d.id as number) ?? []);
        break;
      default:
        dataSet = [];
    }
    form.setFieldValue(fieldName, isChecked ? dataSet : []);
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
            <strong>Chọn thời gian :</strong>
            <Form.Item
              name="timeRange"
              rules={[{ required: true, message: 'Vui long chọn khoang thoi gian' }]}
            >
              <DatePicker.RangePicker format="DD MM YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <CommonButton isSubmit={true}>
                <strong>Xem chi tiet</strong>
              </CommonButton>
            </Form.Item>
          </Col>

          <Row gutter={[40, 40]}>
            <Col span={8}>
              <span className={s.titleCheckbox}>Chọn khoa phòng</span>
              <div className={s.selectAllBtn} onChange={(e) => handleSelectAll(e, DEPARTMENT)}>
                <Checkbox>Chon tat ca</Checkbox>
              </div>
              <Form.Item
                name="department"
                className={s.selection_department}
                rules={[{ required: true, message: 'Vui long chọn khoa pohng' }]}
              >
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
            <Col span={8}>
              <span className={s.titleCheckbox}>Chọn loai phieu</span>
              <div className={s.selectAllBtn} onChange={(e) => handleSelectAll(e, TYPE_PLAN)}>
                <Checkbox>Chon tat ca</Checkbox>
              </div>
              <Form.Item
                name="typePlan"
                className={s.selection_group}
                rules={[{ required: true, message: 'Vui long chọn loai phieu' }]}
              >
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row gutter={[0, 10]}>
                    {listTypePlanImport.map((g) => (
                      <Col span={24}>
                        <Checkbox key={g.value} value={g.value}>
                          {g.label}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <span className={s.titleCheckbox}>Chọn loại vật tư</span>
              <div className={s.selectAllBtn} onChange={(e) => handleSelectAll(e, GROUP)}>
                <Checkbox>Chon tat ca</Checkbox>
              </div>
              <Form.Item
                name="group"
                className={s.selection_group}
                rules={[{ required: true, message: 'Vui long chọn loai vat tu' }]}
              >
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
