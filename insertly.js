class Insertly {

    constructor() {
        this.cookieExpirationTime = 0;
        this.firstTouchAttribution = false;
        this.params = ['utm_campaign', 'utm_term', 'utm_medium', 'utm_source', 'utm_content', 'gclid', '_ga', 'msclid'];
        this.debugMode = false;
    }

    init() {
        //Cycle through all of the params in the this.params array
        for (let i = 0; i < this.params.length; i++) {
            //Detect if the parameter is in the URL
            if (Insertly.getParameterByName(this.params[i]) !== undefined || Insertly.getParameterByName(this.params[i] !== null || Insertly.getParameterByName(this.params[i] !== ''))) {
                //A cookie doesn't exist for this parameter
                if (!Insertly.getCookie(this.params[i])) {
                    //Set cookie for new parameter
                    Insertly.setCookie(this.params[i], Insertly.getParameterByName(this.params[i]), this.cookieExpirationTime);
                }
                //Last touch attribution
                if (!this.firstTouchAttribution) {
                    //Create cookie every time if the parameter exists in the URL
                    Insertly.setCookie(this.params[i], Insertly.getParameterByName(this.params[i]), this.cookieExpirationTime);
                }
            }
            //Get the value from the cookie
            const d = Insertly.getCookie(this.params[i]);
            if (d !== null && d !== 'null') {
                const forms = document.getElementsByTagName('form');
                for (let a = 0; a < forms.length; a++) {
                    const elem = forms[a];
                    const fields = elem.children;
                    let create = true;
                    for(let c = 0; c < fields.length; c++) {
                        if(fields[c].tagName === 'INPUT' || fields[c].tagName === 'SELECT' || fields[c].tagName === 'TEXTAREA') {
                            if((' ' + fields[c].className + ' ').indexOf(' ' + this.params[i] + ' ') > -1) {
                                fields[c].value = d;
                                create = false;
                            }
                        }
                    }
                    if(create) {
                        if(this.debugMode) {
                            elem.appendChild(document.createElement('br'));
                        }
                        const input = document.createElement('input');
                        input.type = (this.debugMode ? 'text' : 'hidden');
                        input.name = this.params[i];
                        input.value = d;
                        elem.appendChild(input);
                    }
                }
            }
        }
    }

    addParameter(name) {
        if(name === Array) {
            for(let i = 0; i < name.length; i++) {
                this.params.push(name[i]);
            }
        } else {
            this.params.push(name);
        }
    }

    removeParameter(name) {
        const index = this.params.indexOf(name);
        if(index > -1) {
            this.params.splice(index, 1);
        }
    }

    static getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    static setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = (exdays===0?0:"expires=" + d.toUTCString());
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    static getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }
}