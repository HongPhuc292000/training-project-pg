import { values } from 'lodash';
import { ILoginParams, ILoginValidation, ISignUpValidation, ISignUpParams } from '../../models/auth';
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

// Kiểm tra xem có tồn tại giá trị trong ô hay không. Tồn tại thì trả về chuỗi rỗng
// Không thì kiểm tra field xem tên là gì nếu rồi trả về yêu cầu nhập field
export const validateField = (field: string, value: String) => {
  if(value) return '';
  let fieldRequire = '';
  switch (field){
    case 'name':
      fieldRequire = 'nameRequire';
      break;
    case 'gender':
      fieldRequire = 'genderRequire';
      break;
    case 'region':
      fieldRequire = 'regionRequire';
      break;
    case 'state':
      fieldRequire = 'stateRequire';
      break;
  }

  return fieldRequire;
}

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


// Hàm kiểm tra xem thông tin nhập thoả mãn chưa
export const validateSignUp = (values: ISignUpParams): ISignUpValidation =>{
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),
    name: validateField('name', values.name),
    gender: validateField('gender',values.gender),
    region: validateField('region',values.region),
    state: validateField('state',values.state)
  };
}