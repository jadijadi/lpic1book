#!/bin/bash
#cd github
make html
ghp-import output
git push origin gh-pages


# for ebook, replace <iframe .*/iframe> with <img src="/images/videoplaceholder.jpg" width=650px > on lpic1_book.html in output and print to PDF
