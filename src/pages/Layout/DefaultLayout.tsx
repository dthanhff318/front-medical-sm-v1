import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  UsergroupAddOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Badge, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './DefaultLayout.scss';
import type { MenuProps } from 'antd';
import { MedicineBoxOutlined, HomeOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MPath from 'routes/routes';

const { Header, Sider, Content } = Layout;

type Props = {
  children: JSX.Element;
};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const [onSetting, setOnSetting] = useState(false);

  const listSubnavAdmin = [
    {
      id: 1,
      icon: HomeOutlined,
      label: <Link to={MPath.ADM_ADD_SUPPLY}>Nhập vật tư</Link>,
    },
    {
      id: 2,
      icon: MedicineBoxOutlined,
      label: <Link to={MPath.ADM_BIDDING}>Cập nhật đấu thầu</Link>,
    },
    {
      id: 3,
      icon: MedicineBoxOutlined,
      label: 'Plan',
      // children: [
      //   {
      //     label: <Link to={mPath.A_PLAN_LIST}>List Plan</Link>,
      //   },
      //   {
      //     label: <Link to={mPath.A_WAREHOUSE}>List request supply</Link>,
      //   },
      // ],
    },
    {
      id: 4,
      icon: BankOutlined,
      label: <Link to={MPath.ADM_DEPARTMENT}>Khoa phong</Link>,
    },
  ];

  const listSubnavDepartment = [
    {
      id: 1,
      icon: MedicineBoxOutlined,
      // label: <Link to={mPath.M_PLAN_CREATE}>Lập dự trù</Link>,
    },
    {
      id: 2,
      icon: MedicineBoxOutlined,
      label: 'Hoàn trả vật tư',
    },
    {
      id: 3,
      icon: MedicineBoxOutlined,
      label: 'Lấy thêm vật tư',
    },
    {
      id: 4,
      icon: MedicineBoxOutlined,
      // label: <Link to={mPath.M_WAREHOUSE}>Kho vật tư</Link>,
    },
    {
      id: 5,
      icon: MedicineBoxOutlined,
      // label: <Link to={mPath.M_STAFF}>Nhân viên</Link>,
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
  const itemsDepartment: MenuProps['items'] = listSubnavDepartment.map((list, index) => {
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
        <div className="sider-title">
          <div className="sider-logo">
            {/* <img
              className="logo-img"
              src={getPublicUrl("logo_app.png")}
              alt=""
            /> */}
          </div>
        </div>
        <Menu theme="dark" mode="inline" style={{ borderRight: 0 }} items={itemsAdmin} />
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
              <ul className="user-settings-list">{/* <li onClick={onLogout}>Logout</li> */}</ul>
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
