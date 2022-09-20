const oneHour = 3600000;
const oneDay = 86400000;
const twoDay = 172800000;
// const timeZoneOffset = 19800000;

function getMonth(month) {
  let mon;
  switch (month) {
    case 0:
      mon = "Jan";
      break;
    case 1:
      mon = "Feb";
      break;
    case 2:
      mon = "Mar";
      break;
    case 3:
      mon = "Apr";
      break;
    case 4:
      mon = "May";
      break;
    case 5:
      mon = "Jun";
      break;
    case 6:
      mon = "Jul";
      break;
    case 7:
      mon = "Aug";
      break;
    case 8:
      mon = "Sep";
      break;
    case 9:
      mon = "Oct";
      break;
    case 10:
      mon = "Nov";
      break;
    case 11:
      mon = "Dec";
      break;
    default:
      mon = "Invalid Month";
  }
  return mon;
}
// function getMonth(month) {
//   let mon;
//   switch (month) {
//     case 0:
//       mon = "January";
//       break;
//     case 1:
//       mon = "February";
//       break;
//     case 2:
//       mon = "March";
//       break;
//     case 3:
//       mon = "April";
//       break;
//     case 4:
//       mon = "May";
//       break;
//     case 5:
//       mon = "June";
//       break;
//     case 6:
//       mon = "July";
//       break;
//     case 7:
//       mon = "August";
//       break;
//     case 8:
//       mon = "September";
//       break;
//     case 9:
//       mon = "October";
//       break;
//     case 10:
//       mon = "November";
//       break;
//     case 11:
//       mon = "December";
//       break;
//     default:
//       mon = "Invalid Month";
//   }
//   return mon;
// }

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

const beautifiedDate = (date) => {
  const currentDate = new Date().valueOf();
  const targetDate = new Date(date);
  let diff = currentDate - targetDate.valueOf();
  let ans;
  if (diff < oneHour) {
    ans = diff / 1000;
    ans = ans / 60;
    ans = Math.round(ans);
    if (ans === 0) {
      return "now";
    }
    return `${ans} min. ago`;
  } else if (diff > oneHour && diff <= oneDay) {
    ans = diff / 1000;
    ans = ans / 3600;
    ans = Math.round(ans);
    return `${ans} hr. ago`;
  } else if (diff > oneDay && diff <= twoDay) {
    return `Yesterday`;
  } else {
    let month = getMonth(targetDate.getMonth());
    return `${month} ${targetDate.getDate()}, ${targetDate.getFullYear()}`;
  }
};

const formatAMPM = (date) => {
  const targetDate = new Date(date);
  var hours = targetDate.getHours();
  var minutes = targetDate.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = targetDate.getDate() + " " + getMonth(targetDate.getMonth()) + " " + hours + ":" + minutes + " " + ampm ;
  return strTime;
};

const getDate = (date) => {
  const targetDate = new Date(date);
  const currentDate = new Date();
  var dt =
    targetDate.getDate() +
    " - " +
    targetDate.getMonth() +
    " - " +
    targetDate.getFullYear();
  let diff = currentDate - targetDate.valueOf();
  if (diff < oneDay) return "Today";
  else if (diff > oneDay && diff <= twoDay) return "Yesterday";
  else return dt;
};

export { setCookies, getCookies, beautifiedDate, formatAMPM, getDate };
