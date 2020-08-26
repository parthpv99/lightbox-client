let setCookies = (name, value) => {
  let d = new Date();
  let maxAge = "max-age=" + (d.getSeconds() + 7 * 60 * 60 * 24);
  // "name=medium;max-age=31536000"
  document.cookie = name + "=" + value + ";" + maxAge;
};

const getCookies = function (name) {
  const cookies = decodeURIComponent(document.cookie);
  let cname = name + "=";
  let ca = cookies.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substr(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substr(cname.length);
    }
  }
  return null;
};

export { setCookies, getCookies };
