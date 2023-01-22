export function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('ul')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
