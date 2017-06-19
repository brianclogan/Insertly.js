# Tracking-Scripts

This script is a tracking script that allows the creation/population of form fields on all forms on a page. It takes a generic list of tracking parameters, like Google Analytics params, and inserts them into form fields.

It will do one of two things for inserting the values, it will either:

- Look for an existing field with a class set to the parameter name

_OR_

- Create a hidden form field with the name set to the parameter name.

##Installation

Installing Insertly.js is a breeze. 

CDN:

`<script src="https://js.colling.media/insertly.js"></script>`


Bower

`bower install insertly.js`