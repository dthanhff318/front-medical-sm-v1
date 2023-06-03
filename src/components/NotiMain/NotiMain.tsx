import React, { ReactNode } from 'react';
// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { replacePathParams } from 'helpers/functions';
import MPath from 'routes/routes';
import { LoadingOutlined } from '@ant-design/icons';
import { TNoti } from 'types/noti';

type Props = {
  notis: TNoti[];
  notiRef: (node?: Element | null | undefined) => void;
  loading: boolean;
};

const NotiMain = ({ notis, notiRef, loading }: Props) => {
  const navigate = useNavigate();
  const onNextTicketPage = (e) => {
    navigate(replacePathParams(MPath.ADM_DETAIL_TICKET, { id: e.ticket.id }));
  };

  return (
    <div className="wrapper-noti">
      <span></span>
      {notis.map((e) => (
        <div
          className={`item-bell ${e.seen ? '' : 'unread'}`}
          onClick={() => onNextTicketPage(e)}
          key={e.id}
          ref={e.id === notis[notis.length - 1].id ? notiRef : undefined}
        >
          <div className="item-bell-icon">H</div>
          <div className="item-bell-inf">
            <p className="item-bell-tittle">Tên khoa phòng</p>
            <span className="item-bell-discription">
              thông tin phiếu cần duyệt từ khoa phòng nào
            </span>
            <span className="item-bell-time">{e.createdTime}</span>
          </div>
        </div>
      ))}
      {loading && (
        <div className="noti-desc">
          <LoadingOutlined style={{ fontSize: '20px' }} />
        </div>
      )}
    </div>
  );
};

export default NotiMain;
