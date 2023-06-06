import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { replacePathParams } from 'helpers/functions';
import MPath from 'routes/routes';
import { LoadingOutlined } from '@ant-design/icons';
import { TNoti } from 'types/noti';
import notiApi from 'axiosConfig/api/noti';

type Props = {
  notis: TNoti[];
  notiRef: (node?: Element | null | undefined) => void;
  loading: boolean;
  onClose: () => void;
};

const NotiMain = ({ notis, notiRef, loading, onClose }: Props) => {
  const navigate = useNavigate();
  const onNextTicketPage = async (e) => {
    await notiApi.markAsSeenNoti([e.id]);
    navigate(replacePathParams(MPath.ADM_DETAIL_TICKET, { id: e.ticket.id }));
  };
  return (
    <div className="wrapper-noti">
      <span></span>
      {notis.map((e) => {
        const type = e.ticket?.typePlan;
        let namePlan;
        if (type === 1) {
          namePlan = 'bổ sung hao phí';
        } else if (type === 2) {
          namePlan = 'bổ sung cơ số tủ trực';
        } else if (type === 3) {
          namePlan = 'hoàn trả hao phí';
        } else if (type === 4) {
          namePlan = 'hoàn trả cơ số tủ trực';
        }
        return (
          <div
            className={`item-bell ${e.seen ? '' : 'unread'}`}
            onClick={() => {
              onNextTicketPage(e);
              onClose();
            }}
            key={e.id}
            ref={e.id === notis[notis.length - 1].id ? notiRef : undefined}
          >
            <div className="item-bell-icon">H</div>
            <div className="item-bell-inf">
              <p className="item-bell-tittle">{e.department?.name}</p>
              <span className="item-bell-discription">Đã yêu cầu duyệt phiếu {namePlan}</span>
              <span className="item-bell-time">{e.createdTime}</span>
            </div>
          </div>
        );
      })}
      {loading && (
        <div className="noti-desc">
          <LoadingOutlined style={{ fontSize: '20px' }} />
        </div>
      )}
    </div>
  );
};

export default NotiMain;
