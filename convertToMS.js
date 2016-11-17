module.exports = (string) => {
  if (!string.match(/[\d{2}:\d{2}]/)) {
    return 'Invalid Time';
  } else {
    var arr = string.split(':');
    var time = (+arr[0] * 3600000) + (+arr[1] * 60000);
    return time;
  }
}