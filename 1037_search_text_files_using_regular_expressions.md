#103.7 Search text files using regular expressions
*Weight: 2*

Candidates should be able to manipulate files and text data using regular expressions. This objective includes creating simple regular expressions containing several notational elements. It also includes using regular expression tools to perform searches through a filesystem or file content.

#Objectives

- Create simple regular expressions containing several notational elements.
- Use regular expression tools to perform searches through a filesystem or file content.


- grep
- egrep
- fgrep
- sed
- regex

## Regex
Regular expression, Regex, regexp is a pattern to describe what we want to *match* from a text. Here will discuss the form of regex which is used with the **grep** (generalized regular expression processor) command.

> There is two kind of regex in GNU grep: Basic an Extended. 

### Basic blocks
#### Adding two expressions
If you need to add (concat) two expressions, just write them after each other. 

|Regex|Will match|
|---|---|
|a|ali, mina, hamid, jadi|
|na|nasim, mina, nananana batman, mona|

#### Repeating
- The ***** means repeating the previous character for 0 or more
- The **+** means repeating the previous character for 1 or more
- the **?** means zero or one repeats
- {n,m}  The item is matched at least n times, but not more than m times

|Regex|Will match|Note|
|---|---|---|
|a*b|ab, aaab, aaaaab, aaabthis||
|a*b|b, mobser|Because there is a b here with zero **a** before it|
|a+b|ab, aab, aaabenz|wont match **sober** or **b** because there needs to be at lear one **a**|
|a?b|ab, a**ab**, b, batman (zero a then b), ...|.|

#### Alternation (\|)
If you say `a\|b` it will match a or b.

#### Character Classes
The dot (**.**) means any character. So **..** will match anything with at least two character in it. You can also create your own classes with [abc] which will match a or b or c and [a-z] which match a to z.

You can also refer to digits with \d and 
#### Ranges
There are easy ways to  commonly used classes. Named classes open with [: and close with :] 

|Range|Meaning|
|---|---|
|[:alnum:]|Alphanumeric characters|
|[:blank:]|Space and tab characters|
|[:digit:]|The digits 0 through 9 (equivalent to 0-9)|
|[:upper:] and [:lower:]|Upper and lower case letters, respectively.|
|^ (negation)|As the first character after [ in a character class negates the sense of the remaining characters|

> A common form is .* which matches any character (zero or any length). 

#### Matching specific locations
- The caret **^** means beginning of the string
- The dollar **$** means the end of the string

### Samples
- `^a.*` Matches anything that starts with a
- `^a.*b$` Matches anything that starts with a and ends with b
- `^a.*\d+.*b$` Matches anything starting with a, have some digits in the middle and end with b
- `^(l|b)oo` Matches anything starts with l or b and then have oo
- `[f-h]|[A-K]$` The last character should be f to h (capital or small)


## grep
The `grep` command can search inside the files. 

````
$ grep p friends 
payam
pedram
$ 
````

There are the most important switches:

|switch|meaning|
|---|---|
|-c|just show the count|
|-v|reverse the search|
|-n|show line numbers|
|-l|show only file names|
|-i|case insensitive|

````
$ grep p *
friends:payam
friends:pedram
what_I_have.txt:laptop	2
what_I_have.txt:pillow	5
what_I_have.txt:apple	2
$ grep p * -n
friends:12:payam
friends:15:pedram
what_I_have.txt:2:laptop	2
what_I_have.txt:3:pillow	5
what_I_have.txt:4:apple	2
$ grep p * -l
friends
what_I_have.txt
$ grep p * -c
friends:2
what_I_have.txt:3
$ 
````

> If is very common to combine grep and find: `find . -type f -print0 | xargs -0 grep -c a | grep -v ali` # find all files with **a** in them but not **ali**`

## extended grep
Extended grep is a GNU extension. It does not need the escaping and much easier. It can be used with -E option or **egrep** command which equals to `grep -E`.

## Fixed grep
If you need to search the exact string (and not interpret it as a regex), use `grep -F` or `fgrep` so the `fgrep this$` wont go for the end of the line and will find *this$that* too.

## sed
In previous lessons we saw simple `sed` usage. Here I have great news for you: **sed understands regex**! If is good to use `-r` switch to tell sed that we are using them. 

````
$ sed -r "s/^(a|b)/STARTS WITH A OR B/" friends 
STARTS WITH A OR Bmir
mina
jadi
STARTS WITH A OR Bita
STARTS WITH A OR Bli
hassan
````

Main switches:

|switch|meaning|
|---|---|
|-r|use advanced regex|
|-n|suppress output, you can use p at the end of your regex ( /something/p ) to print the output|

````
$ sed -rn "/^(a|b)/p" friends 
amir
bita
ali
````

.

.

.
.

.

.

.

.

.

.


.

.

.
