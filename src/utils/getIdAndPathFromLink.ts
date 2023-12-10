export interface IdAndPath {
  path: string;
  id: string;
}

export function getIdAndPathFromLink(link: string): IdAndPath | null {
  const match = link.match(/\/fundraising\/([^/]+)/);

  if (match && match[1]) {
    const path = '/fundraising';
    const id = match[1];
    return {path, id};
  }

  return null;
}
