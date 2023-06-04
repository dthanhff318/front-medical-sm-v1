import notiApi from 'axiosConfig/api/noti';
import { ERole } from 'enums';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/slices/authSlice';
import { TNoti } from 'types/noti';

const useService = () => {
  const dispatch = useDispatch();
  const { role, id } = useSelector((state: RootState) => state.auth.currentUser);
  const { ref: notiRef, inView } = useInView();
  const [notis, setNotis] = useState<TNoti[]>([]);
  const [numberSeen, setNumberSeen] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataFetch, setDataFetch] = useState<{
    offset: number;
    hasMore: boolean;
    firstFetch: boolean;
  }>({
    offset: 1,
    hasMore: true,
    firstFetch: true,
  });

  const onLogout = () => {
    dispatch(logout({}) as any);
  };
  const getListNoti = async () => {
    if (role && dataFetch.hasMore) {
      try {
        setLoading(true);
        const notiFor = role === ERole.Admin ? 'admin' : 'user';
        const res = await notiApi.getNotis({ notiFor, offset: dataFetch.offset });
        const { listNoti, unread, isHasMore } = res.data;
        if (dataFetch.firstFetch) {
          setDataFetch({
            firstFetch: false,
            hasMore: isHasMore,
            offset: dataFetch.offset + 1,
          });
        } else {
          setDataFetch({
            ...dataFetch,
            hasMore: isHasMore,
            offset: dataFetch.offset + 1,
          });
        }
        setNotis([...notis, ...listNoti]);
        setNumberSeen(unread);
        setLoading(false);
      } catch (err) {
        setLoading(false);
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
