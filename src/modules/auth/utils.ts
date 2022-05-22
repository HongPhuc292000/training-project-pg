import { values } from 'lodash';
import { ILoginParams, ILoginValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils/index';

// Kiểm tra email nếu chưa nhập trả về emailRequire nếu nhập ko đúng định dạng trả về emailInvalid
// còn không thì trả về chuối rỗng
const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }
  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }
  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }
  if (password.length < 6) {
    return 'minPasswordInvalid';
  }
  return '';
};

export const validateRepeatPassword = (password: string, repeatPassword: string) => {
  if (!repeatPassword) {
    return 'passwordRequire';
  }
  if (password !== repeatPassword) {
    return 'matchPasswordInvalid';
  }
  return '';
};

// Hàm kiểm tra xem thông tin nhập thoả mãn chưa
export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

// Hàm kiểm tra xem thông tin nhập vào có trong API hay không
export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};