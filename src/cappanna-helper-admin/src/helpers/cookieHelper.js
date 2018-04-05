class CookieHelper {
    read(nomeCookie) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(nomeCookie + "=");

    if (start !== -1) {
      start = start + nomeCookie.length + 1;
      let end = document.cookie.indexOf(";",start);
      
      if (end === -1) {
          end = document.cookie.length;
      }

      return unescape(document.cookie.substring(start, end));
    }
  }
  return "";
}
}

export default CookieHelper;