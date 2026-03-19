export function getShareUrl(): string {
  return window.location.href;
}

export async function copyLink(persona: string): Promise<boolean> {
  const text = `I'm a ${persona} — discover your AI prompt persona\n${getShareUrl()}`;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function shareToTwitter(persona: string): void {
  const text = `I'm a ${persona} — discover your AI prompt persona`;
  const url = getShareUrl();
  const intentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(intentUrl, '_blank');
}

export function shareToLinkedIn(): void {
  const url = getShareUrl();
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    '_blank'
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
