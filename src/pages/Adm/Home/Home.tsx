import { Col, Divider, Row, Select, Table } from 'antd';
import * as React from 'react';
import s from './Home.module.scss';
import { ColumnsType } from 'antd/es/table';
import useService from './service';
import { useState } from 'react';
export interface IHomePageProps {}
type DashboardOverview = {
  totalDepartment?: number;
  totalSupplier?: number;
  totalSupply?: number;
};
const columns: any = [
  {
    title: 'Mã',
    dataIndex: 'code',
    width: 100,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    width: 250,
  },
  {
    title: 'Hoạt chất',
    dataIndex: 'ingredient',
    width: 300,
  },
  {
    title: 'ĐVT',
    dataIndex: 'unit',
    width: 100,
  },
  {
    title: 'Nhóm',
    dataIndex: 'group',
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
    width: 200,
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
    title: 'NSX',
    dataIndex: 'company',
    width: 200,
  },
  {
    title: 'Năm thầu',
    dataIndex: 'yearBidding',
    width: 200,
  },
  {
    title: 'Mã thầu',
    dataIndex: 'codeBidding',
    width: 200,
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    width: 100,
  },
];
export default function Home(props: IHomePageProps) {
  const { dataService } = useService();
  const [dateExpired, setDateExpired] = useState('30');
  // const data = [];
  const data = dataService.listSuppliesExpired?.map((list) => {
    return({...list});
  });
  const handleChange = (value: string) => {
    setDateExpired(value);
  };
  return (
    <>
      <Divider style={{ fontSize: '24px', fontWeight: '600', marginTop: '0' }} orientation="center">
        Bảng điều khiển
      </Divider>
      <Row>
        <Col style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: '600' }} span={24}>
          Thống kê
        </Col>
        <Col style={{ marginBottom: '60px' }} span={24}>
          <Row justify="space-between">
            <Col style={{ display: 'flex', justifyContent: 'center' }} span={7}>
              <div className={s.item_tatistical}>
                <div className={s.item_statistical_icon}>
                  <i
                    style={{ fontSize: '40px', color: 'rgb(0,158,251)' }}
                    className="fa-solid fa-suitcase-medical"
                  ></i>
                </div>
                <p>Số vật tư: {dataService.supply}</p>
              </div>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center' }} span={7}>
              <div className={s.item_tatistical}>
                <div className={s.item_statistical_icon}>
                  <i
                    style={{ fontSize: '32px', color: 'rgb(0,158,251)' }}
                    className="fa-solid fa-city"
                  ></i>
                </div>
                <p>Số nhà cung cấp: {dataService.supplier}</p>
              </div>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center' }} span={7}>
              <div className={s.item_tatistical}>
                <div className={s.item_statistical_icon}>
                  <i
                    style={{ fontSize: '32px', color: 'rgb(0,158,251)' }}
                    className="fa-solid fa-house"
                  ></i>
                </div>
                <p>Số khoa phòng: {dataService.department}</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24} className={s.tabledate}>
          <Row justify='center' gutter={[8, 0]}>
            <Col style={{paddingLeft: '30px'}} span={8}>
              <Select
                defaultValue="30"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: 30, label: '30' },
                  { value: 60, label: '60' },
                  { value: 90, label: '90' },
                ]}
              />
            </Col>
            <Col className={s.title} span={16}>
              Những vật tư sắp hết hạn trong {dateExpired} ngày
            </Col>
            <Col span={23}>
              <Table
                columns={columns}
                dataSource={data}
                size="middle"
                scroll={{ x: 1500, y: '46vh' }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
