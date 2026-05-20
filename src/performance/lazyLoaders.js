export const lazyImport = async (importFn) => {
  if (typeof importFn !== 'function') {
    throw new Error('lazyImport expects a function that returns an import promise.');
  }

  const module = await importFn();
  return module?.default ?? module;
};

export const loadMinigame = () =>
  lazyImport(() => import('../features/minigame/Minigame.jsx'));
