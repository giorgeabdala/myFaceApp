#!/bin/bash
cd ./backend
npm run vitest:cov
cd ..
sonar-scanner

