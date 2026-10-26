/** Select native maps only after readiness, without overriding the current source. */
export function selectNativeAppearance({ source, skinReady = false, eyesReady = false, skinFailed = false, eyesFailed = false, disposed = false, resourceCurrent = true }) {
  if (disposed || !resourceCurrent) return { apply: false };
  if (source === 'clay') return { apply: true, skinMap: false, eyeMap: false, useSkin: false, status: 'clay' };
  return {
    apply: true, skinMap: skinReady, eyeMap: eyesReady, useSkin: true,
    status: skinFailed || eyesFailed ? 'fallback' : skinReady && eyesReady ? 'ready' : 'loading'
  };
}
