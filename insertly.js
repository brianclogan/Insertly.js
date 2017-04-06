class Insertly {
    private cookieExpirationTime;
    private firstTouchAttribution;
    private params;
    private debug = false;

    constructor(expirationTime = 30, firstTouch = true, params = ['utm_campaign', 'utm_term', 'utm_medium', 'utm_source', 'utm_content', 'gclid', '_ga']) {
        this.cookieExpirationTime = expirationTime;
        this.firstTouchAttribution = firstTouch;
        this.params = params;
        this.debug = debug;
    }
    public start() {
        for (i = 0; i < params.length; i++) {
            if (Insertly.getParameterByName(params[i]) !== undefined) {
                if (!Insertly.getCookie(params[i])) {
                    Insertly.setCookie(params[i], Insertly.getParameterByName(params[i]), cookieExpirationTime);
                }
                if (!firstTouchAttribution) {
                    Insertly.setCookie(params[i], Insertly.getParameterByName(params[i]), cookieExpirationTime);
                }
            }
        }
        var d = Insertly.getCookie(params[i]);
        if (d != null && d != 'null') {
            var forms = document.getElementsByTagName('form');
            for (a = 0; a < forms.length; a++) {
                var elem = forms[a];
                var input = document.createElement('input');
                input.type = (this.debug?'text':'hidden');
                input.name = params[i];
                input.value = d;
                elem.appendChild(input);
            }
        }
    }
    public debug(status) {
        this.debug = status;
    }

    static getParameterByName(name, url) {
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
    static setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    static getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
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
}