import { useDispatch } from 'react-redux';
import { login } from 'store/slices/authSlice';
import { TLoginData } from 'store/slices/type';

const useService = () => {
  const dispatch = useDispatch();
  const handleLogin = (data: TLoginData) => {
    dispatch(login(data) as any);
  };
  return { handleLogin };
};
export default useService;
