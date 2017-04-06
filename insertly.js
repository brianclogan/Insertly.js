//How many days until the cookie expires?
var cookieExpirationTime = 30;
//Do you want to overwrite the cookies if they already exist? (first touch vs last touch)
var firstTouchAttribution = true;
//The parameters from the URL, or cookie names you want to grab
var params = [
  'utm_campaign',
  'utm_term',
  'utm_medium',
  'utm_source',
  'utm_content',
  'gclid',
  '_ga'
];
/////////
// DO NOT MODIFY ANYTING BELOW THIS LINE
/////////
for (i = 0; i < params.length; i++) {
  if(getParameterByName(params[i]) !== undefined) {
    if(!getCookie(params[i])) {
      setCookie(params[i], getParameterByName(params[i]), cookieExpirationTime);
    }
    if(!firstTouchAttribution) {
      setCookie(params[i], getParameterByName(params[i]), cookieExpirationTime);
    }
  }
  var d = getCookie(params[i]);
  if(d != null && d != 'null') {
  	var forms = document.getElementsByTagName('form');
    for(a = 0; a < forms.length; a++) {
    	var elem = forms[a];
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = params[i];
      input.value = d;
      elem.appendChild(input);
    }
  }
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
