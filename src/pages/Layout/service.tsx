import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/slices/authSlice';

const useService = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state: RootState) => state.auth.currentUser);

  const onLogout = () => {
    dispatch(logout({}) as any);
  };
  return {
    onLogout,
    role,
  };
};

export default useService;
