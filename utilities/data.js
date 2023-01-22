const certificate = (data) => {
  data = String(data);
  if (data > 999 && data < 1000000) {
    return `${data[0]}K+`;
  } else if (data > 999999 && data < 1000000000) {
    return `${data[0]}M+`;
  } else if (data > 999999999) {
    return `${data[0]}B+`;
  } else if (data > 999999999999 && data < 1000000000000) {
    return `${data[0]}T+`;
  }
  return data;
};

const testTaken = (colorblind, visualeyes) => {
  const data = String(colorblind + visualeyes);
  if (data > 999 && data < 1000000) {
    return `${data[0]}K+`;
  } else if (data > 999999 && data < 1000000000) {
    return `${data[0]}M+`;
  } else if (data > 999999999) {
    return `${data[0]}B+`;
  } else if (data > 999999999999 && data < 1000000000000) {
    return `${data[0]}T+`;
  }
  return data;
};

module.exports = {
  certificate,
  testTaken,
};
