export const fireAnalytics = (
  category: string,
  label: string,
  action: string
): void => {
  window.gtag('event', `${action}`, {
    event_category: `${category}`,
    event_label: `${label}`,
  });
};
