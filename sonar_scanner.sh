#!/bin/bash
#cd ./backend
#npm run vitest:cov
#cd ..
sonar-scanner  -X -Dsonar.projectKey=MyFace   -Dsonar.sources=./backend,./frontend -Dsonar.host.url=http://192.168.0.100:9000   -Dsonar.login=sqp_a2b030a6a58cb8a4942174695df8af6bfcad6486

