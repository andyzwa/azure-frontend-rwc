#!/bin/bash

set -eo pipefail

#Local appname
APP="azure-frontend-rwc"
IMAGE_TAG="latest"

#Image name in docker hub
IMAGE_NAME="u115725/$APP"

#Call and log
callAndLog() {
  echo "${1}"
  ${1}
}

#Build Image
build() {

  # build rwc
#  ng build
  ng build --configuration production

  # build image
  echo "# Building angular application and docker image ${APP}:${IMAGE_TAG}"
  callAndLog "docker build -t $APP:$IMAGE_TAG ."

}

test(){

  #run docker
  callAndLog "docker run --rm -d --name $APP -p 8000:8000 $APP"

  #check ping pong
  callUrl=http://localhost:8000/
  set +e
  countPong=$(curl -s $callUrl | grep -c "Welcome to the HomePage!")
  set -e

  #stop docker
  callAndLog "docker stop $APP"

  if (( countPong > 0 )) ; then
      echo "OK test call url: $callUrl"
      return 0
  else
      echo "ERROR test call url: $callUrl"
      return 1
  fi
}

tag() {
  echo "# Tagging image for docker hub"
  callAndLog "docker tag $APP:$IMAGE_TAG $IMAGE_NAME:$IMAGE_TAG"
}

push() {
  echo "# Pushing image -> Maybe you have to login to docker hub first: docker login"
  callAndLog "docker push $IMAGE_NAME:$IMAGE_TAG"
}


#Tag the local image and push it to docker hub
tagpush() {
  tag
  push
}

#Run the local image
run() {
  echo "run local docker call: http://localhost:8080/"
  docker run --rm -it --name $APP -p 8080:80 $APP
}


#Validate command
if ! [[ "$1" =~ ^(build|test|tag|push|tagpush|run)$ ]]; then
    echo "No valid target given, possible values: build|test|tag|push|tagpush|run"
    exit 1
fi

# call the command
$1

