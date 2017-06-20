# Tracking-Scripts

This script is a tracking script that allows the creation/population of form fields on all forms on a page. It takes a generic list of tracking parameters, like Google Analytics params, and inserts them into form fields.

It will do one of two things for inserting the values, it will either:

- Look for an existing field with a class set to the parameter name

_OR_

- Create a hidden form field with the name set to the parameter name.

## Installation

Installing Insertly.js is a breeze. 

CDN:
```
<script src="https://js.colling.media/insertly.js"></script>
```


Bower:
```
bower install insertly.js
```

NPM:
```
npm install insertly.js
```

Yarn:
```
yarn install insertly.js
```


## Setup

### Quick and Dirty
```
a = new Insertly();
a.init();
```

### Options

##### First Touch Attribution
```
a = new Insertly()
a.firstTouchAttribution = true; //default: false
a.init();
```

First Touch Attribution, while set to true, it will only look for the variables ONE TIME per cookie lifetime. If the cookie exists, it won't overwrite it. If set to false, anytime the parameters are in the URL, it will create the cookies.

##### Cookie Expiration Time
```
a = new Insertly()
a.cookieExpirationTime = 30; //default: 0
a.init();
```

Cookie Expiration Time is how many **_days_** you would like the cookies to survive. For instance, if you set it to 10, the cookies will expire in 10 days, unless they are re-written by the script.

**NOTE:** Setting this to 0 will make the cookies session only, meaning when they close the browser, the cookies delete.

##### Debug Mode
```
a = new Insertly()
a.debugMode = true; //default: false
a.init();
```

Debug mode creates the form fields, but leaves them visible, meaning you can read the information in them, allowing you to see what exactly the passing variables could be.

**DO NOT LEAVE DEBUG MODE ON WHEN RUNNING SCRIPT ON A PRODUCTION SITE&**


### Functions

These functions must be called before the `init()` function.

##### Adding a parameter
```
a = new Insertly()
a.addParameter("fbid"); //Accepts strings
a.addParameter(["fbid", "cid", "bingID", "userid"]); //OR arrays
a.init();
```
Adding extra paramters to track is easy to do, you can just use the function `addParamter()` to add extra ones to look for. You can pass a string, or an array via this function to add to the parameter list.

##### Removing a parameter
```
a = new Insertly()
a.removeParameter("fbid");
a.init();
```
If we are tracking a parameter by default that you do **NOT** want to track, you can remove them easily by passing the string in the `removeParameter()` function. This function ONLY accepts strings.