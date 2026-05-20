const appendIfMissing = (selector, createElement) => {
  const existing = document.head.querySelector(selector);
  if (existing) return existing;

  const node = createElement();
  document.head.appendChild(node);
  return node;
};

export const preloadImage = (href, options = {}) => {
  const { as = 'image', type, media, crossOrigin } = options;
  return appendIfMissing(`link[rel="preload"][href="${href}"]`, () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = href;
    if (type) link.type = type;
    if (media) link.media = media;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    return link;
  });
};

export const preloadFont = (href, options = {}) => {
  const { type = 'font/woff2', crossOrigin = 'anonymous' } = options;
  return preloadImage(href, { as: 'font', type, crossOrigin });
};

export const preloadAudio = (href, options = {}) => {
  const { type } = options;
  return preloadImage(href, { as: 'audio', type });
};
