function fileDate() {
  let today = new Date();

  function twoDigitify(num) {
    return (num.toString().length === 1) ? `0${num}` : num;
  }

  let year = today.getFullYear();
  let month = twoDigitify(today.getMonth() + 1);
  let day = twoDigitify(today.getDate());

  let date = `${year}-${month}-${day}`;

  return date;
}
