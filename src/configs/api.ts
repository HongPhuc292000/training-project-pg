import { APIHost } from '../utils/constants';

enum APIService {
  api,
  apiAdmin,
  apiVendor,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.api) {
    return `${APIHost}/api`;
  } else if (service === APIService.apiAdmin) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.apiVendor) {
    return `${APIHost}/apiVendor`;
  }
  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.api)}/authentication/login`,
  userProfile: `${getBaseUrl(APIService.apiVendor)}/user`,
};
