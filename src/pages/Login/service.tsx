import { useDispatch } from 'react-redux';
import { saveUser, setLoading } from 'store/slices/authSlice';
import { TLoginData, TUser } from 'store/slices/type';
import { axiosClient } from 'axiosConfig/axiosClient';
import { saveToken, saveUserToLs } from 'helpers/localStorage';
import { useNavigate } from 'react-router-dom';
import MPath from 'routes/routes';
import { toast } from 'react-toastify';
import { ERole } from 'enums';

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
      toast.success('Dang nhap thanh cong !');
      if (dataUser.role === ERole.Admin) {
        return navigate(MPath.ADM_HOME);
      }
      return navigate(MPath.USER_HOME);
    } catch (err: any) {
      dispatch(setLoading(false));
      toast.error(err.response.data);
    }
  };
  return { handleLogin };
};
export default useService;
