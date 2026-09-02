type UmamiTrack = (
  name: string,
  data?: Record<string, string | number | boolean>,
) => void

declare global {
  interface Window {
    umami?: { track: UmamiTrack }
  }
}

export function track(name: string, data?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return
  window.umami?.track(name, data)
}
