# Blog.aliwaseem.com

[![Build Status](https://travis-ci.org/awaseem/blog-api.svg?branch=master)](https://travis-ci.org/awaseem/blog-api)

A place to share my random thoughts. (Now with more redux!)

## Setup

To setup clone the repo:
```
git clone https://github.com/awaseem/blog.aliwaseem.com
```
Install and build dependencies:
```
npm install; npm run deploy
```
Start the development server:
```
npm run watch
```

## Changing RESTful server

You can start your own blog-api server from the following repo: https://github.com/awaseem/blog-api and change the endpoints in src/config/endpoints.js to point to the new blog-api server:

```
...
let baseURL = "NEW_API_URL";
...
```
