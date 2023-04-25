import { useDispatch } from 'react-redux';
import { saveUser, setLoading } from 'store/slices/authSlice';
import { TLoginData, TUser } from 'store/slices/type';
import { axiosClient } from 'axiosConfig/axiosClient';
import { saveToken, saveUserToLs } from 'helpers/localStorage';
import { useNavigate } from 'react-router-dom';
import MPath from 'routes/routes';
import { toast } from 'react-toastify';

const useService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data: TLoginData) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosClient.post('/auth/login', data);
      const { accessToken, refreshToken, ...dataUser } = res.data as any;
      dispatch(saveUser(dataUser as TUser));
      saveUserToLs(dataUser);
      saveToken('accessToken', accessToken);
      saveToken('refreshToken', refreshToken);
      dispatch(setLoading(false));
      if (dataUser.isAdmin) {
        toast.success('Dang nhap thanh cong !');
        return navigate(MPath.ADM_HOME);
      }
      return navigate(MPath.ADM_ADD_SUPPLY);
    } catch (err: any) {
      dispatch(setLoading(false));
      toast.error(err.response.data);
    }
  };
  return { handleLogin };
};
export default useService;
