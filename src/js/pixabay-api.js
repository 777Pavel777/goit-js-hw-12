import axios from 'axios';

export async function getImg(page, query, limit) {
  const { key, baseUrl, typeImg, orientationImg, resultSearch } = {
    key: '42662363-4df458c081fe5322c3af06117',
    baseUrl: 'https://pixabay.com/api/',
    typeImg: 'photo',
    orientationImg: 'horizontal',
    resultSearch: true,
  };

  const searchLink = `${baseUrl}?key=${key}&q=${query}&image_type=${typeImg}&orientation=${orientationImg}&safesearch=${resultSearch}`;

  const { data } = await axios.get(searchLink, {
    params: {
      key: key,
      page: page,
      per_page: limit,
      q: query,
    },
  });
  return data;
}
