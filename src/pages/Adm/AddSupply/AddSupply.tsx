import React, { useState } from 'react';
import { Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Table } from 'antd';
import { Button, Radio, Space } from 'antd';
import type { SpaceSize } from 'antd/es/space';
import type { ColumnsType } from 'antd/es/table';
import styles from './style.module.scss';
import ModalAddSupply from './ModalAddSupply';
import useService from './service';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import CommonButton from 'components/CommonButton/CommonButton';

type TModal = '' | 'delete' | 'create';
const columns: any = [
  {
    title: 'STT',
    width: 60,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

const AddSupply: React.FC = () => {
  const [form] = useForm();
  const { findBidding, findLoading } = useSelector((state: RootState) => state.bidding);
  const [value, setValue] = useState<string>('');
  const {} = useService({ value });
  const [selectSupply, setSelectSupply] = useState<any>(null);
  const handleSelect = (id: string) => {
    const supply = findBidding.find((d) => d.id === id);
    setSelectSupply(supply);
    form.setFieldsValue({
      ingredient: supply.ingredient,
      code: supply.code,
      group: supply.group,
      brand: supply.brand,
      company: supply.company,
      country: supply.country,
      biddingPrice: supply.biddingPrice,
      biddingCount: supply.biddingCount,
      unit: supply.unit,
      codeBidding: supply.codeBidding,
    });
  };
  const handleChangeQuantity = (e) => {
    const cost = form.getFieldValue('price');
    form.setFieldValue('totalPrice', e * cost);
  };

  const handleChangePrice = (e) => {
    const quantity = form.getFieldValue('quantity');
    form.setFieldValue('totalPrice', e * quantity);
  };
  return (
    <div className={styles.wapper}>
      <Divider style={{ marginTop: '0px' }}>Bảng Phiếu nhập vật tư</Divider>
      <Table columns={columns} dataSource={[]} size="middle" scroll={{ x: 1500, y: 300 }} />
      <div className={styles.control}>
        <Form
          initialValues={{ remember: true }}
          onFinish={(data: any) => {
            console.log(1);
            console.log(data);
            form.resetFields();
          }}
          autoComplete="off"
          form={form}
        >
          <Row gutter={[8, 0]}>
            <Col
              span={12}
              style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}
            >
              <span>Tên vật tư</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten vat tu' }]}
              >
                <Select
                  showSearch
                  value={value}
                  placeholder="Nhap ten vat tu"
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  onSearch={(e) => setValue(e)}
                  onChange={(e) => handleSelect(e)}
                  notFoundContent={null}
                  options={
                    value
                      ? findBidding.map((d) => ({
                          value: d.id,
                          label: d.name,
                        }))
                      : []
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Hoạt chất</span>
              <Form.Item noStyle name="ingredient">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Nhóm</span>
              <Form.Item noStyle name="group">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Hãng sản xuất</span>
              <Form.Item noStyle name="brand">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Nhà cung cấp</span>
              <Form.Item noStyle name="company">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Nước SX</span>
              <Form.Item noStyle name="country">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={4}>
              <span>Mã hóa đơn</span>
              <Form.Item
                noStyle
                name="codeBill"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <span>Mã</span>
              <Form.Item noStyle name="code">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>

            <Col span={4}>
              <span>Số lượng</span>
              <Form.Item
                noStyle
                name="quantity"
                rules={[{ required: true, message: 'Vui long dien so luong can nhap' }]}
              >
                <InputNumber
                  min={1}
                  max={selectSupply ? Number(selectSupply.remainCount) : 1}
                  type="number"
                  disabled={Number(selectSupply?.remainCount) ? false : true}
                  style={{ marginBottom: '10px', width: '100%' }}
                  onChange={handleChangeQuantity}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <span>Số lượng thầu</span>
              <Form.Item noStyle name="biddingCount">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={4}>
              <span>Đơn vị</span>
              <Form.Item noStyle name="unit">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={4}>
              <span>Lô SX</span>
              <Form.Item
                noStyle
                name="productCode"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Mã thầu</span>
              <Form.Item noStyle name="codeBidding">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col
              span={6}
              style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}
            >
              <span>Ngày hết hạn</span>
              <Form.Item
                noStyle
                name="dateExprired"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <DatePicker onChange={() => {}} style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>

            <Col
              span={6}
              style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}
            >
              <span>Giá vật tư</span>
              <Form.Item
                noStyle
                name="price"
                rules={[{ required: true, message: 'Vui long dien !' }]}
              >
                <InputNumber
                  type="number"
                  style={{ marginBottom: '10px', width: '100%' }}
                  onChange={handleChangePrice}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Tổng tiền</span>
              <Form.Item noStyle name="totalPrice">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className={styles.bottom}>
                <Form.Item>
                  <CommonButton onClick={() => console.log(1)} isSubmit={true}>
                    Tạo phiếu nhập
                  </CommonButton>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddSupply;
