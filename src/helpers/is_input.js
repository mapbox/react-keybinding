var blacklist = {
  INPUT: true,
  SELECT: true,
  TEXTAREA: true
};

module.exports = function(event) {
  return blacklist[event.target.tagName];
};
