import { ERole } from 'enums';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/slices/authSlice';
import { getNotis } from 'store/slices/noti';

const useService = () => {
  const dispatch = useDispatch();
  const { role, id } = useSelector((state: RootState) => state.auth.currentUser);
  const { loading, notis, dataFetch, numberSeen } = useSelector((state: RootState) => state.noti);
  const { ref: notiRef, inView } = useInView();

  const onLogout = () => {
    dispatch(logout({}) as any);
  };
  const getListNoti = async () => {
    if (role && dataFetch.hasMore) {
      try {
        const notiFor = role === ERole.Admin ? 'admin' : 'user';
        dispatch(getNotis({ notiFor, offset: dataFetch.offset }) as any);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (dataFetch.firstFetch) {
      getListNoti();
    } else if (!dataFetch.firstFetch && inView) {
      getListNoti();
    }
  }, [inView, id]);

  return {
    onLogout,
    role,
    notis,
    numberSeen,
    dataFetch,
    notiRef,
    loading,
  };
};

export default useService;
