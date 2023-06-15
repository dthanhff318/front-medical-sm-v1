import { Col, Divider, Row, Table } from 'antd';
import * as React from 'react';
import s from './Home.module.scss';
import { ColumnsType } from 'antd/es/table';
import useService from './service';
export interface IHomePageProps {}
type DashboardOverview = {
  totalDepartment?: number;
  totalSupplier?: number;
  totalSupply?: number;
};
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'Mã',
    width: 60,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Tên vật tư',
    width: 200,
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Đơn vị',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Lô SX',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Số lượng',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Đơn giá',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Số tiền',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    width: 100,
    render: () => <a>action</a>,
  },
];
export default function Home(props: IHomePageProps) {
  const { dataService } = useService();
  const data: DataType[] = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      key: i,
      name: ` ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
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
          <Row justify="center" gutter={[8, 0]}>
            <Col className={s.title} span={23}>
              Những vật tư sắp hết hạn trong tháng 6 năm 2023
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
