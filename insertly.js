class Insertly {
    constructor() {
        this.cookieExpirationTime = 30;
        this.firstTouchAttribution = true;
        this.params = ['utm_campaign', 'utm_term', 'utm_medium', 'utm_source', 'utm_content', 'gclid', '_ga'];
        this.debugMode = false;
    }

    static init() {
        this.constructor();
        for (var i = 0; i < this.params.length; i++) {
            if (Insertly.getParameterByName(this.params[i]) !== undefined) {
                if (!Insertly.getCookie(this.params[i])) {
                    Insertly.setCookie(this.params[i], Insertly.getParameterByName(this.params[i]), this.cookieExpirationTime);
                }
                if (!this.firstTouchAttribution) {
                    Insertly.setCookie(this.params[i], Insertly.getParameterByName(this.params[i]), this.cookieExpirationTime);
                }
            }
        }
        var d = Insertly.getCookie(this.params[i]);
        if (d != null && d != 'null') {
            var forms = document.getElementsByTagName('form');
            for (a = 0; a < forms.length; a++) {
                var elem = forms[a];
                var input = document.createElement('input');
                input.type = (this.debugMode?'text':'hidden');
                input.name = this.params[i];
                input.value = d;
                elem.appendChild(input);
            }
        }
    }

    static setCookieExipirationTime(minutes) {
        this.cookieExpirationTime = minutes;
    }

    static setFirstTouchAttribution(bool) {
        this.firstTouchAttribution = bool;
    }

    static setParameters(params) {
        this.params = params;
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