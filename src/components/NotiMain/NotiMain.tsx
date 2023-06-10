import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { replacePathParams } from 'helpers/functions';
import MPath from 'routes/routes';
import { LoadingOutlined } from '@ant-design/icons';
import { TNoti } from 'types/noti';
import notiApi from 'axiosConfig/api/noti';
import { ERole } from 'enums';
import { useDispatch } from 'react-redux';
import { markAsReadNoti } from 'store/slices/noti';

type Props = {
  notis: TNoti[];
  notiRef: (node?: Element | null | undefined) => void;
  loading: boolean;
  onClose: () => void;
  role?: string;
};

const NotiMain = ({ notis, notiRef, loading, onClose, role }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onNextTicketPage = async (e) => {
    dispatch(markAsReadNoti(e.id) as any);
    if (role && role === ERole.Admin) {
      navigate(replacePathParams(MPath.ADM_DETAIL_TICKET, { id: e.ticket.id }));
    } else {
      navigate(replacePathParams(MPath.USER_TICKET_HISTORY_DETAIL, { id: e.ticket.id }));
    }
  };

  return (
    <div className="wrapper-noti">
      {role === ERole.Admin &&
        notis.map((e) => {
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
              <div className="item-bell-icon">{e.department?.name?.split(' ')[1][0]}</div>
              <div className="item-bell-inf">
                <p className="item-bell-tittle">{e.department?.name}</p>
                <span className="item-bell-discription">Đã yêu cầu duyệt phiếu {namePlan}</span>
                <span className="item-bell-time">{e.createdTime}</span>
              </div>
            </div>
          );
        })}
      {role === ERole.User &&
        notis.map((e) => {
          const type = e.ticket?.typePlan;
          let namePlanDepartment;
          if (type === 1) {
            namePlanDepartment = 'bổ sung hao phí';
          } else if (type === 2) {
            namePlanDepartment = 'bổ sung cơ số tủ trực';
          } else if (type === 3) {
            namePlanDepartment = 'hoàn trả hao phí';
          } else if (type === 4) {
            namePlanDepartment = 'hoàn trả cơ số tủ trực';
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
              <div className="item-bell-icon">{e.department?.name?.split(' ')[1][0]}</div>
              <div className="item-bell-inf">
                <p className="item-bell-tittle">{e.department?.name}</p>
                <span className="item-bell-discription">
                  {`Phiếu ${namePlanDepartment} đã được phê duyệt`}{' '}
                </span>
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
