import React, { useState } from 'react';
import { Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Table } from 'antd';
import useService from './service';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import CommonButton from 'components/CommonButton/CommonButton';
import styles from './style.module.scss';
import moment from 'moment';

const columns: any = [
  {
    title: 'Tên vật tư',
    width: 250,
    dataIndex: 'name',
    fixed: 'left',
  },
  {
    title: 'Hoạt chất',
    width: 150,
    dataIndex: 'ingredient',
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
    width: 100,
  },
  {
    title: 'Nhóm',
    dataIndex: 'group',
    width: 250,
  },
  {
    title: 'Tên hãng',
    dataIndex: 'brand',
    width: 200,
  },
  {
    title: 'Tên nước',
    dataIndex: 'country',
    width: 150,
  },
  {
    title: 'Hạn sử dụng',
    dataIndex: 'dateExpired',
    width: 150,
  },
  {
    title: 'Lô SX',
    dataIndex: 'codeProduct',
    width: 150,
  },
  {
    title: 'Mã thầu',
    dataIndex: 'codeBidding',
    width: 150,
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    width: 100,
  },
  {
    title: 'Đơn giá',
    dataIndex: 'unitPrice',
    width: 150,
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'totalPrice',
    width: 150,
  },
  {
    title: '',
    fixed: 'right',
    width: 100,
    render: (_, record: any) => (
      <CommonButton danger onClick={() => console.log(record)}>
        Xóa
      </CommonButton>
    ),
  },
];

const AddSupply: React.FC = () => {
  const [formSubmit] = useForm();
  const [form] = useForm();
  const { suppliers } = useSelector((state: RootState) => state.supplier);
  const { findBidding } = useSelector((state: RootState) => state.bidding);

  const [dataAdd, setDataAdd] = useState<any>([]);
  const [value, setValue] = useState<string>('');
  const [selectCompany, setSelectCompany] = useState<string>('');
  const [selectSupply, setSelectSupply] = useState<any>('');
  const {} = useService({ value, selectCompany });

  const handleSelectCompany = (id: string) => {
    setSelectCompany(id);
  };

  const handleSelectSupply = (id: string) => {
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
  const handleAddData = (data: any) => {
    const dateExp = form.getFieldValue('dateExpired');
    const convertDate = dateExp ? moment(dateExp).format('MMM Do YY') : '';
    setDataAdd([...dataAdd, { ...data, name: selectSupply.name, dateExpired: convertDate }]);
  };

  const handleSubmit = (data: any) => {
    console.log(data);
    const dataBill = {
      supplier: selectCompany,
      codeBill: formSubmit.getFieldValue(''),
    };
  };
  return (
    <div className={styles.wapper}>
      <Divider style={{ marginTop: '0px' }}>Bảng Phiếu nhập vật tư</Divider>
      <Form
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
        form={formSubmit}
        name="form-submit"
      >
        <Row gutter={[8, 0]}>
          <Col span={12} style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <span>Nhà cung cấp</span>
            <Form.Item
              noStyle
              name="company"
              rules={[{ required: true, message: 'Vui long chọn nhà cung cấp' }]}
            >
              <Select
                showSearch
                value={value}
                placeholder="Chọn nhà cung cấp"
                style={{ width: '100%' }}
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                onSearch={(e) => setValue(e)}
                onChange={(e) => handleSelectCompany(e)}
                notFoundContent={null}
                options={
                  value
                    ? suppliers.map((d) => ({
                        value: d.id,
                        label: d.name,
                      }))
                    : []
                }
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <span>Mã hóa đơn</span>
            <Form.Item
              noStyle
              name="codeBill"
              rules={[{ required: true, message: 'Hãy điền mã hóa đơn!' }]}
            >
              <Input style={{ marginBottom: '10px' }} />
            </Form.Item>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <span>---</span>
            <Form.Item>
              <CommonButton isSubmit={true}>Nhập kho</CommonButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        bordered
        columns={columns}
        dataSource={dataAdd}
        size="middle"
        scroll={{ x: 'max-content', y: '500px' }}
      />
      <div className={styles.control}>
        <Form
          initialValues={{ remember: true }}
          onFinish={handleAddData}
          autoComplete="off"
          form={form}
          name="form-add"
        >
          <Row gutter={[8, 0]}>
            <Col span={12}>
              <span>Tên vật tư</span>
              <Form.Item noStyle name="name">
                <Select
                  showSearch
                  value={value}
                  placeholder="Nhap ten vat tu"
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  onSearch={(e) => setValue(e)}
                  onChange={(e) => handleSelectSupply(e)}
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
              <span>Nước SX</span>
              <Form.Item noStyle name="country">
                <Input style={{ marginBottom: '10px' }} readOnly />
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
                  // max={selectSupply ? Number(selectSupply.remainCount) : 1}
                  // type="number"
                  // disabled={Number(selectSupply?.remainCount) ? false : true}
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
              <Form.Item noStyle name="dateExpired">
                <DatePicker defaultValue={undefined} style={{ marginBottom: '10px' }} />
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
                  <CommonButton isSubmit={true}>Thêm vào bảng</CommonButton>
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
