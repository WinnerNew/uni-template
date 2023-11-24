import config from "@/config";
/**
 * 避免测试和生产用户标识穿透
 */
export default {
  USER_TICLET: `${config.env}_USER_TICKET`,
  USER_INFO: `${config.env}_USER_INFO`,
  BG_COLOR: `${config.env}_BG_COLOR`,
};
