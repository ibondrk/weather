export function getDate(incommingDate) {
  const modifiedDate = incommingDate.split('-');

  return new Date(+modifiedDate[0], +modifiedDate[1] - 1, +modifiedDate[2])
    .toLocaleString('uk', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
    .split(' ');
}
