import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  BankOutlined,
  SnippetsOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { Badge, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './DefaultLayout.scss';
import type { MenuProps } from 'antd';
import { MedicineBoxOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MPath from 'routes/routes';
import { getPublicUrl } from 'helpers/functions';
import useService from './service';
import { ERole } from 'enums';

const { Header, Sider, Content } = Layout;

type Props = {
  children: JSX.Element;
};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { onLogout, role } = useService();
  const [onSetting, setOnSetting] = useState(false);

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
      icon: BankOutlined,
      label: <Link to={MPath.ADM_PLAN}>Phiếu duyệt</Link>,
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
            {/* <Select
              defaultValue={languageUser}
              style={{ width: 120 }}
              onChange={handleChangeLanguage}
              options={[
                {
                  value: "vn",
                  label: (
                    <>
                      <img className="language-flag" src={vnFlag} alt="" />
                      <span>Việt Nam</span>
                    </>
                  ),
                },
                {
                  value: "en",
                  label: (
                    <>
                      <img className="language-flag" src={enFlag} alt="" />
                      <span>English</span>
                    </>
                  ),
                },
              ]}
            ></Select> */}
            <div className="logo-bell">
              <Badge count={99} overflowCount={10}>
                <BellOutlined className="bell" />
              </Badge>
            </div>
            <div className="user-settings" onClick={() => setOnSetting((prev) => !prev)}>
              <i className="fa-solid fa-user"></i>
            </div>
            {onSetting && (
              <ul className="user-settings-list">
                <li onClick={onLogout}>Logout</li>
              </ul>
            )}
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
