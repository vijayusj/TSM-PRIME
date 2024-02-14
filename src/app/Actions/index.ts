import { rejects } from 'assert';

// 'use server';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDBiYjBhNmJjNDY0ODQ2NDY0MmM2NjIxZjk5MGU2ZCIsInN1YiI6IjY1NzZkNzlmYzYwMDZkMDEzYzc3NGFkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n4tOsbGxReV-cxWpri5i86EdQXaLYJ4foj9evHesf60',
  },
};
const baseURL = 'https://api.themoviedb.org/3';
export async function getList(list: string, list_type: string, page = 1) {
  const movies = await fetch(
    `${baseURL}/${list}/${list_type}?language=en-US&page=${page}`,
    options
  );
  const res = await movies.json();
  // console.log(res);
  return res;
}

export async function trending(list: string, time_window = 'day') {
  const data = await fetch(
    `${baseURL}/trending/${list}/${time_window}`,
    options
  );

  const res = await data.json();
  return res;
}

export async function getSpecificDetails(list_type: string, id: string) {
  const movie = await fetch(
    `${baseURL}/${list_type}/${id}?language=en-US`,
    options
  );

  const res = await movie.json();
  return res;
}
export async function getCredits(list_type: string, id: string) {
  const credits = await fetch(`${baseURL}/${list_type}/${id}/credits`, options);
  const res = await credits.json();
  return res;
}
export async function getImages(list_type: string, id: number) {
  const data = await fetch(
    `${baseURL}/${list_type}/${id}/images`,
    options
  ).then((res) => res.json());
  if (data.backdrops?.length) {
    const random = Math.floor(Math.random() * data.backdrops.length);
    return data.backdrops[random];
  }
  return undefined;
}

export async function getDetailLists(url: string) {
  const data = await fetch(`${baseURL}/${url}`, options);

  const res = await data.json();
  return res;
}
export async function getWatchProviders(list_type: string, id: number) {
  const data = await fetch(
    `${baseURL}/${list_type}/${id}/watch/providers`,
    options
  ).then((res) => res.json());
  return data;
}
export async function getVideos(movie_id: number, list_type: string) {
  const data = await fetch(
    `${baseURL}/${list_type}/${movie_id}/videos`,
    options
  );

  const res = await data.json();

  return res.results;
}
export async function getDataByGenre(url: string) {
  try {
    const data = await fetch(url, options);

    const res = await data.json();
    // console.log(res);
    return res;
  } catch (error) {}
}
export async function getGenres(list: string) {
  const res = await fetch(`${baseURL}/genre/${list}/list`, options);
  return await res.json().then((res) => res.genres);
}
