#!/bin/bash

if [ -z "$1" ]
  then
    echo "\033[31mError: No argument supplied\033[0m"
    exit 1
fi

migration_name="$(date +%s)_${1}"

mkdir -p migrations/$migration_name

touch migrations/$migration_name/up.sql
touch migrations/$migration_name/down.sql