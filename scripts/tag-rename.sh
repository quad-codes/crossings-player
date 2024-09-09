#!/usr/bin/env bash


OLD_TAG=$(git describe --tags --abbrev=0)
NEW_TAG=$(echo $OLD_TAG | sed 's/v/version\//')

git tag $NEW_TAG $OLD_TAG
git tag -d $OLD_TAG
