export function slugify(text = '') {
  let _text = text.toLowerCase();

  return _text.replaceAll(' ', '-');
}
