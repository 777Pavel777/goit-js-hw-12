export function createMarkup(images, domElem) {
  const markupImg = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="image-search">
        <a href="${largeImageURL}">
        <img class="gallery-img" src="${webformatURL}" alt="${tags}"/>
        </a>
        <ul class="img-info">
          <li class="img-items">
            <p class="img-value"><span class="img-subtitle">Likes</span>${likes}</p>
            <p class="img-value"><span class="img-subtitle">Views</span>${views}</p>
            <p class="img-value"><span class="img-subtitle">Comments</span>${comments}</p>
            <p class="img-value"><span class="img-subtitle">Downloads</span>${downloads}</p>
          </li>
        </ul>
      </li>`;
      }
    )
    .join('');
  domElem.insertAdjacentHTML('beforeend', markupImg);
}
