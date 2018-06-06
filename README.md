# collaborator-comments
> A Vue.js project for iSchool Capstone 2018


## Overview

UW’s Institute for Health Metrics and Evaluation (IHME) is an organization that works to diagnose global health problems and find solutions. To accomplish this mission, IHME leads the Global Burden of Disease (GBD) study which acts as a tool to quantify health data across countries so that everyone can live healthier lives no matter where they live. The findings of these studies are used by the UN, the World Health Organization, and by policymakers around the world to make investment decisions. For their publications, IHME gathers feedback from a network of collaborators around the world. 

The problem is that the triaging process takes around 3 weeks per paper because each paper receives up to 4,000 comments and there are only 2 people to triage them. We have created a platform that consolidates multiple applications into a central location that utilizes automatic tagging and intelligent triaging to process large sets of comment data quickly. 

## Contents

/build
- Optimized build and production ready code

/config
- Configuration files for webpack

/server
- Server side source code (Node.js)

/src
- Frontend source code (Vue.js)

/static
- Static files

## Summary of Major Technology Decisions

Our system contains integrations with Wufoo, Google Sheet and Slack because IHME already uses these tools for their business needs.
For the frontend, there were many frameworks to choose from (React, Angular, Vue), but we ultimately decided on Vue not only its small size and two-way communication, but also as a learning opportunity to expand our developer toolkit. 
For the backend, we decided to use Node.js because we need to integrate with other tools such as Google API and the package manager npm does a great job at specifying and installing project dependencies. In addition, Javascript is easy to get hands on(compare to a Go or PHP server). After handing off our work to IHME IT team, it would be easier and faster for them to start working on it.

## Contact Information

Joyce Huang, Developer, jhuang3@uw.edu  
Christy Lu, Developer, hyl9@uw.edu  
Aisha Toulegenova, UX Designer, aisha1@uw.edu  

## Link to working product
https://youtu.be/HH-BNZeIVas



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
