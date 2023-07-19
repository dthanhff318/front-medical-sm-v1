import React from 'react';
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import styles from './style.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { TSupplyResponse } from 'types/supply';
import { SaveOutlined } from '@ant-design/icons';
type Props = {
  open: boolean;
  onCancel: () => void;
  itemSupply: TSupplyResponse;
  value: string;
  setValueSearch: (e: string) => void;
  handleUpdateSupplyStore: (data: any) => void;
};
const ModalCreateDepartment = ({
  itemSupply,
  open,
  handleUpdateSupplyStore,
  onCancel,
  value,
  setValueSearch,
}: Props) => {
  const [form] = useForm();
  const { suppliers } = useSelector((state: RootState) => state.supplier);
  const { groups, units } = useSelector((state: RootState) => state.common);

  const lossSelect = [
    { label: 'Có', value: true },
    { label: 'Không', value: false },
  ];
  const values = {
    name: itemSupply.name,
    brand: itemSupply.brand,
    code: itemSupply.code,
    codeBidding: itemSupply.codeBidding,
    company: itemSupply.company?.id,
    country: itemSupply.country,
    dateExpired: itemSupply.dateExpired,
    group: itemSupply.group?.id,
    isLoss: itemSupply.isLoss,
    ingredient: itemSupply.ingredient,
    productCode: itemSupply.productCode,
    quantity: itemSupply.quantity,
    unit: itemSupply.unit?.id,
    yearBidding: itemSupply.yearBidding,
  };
  form.setFieldsValue(values);

  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={1000}>
      <div className={styles.wrapperModal}>
        <Form
          style={{ maxWidth: 900 }}
          initialValues={{ remember: true }}
          onFinish={(data: any) => {
            handleUpdateSupplyStore({
              id: itemSupply.id,
              ...data,
              company: data.company,
            });
            onCancel();
          }}
          autoComplete="off"
          form={form}
        >
          <Row justify="space-between" gutter={[8, 0]}>
            <Col span={24}>
              <span>Tên vật tư</span>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Hoạt chất</span>
              <Form.Item
                name="ingredient"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Nhóm vật tư</span>
              <Form.Item
                name="group"
                rules={[{ required: true, message: 'Vui lòng nhập nhóm vật tư!' }]}
              >
                <Select
                  placeholder="Nhóm vật tư"
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  listHeight={200}
                  showArrow={true}
                  filterOption={false}
                  options={groups.map((e) => ({ label: e.name, value: e.id }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Hao phí</span>
              <Form.Item
                name="isLoss"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Select
                  placeholder="Chọn mức hao phí"
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  options={lossSelect}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Tên công ty</span>
              <Form.Item
                noStyle
                name="company"
                rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn nhà cung cấp"
                  value={value}
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  onSearch={setValueSearch}
                  notFoundContent={null}
                  options={suppliers.map((d) => ({
                    value: d.id,
                    label: d.name,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <span>Model</span>
              <Form.Item
                name="brand"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <span>Tên nước</span>
              <Form.Item
                name="country"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <span>Đơn vị</span>
              <Form.Item
                name="unit"
                rules={[{ required: true, message: 'Vui lòng nhập đơn vị tính!' }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn đơn vị tính"
                  value={value}
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  onSearch={setValueSearch}
                  notFoundContent={null}
                  listHeight={200}
                  options={units.map((d) => ({
                    value: d.id,
                    label: d.name,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <span>Hạn sử dụng</span>
              <Form.Item
                name="dateExpired"
                rules={[{ required: false, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <span>Lô SX</span>
              <Form.Item
                name="productCode"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <span>Mã thầu</span>
              <Form.Item
                name="codeBidding"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <span>Số lượng</span>
              <Form.Item
                name="quantity"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <div className={styles.bottom}>
            <Row>
              <Col span={6}>
                <Form.Item>
                  <CommonButton isSubmit={true}>
                    <SaveOutlined />
                    Lưu
                  </CommonButton>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCreateDepartment;
