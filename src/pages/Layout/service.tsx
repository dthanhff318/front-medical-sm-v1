import authApi from 'axiosConfig/api/auth';
import { listTypes } from 'const';
import SocketContext from 'context/socketContext';
import { ERole } from 'enums';
import moment from 'moment';
import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from 'store';
import { logout, saveUser } from 'store/slices/authSlice';
import { fetchInfoCommon } from 'store/slices/commonSlice';
import { getNotis, setDataFetch } from 'store/slices/noti';

const useService = () => {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const { role, id, department, permission } = useSelector(
    (state: RootState) => state.auth.currentUser,
  );
  const { loading, notis, dataFetch, numberSeen } = useSelector((state: RootState) => state.noti);
  const { departments } = useSelector((state: RootState) => state.common);
  const { ref: notiRef, inView } = useInView();

  const onLogout = () => {
    dispatch(setDataFetch({ offset: 1, hasMore: true, firstFetch: true }));
    dispatch(logout({}) as any);
  };
  const getListNoti = async () => {
    if (role && dataFetch.hasMore) {
      try {
        const notiFor = role === ERole.Admin || role === ERole.Admin_Staff ? 'admin' : 'user';
        const dataQuery: {
          notiFor: string;
          department?: number;
        } = {
          notiFor,
        };
        if (role === ERole.User) {
          dataQuery.department = department ?? 0;
        }
        dispatch(getNotis({ ...dataQuery, offset: dataFetch.offset }) as any);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getCurrentUser = async () => {
    const res = await authApi.getCurrentUser();
    dispatch(saveUser(res.data));
  };

  useEffect(() => {
    if (dataFetch.firstFetch) {
      getListNoti();
    } else if (!dataFetch.firstFetch && inView) {
      getListNoti();
    }
  }, [inView, id]);

  useEffect(() => {
    dispatch(fetchInfoCommon({}) as any);
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (role === ERole.Admin) {
      socket?.on('sendPlan', ({ department, name, typePlan }) => {
        const findDepartment = departments.find((e) => e.id == department);
        const nameTypePlan = listTypes.find((e) => e.value === typePlan);
        toast.success(`${name} ở ${findDepartment.name} vừa gửi 1 phiếu ${nameTypePlan?.label}`);
      });
    }
  }, []);

  useEffect(() => {
    const handleShow = ({ departmentId, createdTime, typePlan }) => {
      if (department == departmentId) {
        const nameTypePlan = listTypes.find((e) => e.value == typePlan);
        const timeConvert = moment(createdTime, 'DD MMM YYYY').format('DD MM YYYY');
        toast.success(`Phiếu ${nameTypePlan?.label}, ngày ${timeConvert} vừa được duyệt`);
      }
    };
    if (role === ERole.User) {
      socket?.on('acceptTicket', handleShow);
    }
    return () => {
      socket?.off('acceptTicket', handleShow);
    };
  }, []);
  return {
    onLogout,
    role,
    notis,
    numberSeen,
    dataFetch,
    notiRef,
    loading,
    permission,
  };
};

export default useService;
