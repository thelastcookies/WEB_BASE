import { notification } from 'ant-design-vue';

export const useEnvironmentCheck = () => {
  const { userAgent } = useAppStore();
  const browser = userAgent.getBrowser();
  if (
    (browser.name === 'Chrome' && Number(browser.version?.split('.')[0]) < 90)
    || (browser.name === 'Microsoft Edge' && Number(browser.version?.split('.')[0]) < 90)
    || (browser.name === 'Safari' && Number(browser.version?.split('.')[0]) < 14)
  ) {
    notification.warning({
      message: '浏览器版本过低',
      description: `当前浏览器版本过低，可能会导致页面显示不正确或功能无法正常使用。
    为了获得最佳体验，请将浏览器升级到推荐版本以上。感谢您的理解与支持。`,
      duration: 10,
    });
  }
};

