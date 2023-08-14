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
import ModalUserInfo from './ModalUserInfo';
import ModalChangePassword from './ModalChangePassword';

const { Header, Sider, Content } = Layout;

type Props = {
  children: JSX.Element;
};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { onLogout, role, notis, numberSeen, notiRef, loading, permission } = useService();
  const [modal, setModal] = useState<'user' | 'change-pass' | ''>('');

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p style={{ padding: '3px' }} onClick={() => setModal('user')}>
          Thông tin cá nhân
        </p>
      ),
    },
    {
      key: '2',
      label: (
        <p style={{ padding: '3px' }} onClick={() => setModal('change-pass')}>
          Đổi mật khẩu
        </p>
      ),
    },
    {
      key: '3',
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
          label: <Link to={MPath.ADM_DEBT}>Công nợ</Link>,
        },
      ],
      permision: 'admin-add',
    },
    {
      id: 2,
      icon: MedicineBoxOutlined,
      permision: 'admin-bidding',
      label: <Link to={MPath.ADM_BIDDING}>Cập nhật đấu thầu</Link>,
    },
    {
      id: 3,
      icon: SnippetsOutlined,
      permision: 'admin-store',
      label: <Link to={MPath.ADM_DEPOT}>Tổng kho</Link>,
    },
    {
      id: 4,
      icon: SnippetsOutlined,
      permision: 'admin-report',
      label: 'Báo cáo',
      children: [
        {
          label: <Link to={MPath.ADM_REPORT_EXPORT}>Xuất kho</Link>,
        },
        {
          label: <Link to={MPath.ADM_REPORT_REFUND}>Nhập kho</Link>,
        },
        {
          label: <Link to={MPath.ADM_REPORT_BIDDING}>Đấu thầu</Link>,
        },
        {
          label: <Link to={MPath.ADM_REPORT_INVENTORY}>Xuất nhập tồn</Link>,
        },
      ],
    },
    {
      id: 5,
      permision: 'admin-department',
      icon: BankOutlined,
      label: <Link to={MPath.ADM_DEPARTMENT}>Khoa phòng</Link>,
    },
    {
      permision: 'admin-ticket',
      id: 6,
      icon: CheckSquareOutlined,
      label: <Link to={MPath.ADM_LIST_TICKET}>Phiếu duyệt</Link>,
    },
    {
      id: 7,
      permision: 'admin-company',
      icon: HomeOutlined,
      label: <Link to={MPath.ADM_SUPPLIER}>Nhà cung cấp</Link>,
    },
    {
      id: 8,
      permision: 'admin-staff',
      icon: HomeOutlined,
      label: <Link to={MPath.ADM_STAFF}>Nhân viên</Link>,
    },
    {
      id: 9,
      icon: SnippetsOutlined,
      permision: 'admin-category',
      label: 'Danh mục',
      children: [
        {
          id: 1,
          label: <Link to={MPath.ADM_EXTENSION_UNIT}>Đơn vị</Link>,
        },
        {
          id: 2,
          label: <Link to={MPath.ADM_EXTENSION_GROUP}>Nhóm vật tư</Link>,
        },
      ],
    },
    {
      id: 10,
      permision: 'admin-analysis',
      icon: CheckSquareOutlined,
      label: <Link to={MPath.ADM_ANALYSIS}>Thống kê</Link>,
    },
    {
      id: 11,
      permision: 'admin-plan',
      icon: CheckSquareOutlined,
      label: <Link to={MPath.ADM_ALL_PLAN}>Dự trù</Link>,
    },
  ];

  const listSubnavUser = [
    {
      id: 1,
      icon: MedicineBoxOutlined,
      permision: 'department-add',
      label: <Link to={MPath.USER_PLAN}>Cấp mới vật tư</Link>,
    },
    {
      id: 2,
      icon: MedicineBoxOutlined,
      permision: 'department-refund',
      label: <Link to={MPath.USER_REFUND}>Hoàn trả vật tư</Link>,
    },
    {
      id: 3,
      permision: 'department-store',
      icon: MedicineBoxOutlined,
      label: <Link to={MPath.USER_STORE}>Kho lưu trữ vật tư</Link>,
    },
    {
      id: 4,
      icon: MedicineBoxOutlined,
      permision: 'department-ticket',
      label: <Link to={MPath.USER_TICKET_HISTORY}>Phiếu gửi</Link>,
    },
    {
      id: 5,
      icon: MedicineBoxOutlined,
      permision: 'department-report',
      label: <Link to={MPath.USER_REPORT}>Báo cáo</Link>,
    },
    {
      id: 6,
      icon: MedicineBoxOutlined,
      permision: '',
      label: <Link to={MPath.USER_REPORT}>Dự trù</Link>,
    },
    {
      id: 7,
      icon: MedicineBoxOutlined,
      permision: '',
      label: <Link to={MPath.USER_REPORT}>Duyệt phiếu</Link>,
    },
  ];

  const itemsAdmin: MenuProps['items'] = listSubnavAdmin.map((list: any, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(list.icon),
      label: list.label,
      disabled: role === ERole.Admin ? false : permission?.includes(list.permision) ? false : true,
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
      disabled: permission?.includes(list.permision) || !list.permision ? false : true,
      icon: React.createElement(list.icon),
      label: list.label,
    };
  });

  const [collapsed, setCollapsed] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const checkMenuByRole = (role: ERole) => {
    switch (role) {
      case ERole.Admin:
        return itemsAdmin;
      case ERole.Admin_Staff:
        return itemsAdmin;
      case ERole.User:
        return itemsUser;
      default:
        return itemsUser;
    }
  };
  return (
    <Layout className="defaultlayout-wapper">
      <ModalUserInfo open={modal === 'user'} handleCancel={() => setModal('')} />
      <ModalChangePassword open={modal === 'change-pass'} handleCancel={() => setModal('')} />
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
          items={checkMenuByRole(role ?? ERole.User)}
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
              onOpenChange={handleDropdownVisibleChange}
              overlayStyle={{
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              }}
              open={dropdownVisible}
              placement="bottomRight"
              trigger={['click']}
              dropdownRender={() => (
                <NotiMain
                  notiRef={notiRef}
                  notis={notis}
                  loading={loading}
                  onClose={closeDropdown}
                  role={role}
                />
              )}
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
