#!/bin/bash


apt-get update
apt-get upgrade -y
apt-get install -y mc net-tools curl ca-certificates


# python
# apt-get install -y python3 build-essential libssl-dev libffi-dev python3-dev python3-venv


# docker
apt-get upgrade -y docker-compose


# node
wget -q -O- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

nvm install --lts
nvm use --lts

npm i -g --update npm
npm i -g nest-cli
npm i -g pnpm