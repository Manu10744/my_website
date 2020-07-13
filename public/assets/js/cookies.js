// Reset cookies, only for dev purposes
// document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

let cookie = document.cookie;
if (cookie.indexOf('visited=', 0) == -1) {
  // Set cookie that expires after 1h
  let expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  document.cookie = "visited=1;expires=" + expiration+ ";path=/"
  
  // Show Intro screen
  const splash = document.querySelector(".splash-screen");
  splash.style.display = 'flex';
}