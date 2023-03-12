#!/bin/bash
cd ./backend
npm run vitest:cov
cd ..
sonar-scanner
echo "Não deixe de verificar também o deepSource: https://deepsource.io/gh/giorgeabdala/myFaceApp"

