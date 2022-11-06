
#/bin/sh
docker build -t getting-started .
docker run -dp 3000:3000 gateway
