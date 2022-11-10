import axios from 'axios';

const KEY = '29839348-b0d5a68a29b9200dfb336da94';
axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['X-RateLimit-Reset'] = KEY;
export async function addMaterial(query, page) {
  // const controller = new AbortController();

  // const signal = controller.signal;

  const params = {
    key: KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: 12,
  };

  const response = await axios.get(``, {
    params,
    // signal,
  });
  const { totalHits, hits } = response.data;
  //! endOfCollection - это цифра еще НЕ ПРОСМОТРЕННЫХ элементов коллекции
  const pages = Math.ceil(totalHits / params.per_page);
  // const endOfCollection = totalHits - page * params.per_page;
  // const all = { totalHits, hits, endOfCollection };
  const all = { hits, pages, totalHits };
  // controller.abort();

  // console.log(controller);
  // console.log(signal);
  // console.log(controller.abort());
  return all;
}
