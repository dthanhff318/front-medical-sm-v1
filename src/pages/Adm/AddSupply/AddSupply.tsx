import React, { useState } from 'react';
import { Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Table } from 'antd';
import useService from './service';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import CommonButton from 'components/CommonButton/CommonButton';
import styles from './style.module.scss';
import moment from 'moment';
import { toast } from 'react-toastify';

const AddSupply: React.FC = () => {
  const [formSubmit] = useForm();
  const [form] = useForm();
  const { suppliers } = useSelector((state: RootState) => state.supplier);
  const { findBidding } = useSelector((state: RootState) => state.bidding);

  const [dataAdd, setDataAdd] = useState<any>([]);
  const [value, setValue] = useState<string>('');
  const [selectCompany, setSelectCompany] = useState<string>('');
  const [selectSupply, setSelectSupply] = useState<any>('');
  const { handleAddSupplyToStore, loading } = useService({ value, selectCompany });

  const rulesValidate = [
    {
      required: true,
      validator: (_, value) => {
        const quantityBiddingRemain = form.getFieldValue('biddingCount');
        if (!value) {
          return Promise.reject(new Error('Vui lòng nhập số lượng hợp lệ'));
        }
        if (value > quantityBiddingRemain) {
          return Promise.reject(new Error('Vui lòng nhập số lượng không vượt quá số lượng thầu'));
        }
        return Promise.resolve();
      },
    },
  ];

  const handleSelectCompany = (id: string) => {
    setSelectCompany(id);
    setDataAdd([]);
    form.resetFields();
  };

  const handleSelectSupply = (id: string) => {
    const supply = findBidding.find((d) => d.id === id);
    setSelectSupply(supply);
    form.setFieldsValue({
      ingredient: supply.ingredient,
      code: supply.code,
      group: supply.group.name,
      isLoss: supply.isLoss ? 'Có' : 'Không',
      brand: supply.brand,
      company: supply.company.name,
      country: supply.country,
      biddingPrice: supply.biddingPrice,
      biddingCount: supply.biddingCount,
      unit: supply.unit.name,
      codeBidding: supply.codeBidding,
      yearBidding: supply.yearBidding,
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
    const price = form.getFieldValue('price');
    const productCode = form.getFieldValue('productCode');
    const convertDate = dateExp ? moment(dateExp.$d).format('MM DD YY') : '';
    const isLoss = form.getFieldValue('isLoss') === 'Có' ? true : false;
    const group = selectSupply.group;
    const unit = selectSupply.unit;
    const company = selectSupply.company;
    const checkExist = dataAdd.find((d) => d.name === selectSupply.name);
    if (checkExist) {
      const incQuantity = dataAdd.map((e) =>
        e.name === selectSupply.name ? { ...e, quantity: e.quantity + data.quantity } : e,
      );
      setDataAdd(incQuantity);
      return;
    }
    setDataAdd([
      ...dataAdd,
      {
        ...data,
        name: selectSupply.name,
        dateExpired: convertDate,
        unitPrice: price,
        productCode,
        isLoss,
        group,
        unit,
        company,
      },
    ]);
    form.resetFields();
  };

  const handleSubmit = (info: { company: number; codeBill: string }) => {
    if (!dataAdd.length) {
      toast.warning('Yêu cầu điền vật tư cần nhập');
      return;
    }
    const dataBill = {
      ...info,
      add: dataAdd.map((e) => ({
        ...e,
        group: e.group.id,
        unit: e.unit.id,
        company: e.company.id,
      })),
    };
    handleAddSupplyToStore(dataBill);
    form.resetFields();
    formSubmit.resetFields();
    setDataAdd([]);
  };

  const deleteSupply = (name: string) => {
    const remainDataAdd = dataAdd.filter((d) => d.name !== name);
    setDataAdd(remainDataAdd);
  };

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
      title: 'Hao phí',
      dataIndex: 'isLoss',
      width: 100,
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'company',
      width: 200,
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
      dataIndex: 'productCode',
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
      dataIndex: 'price',
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
        <CommonButton danger onClick={() => deleteSupply(record.name)}>
          Xóa
        </CommonButton>
      ),
    },
  ];
  console.log(dataAdd);

  return (
    <div className={styles.wapper}>
      <h2 className={styles.title}>Phiếu nhập kho</h2>
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
                options={suppliers.map((d) => ({
                  value: d.id,
                  label: d.name,
                }))}
                listHeight={250}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <span>Mã hóa đơn</span>
            <Form.Item
              name="codeBill"
              rules={[{ required: true, message: 'Hãy điền mã hóa đơn!' }]}
            >
              <Input style={{ marginBottom: '10px' }} />
            </Form.Item>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <span>---</span>
            <Form.Item>
              <CommonButton isSubmit={true} loading={loading}>
                Nhập kho
              </CommonButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        bordered
        columns={columns}
        dataSource={dataAdd.map((e) => ({
          ...e,
          company: e.company.name,
          unit: e.unit.name,
          group: e.group.name,
          isLoss: e.isLoss ? 'Có' : 'Không',
        }))}
        size="middle"
        scroll={{ x: 'max-content', y: '500px' }}
        rowKey="name"
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
              <Form.Item name="name">
                <Select
                  showSearch
                  value={value}
                  placeholder="Nhập tên vật tư để tìm"
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  onSearch={(e) => setValue(e)}
                  onChange={(e) => handleSelectSupply(e)}
                  notFoundContent={null}
                  options={findBidding.map((d) => ({
                    value: d.id,
                    label: d.name,
                  }))}
                  listHeight={250}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Hoạt chất</span>
              <Form.Item name="ingredient">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={3}>
              <span>Mã</span>
              <Form.Item name="code">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Nhóm</span>
              <Form.Item name="group">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={4}>
              <span>Hao phí</span>
              <Form.Item name="isLoss">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Hãng sản xuất</span>
              <Form.Item name="brand">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={5}>
              <span>Nước SX</span>
              <Form.Item name="country">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>

            <Col span={4}>
              <span>Số lượng</span>
              <Form.Item name="quantity" rules={rulesValidate}>
                <InputNumber
                  min={1}
                  style={{ marginBottom: '10px', width: '100%' }}
                  onChange={handleChangeQuantity}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <span>Số lượng thầu</span>
              <Form.Item name="biddingCount">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={4}>
              <span>Đơn vị</span>
              <Form.Item name="unit">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={4}>
              <span>Lô SX</span>
              <Form.Item
                name="productCode"
                rules={[{ required: true, message: 'Điền lô sản xuất' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Mã thầu</span>
              <Form.Item name="codeBidding">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Năm thầu</span>
              <Form.Item name="yearBidding">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col
              span={6}
              style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}
            >
              <span>Ngày hết hạn</span>
              <Form.Item name="dateExpired">
                <DatePicker defaultValue={undefined} style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col
              span={6}
              style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}
            >
              <span>Giá vật tư</span>
              <Form.Item name="price" rules={[{ required: true, message: 'Vui long dien !' }]}>
                <InputNumber
                  type="number"
                  style={{ marginBottom: '10px', width: '100%' }}
                  onChange={handleChangePrice}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Tổng tiền</span>
              <Form.Item name="totalPrice">
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
