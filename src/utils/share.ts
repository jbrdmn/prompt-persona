export function getShareUrl(): string {
  return window.location.href;
}

export async function copyLink(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(getShareUrl());
    return true;
  } catch {
    return false;
  }
}

export function shareToTwitter(persona: string): void {
  const text = `I'm a ${persona} — discover your AI prompt persona`;
  const url = getShareUrl();
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

export function shareToLinkedIn(): void {
  const url = getShareUrl();
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

export async function nativeShare(persona: string): Promise<boolean> {
  if (!navigator.share) return false;
  try {
    await navigator.share({
      title: 'Prompt Persona',
      text: `I'm a ${persona} — discover your AI prompt persona`,
      url: getShareUrl(),
    });
    return true;
  } catch {
    return false;
  }
}
