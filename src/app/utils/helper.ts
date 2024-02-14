export function getDate(d = '2023-12-14') {
  const date = new Date(d);
  // console.log(date.toLocaleString('default', { month: 'short' }));
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getUTCDate();
  return { year, month, day };
}

export function getTime(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return { hours, minutes };
}
export function getColorAndRating(rate: number) {
  const v = Math.round(rate);
  const colorClass = v < 4 ? 'low' : v < 8 ? 'mid' : 'high';
  let rating = rate?.toFixed(1).split('.').join('');
  rating = +rating <= 0 ? '0' : rating;
  return { rating, colorClass };
}
