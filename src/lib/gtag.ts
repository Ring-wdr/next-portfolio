export const GA_TRACKING_ID = process.env
  .NEXT_PUBLIC_GOOGLE_ANALYTICS as string;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

type EventProps = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: EventProps) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
