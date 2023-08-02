import { useDispatch } from 'react-redux';
import { saveUser, setLoading } from 'store/slices/authSlice';
import { TLoginData, TUser } from 'store/slices/type';
import { axiosClient } from 'axiosConfig/axiosClient';
import { saveToken, saveUserToLs } from 'helpers/localStorage';
import { useNavigate } from 'react-router-dom';
import MPath from 'routes/routes';
import { toast } from 'react-toastify';
import { ERole } from 'enums';
import authApi from 'axiosConfig/api/auth';

const useService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data: TLoginData) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosClient.post('/auth/login', data);
      const { accessToken, refreshToken, ...dataUser } = res.data as any;
      console.log(dataUser);

      dispatch(saveUser(dataUser as TUser));
      saveUserToLs(dataUser);
      saveToken('accessToken', accessToken);
      saveToken('refreshToken', refreshToken);
      dispatch(setLoading(false));
      toast.success('Đăng nhập thành công!');
      console.log(dataUser.role === ERole.Admin_Staff);

      if (dataUser.role === ERole.Admin || dataUser.role === ERole.Admin_Staff) {
        return navigate(MPath.ADM_HOME);
      }
      return navigate(MPath.USER_HOME);
    } catch (err: any) {
      dispatch(setLoading(false));
      toast.error(err.response.data);
    }
  };

  const handleForgot = async (email: string) => {
    try {
      await authApi.forgotPassword(email);
      toast.success('Yêu cầu cấp lại mật khẩu thành công!');
    } catch (err) {
      toast.error('Có lỗi xảy ra!');
    }
  };
  return { handleLogin, handleForgot };
};
export default useService;
