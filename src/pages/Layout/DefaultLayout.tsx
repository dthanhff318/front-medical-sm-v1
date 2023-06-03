import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  BankOutlined,
  SnippetsOutlined,
  FileAddOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import { Badge, Dropdown, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './DefaultLayout.scss';
import type { MenuProps } from 'antd';
import { MedicineBoxOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MPath from 'routes/routes';
import { getPublicUrl } from 'helpers/functions';
import useService from './service';
import { ERole } from 'enums';
import NotiMain from 'components/NotiMain/NotiMain';

const { Header, Sider, Content } = Layout;

type Props = {
  children: JSX.Element;
};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { onLogout, role, notis, numberSeen, notiRef, loading } = useService();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p style={{ padding: '3px' }} onClick={onLogout}>
          Đăng xuất
        </p>
      ),
    },
  ];

  const listSubnavAdmin = [
    {
      id: 1,
      icon: FileAddOutlined,
      label: 'Nhập kho',
      children: [
        {
          label: <Link to={MPath.ADM_ADD_SUPPLY}>Phiếu nhập kho</Link>,
        },
        {
          label: <Link to={MPath.ADM_ADD_SUPPLY}>Công nợ</Link>,
        },
      ],
    },
    {
      id: 2,
      icon: MedicineBoxOutlined,
      label: <Link to={MPath.ADM_BIDDING}>Cập nhật đấu thầu</Link>,
    },
    {
      id: 4,
      icon: SnippetsOutlined,
      label: 'Báo cáo',
      children: [
        {
          label: <Link to={MPath.ADM_DEPOT}>Tổng kho</Link>,
        },
        {
          label: <Link to={MPath.ADM_ADD_SUPPLY}>Công nợ</Link>,
        },
      ],
    },
    {
      id: 5,
      icon: BankOutlined,
      label: <Link to={MPath.ADM_DEPARTMENT}>Khoa phòng</Link>,
    },
    {
      id: 6,
      icon: CheckSquareOutlined,
      label: <Link to={MPath.ADM_LIST_TICKET}>Phiếu duyệt</Link>,
    },
    {
      id: 6,
      icon: HomeOutlined,
      label: <Link to={MPath.ADM_SUPPLIER}>Nhà cung cấp</Link>,
    },
  ];

  const listSubnavUser = [
    {
      id: 1,
      icon: MedicineBoxOutlined,
      label: <Link to={MPath.USER_PLAN}>Cấp mới vật tư</Link>,
    },
    {
      id: 2,
      icon: MedicineBoxOutlined,
      label: <Link to={MPath.USER_REFUND}>Hoàn trả vật tư</Link>,
    },
    {
      id: 3,
      icon: MedicineBoxOutlined,
      label: <Link to={MPath.USER_STORE}>Kho lưu trữ vật tư</Link>,
    },
  ];
  const itemsAdmin: MenuProps['items'] = listSubnavAdmin.map((list: any, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(list.icon),
      label: list.label,
      children: list.children?.map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: _.label,
        };
      }),
    };
  });
  const itemsUser: MenuProps['items'] = listSubnavUser.map((list, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(list.icon),
      label: list.label,
    };
  });

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="defaultlayout-wapper">
      <Sider className="sider-wapper" trigger={null} collapsible collapsed={collapsed}>
        <Link to={role === ERole.Admin ? MPath.ADM_HOME : MPath.USER_HOME} className="sider-title">
          <div className="sider-logo">
            <img className="logo-img" src={getPublicUrl('logobrand.png')} alt="" />
          </div>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          style={{ borderRight: 0 }}
          items={role === ERole.Admin ? itemsAdmin : itemsUser}
        />
      </Sider>
      <Layout className="site-layout default-layout-body">
        <Header className="header site-layout-background" style={{ padding: 20 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className="logo-user">
            <Dropdown
              getPopupContainer={() => {
                return document.body;
              }}
              overlayStyle={{
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              }}
              placement="bottomRight"
              trigger={['click']}
              dropdownRender={() => <NotiMain notiRef={notiRef} notis={notis} loading={loading} />}
            >
              <div className="logo-bell">
                <Badge count={numberSeen} overflowCount={100}>
                  <BellOutlined className="bell" />
                </Badge>
              </div>
            </Dropdown>
            {/* */}
            <div className="user-settings">
              <Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']}>
                <i className="fa-solid fa-user"></i>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '10px 5px 5px 10px',
            padding: '10px',
            overflowX: 'hidden',
          }}
        >
          <div className="default-layout-content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
