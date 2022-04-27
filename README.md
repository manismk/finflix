# Finflix - Enhance your financial knowledge
**Finflix is a video library for finance content. Start your basic financial knowledge with finflix and keep growing your wealth.**

**Take a look at [Finflix](https://finflix.netlify.app/)**

[![Netlify Status](https://api.netlify.com/api/v1/badges/adb06124-37e8-4b24-8feb-e05f8efb1426/deploy-status)](https://app.netlify.com/sites/finflix/deploys)

---

## Table of Contents
1. [Features](#Features)
2. [Run Locally](#run-locally)
3. [Todo](#todo)
4. [Demo](#demo)
5. [Reference](#reference)
6. [Author](#author)

---

## Features

**Login** 
- User able to login by entering email and password
- User can use guest credentials to login
- Form validation is done for login fields

**Sign Up**
- User able to create account and signup for the site
- Form validation is done for signup fields

**Explore page**
- It list all the vidoes provided by finflix
- Filter videos by category using the category chips.
- search for video using the search field

**Like Feature**
- User can like/Remove like of the video in single video page
- Logged in user only can like the video
- Likeed videos page shows all the liked videos and option to remnove it from liked.

**Watchlater Feature**
- User can add/remove a video from Watch later in single video page
- Logged in user only can watchlater the video
- User can also add to watch later from video listing page
- Watchlater videos page shows all the watch later videos and option to remnove it from watch later.

**Playlist Feature**
- User can add/remove a video from playlist in single video page
- Logged in user only can add videos in playlist.
- User can also add to playlist from video listing page
- User can create a playlist using the create playlist modal
- Playlisted videos page shows all the playlist created and option to delete playlist.
- Each playlist has single page for it where it contains all the video added to that particular page and option to delete it.

**History Feature**
- When the user clicks the video from video listing page it is added to the history.
- History page shows all the videos that the user has watched.
- History page has option to remove particular video from history and clear all the videos from history

**Single Video Page**
- Single Video page has the video player from video.
- Single video page has option to like, watch later and add to playlist
- Single video page also shows the Recommended videos and more videos from the same creator.


**Profile page**
- User profile page with email id of the user
- Button to logout from the app.

**Private Routes**
- All the user specific routes are made as private routes and can be accessed only after login

**Loaders and Toasts**
- Loaders and toast is provided as the acknowledgment to the users

**Backend**
- As of now this app uses mock API as the backend, Hence the data can't be persisted on refresh. Will try to add backend in the future.


---

## Run Locally

```git
$ git clone https://github.com/manismk/finflix.git
$ cd finflix
$ npm install
$ npm start  
```

---

## Todo

- Upload video functionality
- Video count

---

## Demo

![Finflix Demo](finflix.gif)

---

## Reference

Resources that help in building Finflix includes

1. [React Js](https://reactjs.org/)
2. [React Router](https://reactrouter.com/)
3. [Google Fonts](https://fonts.google.com/)
4. [Material Icons](https://mui.com/components/material-icons/)
6. [React toastify](https://fkhadra.github.io/react-toastify/introduction)
7. [Mockbee](https://mockbee.netlify.app/)
8. [Fastart component library](https://fastart.netlify.app/)

---

## Author

- [Manikandan](https://manikandan.netlify.app/)
- [Twitter](https://twitter.com/_manismk)
- [Linkedin](https://www.linkedin.com/in/manismk/)

