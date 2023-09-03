export enum ApiErrorCode {
    TIMEOUT = -1, // 系统繁忙
    SUCCESS = 0, // 成功
  
    USER_ID_INVALID = 10001, // 用户id无效
    PARAM_ERROR = 40001,
    OPERATE_ERROR = 40002
  }