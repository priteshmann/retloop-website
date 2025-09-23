export const GA_TRACKING_ID = 'G-RN0WD74NFZ'

export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = (action: string, parameters: any) => {
  window.gtag('event', action, parameters)
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}