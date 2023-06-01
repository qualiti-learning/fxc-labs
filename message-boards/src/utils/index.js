export function slugify(text = '') {
  let _text = text.toLowerCase();

  return _text.replaceAll(' ', '-');
}

export function waitTimeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
