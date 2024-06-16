import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  id: () => import('./dictionaries/id.json').then((module) => module.default),
  // bn: () => import('./dictionaries/bn.json').then((module) => module.default),
  // ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: keyof typeof dictionaries) => {
  return dictionaries[locale]();
};
