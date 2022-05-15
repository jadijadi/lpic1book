#!/bin/bash
#cd github
make html
ghp-import output
git push origin gh-pages
