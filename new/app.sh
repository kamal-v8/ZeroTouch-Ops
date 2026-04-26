#!/bin/bash

errors=$(grep -c "ERROR" app.log)
INFO=$(grep -c "INFO" app.log)

echo "The no. of errors: $errors"
echo "The no. of info: $INFO"
