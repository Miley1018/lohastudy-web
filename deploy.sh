#!/bin/bash
ssh -t kingo@lohastudy.com 'cd lehuo/web;rm -rf node_modules;git checkout package-lock.json;git pull && npm i && node ./node_modules/webpack/bin/webpack.js && cp -r style dist/'&& echo success
