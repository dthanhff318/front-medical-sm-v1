import React, { useState } from 'react';
import { Checkbox, Col, DatePicker, Form, Row } from 'antd';
import s from './ReportRefund.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { useForm } from 'antd/es/form/Form';
import useService from './service';
import { listTypePlanImport } from 'const';
import reportApi from 'axiosConfig/api/report';
import ModalReportImport from './ModalReportImport';

type TModal = '' | 'delete' | 'create';
const DEPARTMENT = 'department';
const TYPE_PLAN = 'typePlan';
const GROUP = 'group';

const ReportRefund = () => {
  const [form] = useForm();
  const [openModal, setOpenModal] = useState<TModal>('');
  const [listSupplyImport, setListSupplyImport] = useState<any>([]);

  const { departmentList, groups, handleExportExcel } = useService();
  const handleSeen = async (data) => {
    const timeRange = data.timeRange.map((time) => time.format('DD MM YY'));
    const res = await reportApi.getDataImport({ ...data, timeRange });
    setOpenModal('create');
    setListSupplyImport(res.data);
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
      <ModalReportImport
        listSupplyImport={listSupplyImport}
        open={openModal === 'create'}
        onCancel={() => setOpenModal('')}
        handleExportExcel={handleExportExcel}
      />
      <Col className={s.title} span={24}>
        <h2>Báo cáo nhập xuat ton</h2>
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
                <strong>Xem chi tiết</strong>
              </CommonButton>
            </Form.Item>
          </Col>

          <Row gutter={[40, 40]}>
            <Col span={8}>
              <span className={s.titleCheckbox}>Chọn loại phiếu</span>
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
export default ReportRefund;
