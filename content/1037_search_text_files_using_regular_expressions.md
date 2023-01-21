Title: 103.7 Search text files using regular expressions
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
sortorder: 180


_Weight: 3_

Candidates should be able to manipulate files and text data using regular expressions. This objective includes creating simple regular expressions containing several notational elements as well as understanding the differences between basic and extended regular expressions. It also includes using regular expression tools to perform searches through a filesystem or file content.


## Objectives

* Create simple regular expressions containing several notational elements.
* Understand the differences between basic and extended regular expressions.
* Understand the concepts of special characters, character classes, quantifiers, and anchors.
* Use regular expression tools to perform searches through a filesystem or file content.
* Use regular expressions to delete, change and substitute text.

* grep
* egrep
* fgrep
* sed
* regex(7)

### Regex

Regular expression, Regex, regex is a pattern to describe what you want to _match_ from a text. For example `a` and `ad` both matches `jadi`. `d.` is a _deeper_ example because `.` means _anything_ so `d.` will match the last two characters of `jadi`. In this section, we will cover the *grep** \(generalised regular expression processor\) command. It has different regex _dialect_; in short Basic regex and Extended regex.

#### Regex basics

**Simple match**
You can simply write down whatever you want to match and regex will search for that.

| Regex | Will match |
| :--- | :--- |
| a | after, mina, banana, jadi |
| na | Narator, mina, nananana batman, sonar |

</br>

**Repeating**

* The **`\*`** means repeating the previous character 0 or more times.
* The **`+`** means repeating the previous character 1 or more times.
* the **`?`** means zero or one repeats.
* **`{n,m}`** means the item needs to match at least n times, but not more than m times.

| Regex | Will match | Note |
| :--- | :--- | :--- |
| a\*b | ab, aaab, aaaaab, aaabthis |  |
| a\*b | b, sober | we should have zero or more `a`s and then a `b` |
| a+b | ab, aab, aaabenz | wont match **sober** or **b** because there needs to be at least one **a** |
| a?b | ab, a**ab**, b, batman \(zero a then b\), ... | . |

</br>

**Alternation \(\|\)**

If you say `a|b` it will match `a` or `b`.

</br>

**Character Classes**

The dot \(**`.`**\) means any character. So **`..`** will match anything with at least two characters in it. You can also create your classes with \[abc\] which will match a or b or c and \[a-z\] which match a to z.

You can also refer to digits with \d. 

> regex is case-sensitive.

**Ranges**

There are shorthands for commonly used classes. Named classes to start with `[:` and end with `:]`.

| Range | Meaning |
| :--- | :--- |
| \[:alnum:\] | Alphanumeric characters |
| \[:blank:\] | Space and tab characters |
| \[:digit:\] | The digits 0 through 9 \(equivalent to 0-9\) |
| \[:upper:\] and \[:lower:\] | Upper and lower case letters, respectively. |
| ^ \(negation\) | As the first character after \[ in a character class negates the sense of the remaining characters |

> A common used regex is .\* which matches any character \(zero or any length\).

**Matching at specific locations**

* The caret **`^`** means beginning of the string.
* The dollar **`$`** means the end of the string.

#### Samples

* `^a.*` Matches anything that starts with **a**.
* `^a.*b$` Matches anything that starts with **a** and ends with **b**.
* `^a.*\d+.*b$` Matches anything that starting with **a**, have some digits in the middle and ends with **b**.
* `^(l|b)oo` Matches anything that starts with **l** or **b** and then have **oo**
* `[f-h]|[A-K]$` The last character should be **f** to **h** \(small\) or **A** to **K** \(capital\)

### grep

The `grep` command can search inside the files.

```text
$ grep funk words 
Garfunkel
Garfunkel's
funk
funked
funkier
funkiest
funking
funk's
funks
funky

```

These are the most common switches:

| switch | meaning |
| :--- | :--- |
| -c | just show the count |
| -v | reverse the search |
| -n | show line numbers |
| -l | show only file names |
| -i | case insensitive |
| -r | Read  all  files  under each directory, recursively |

</br>

```
$ grep a *txt
friends.txt:Rosha
friends.txt:Xavier
friends.txt:Krishna
friends.txt:Mary
my_thinkgs.txt:laptop
$ grep z *txt
$ grep z *txt -i 
friends.txt:Zee
$ grep x words -i -c 
2264
$ grep z *txt -i -l
friends.txt
$ grep Z *txt -v
friends.txt:Rosha
friends.txt:Jim
friends.txt:Xavier
friends.txt:Krishna
friends.txt:Mary
my_thinkgs.txt:laptop
my_thinkgs.txt:pillow
my_thinkgs.txt:shorts
my_thinkgs.txt:t-shirt
$ grep Z friends.txt -v
Rosha
Jim
Xavier
Krishna
Mary
$ 
```

As another example, let's search all the `/etc` for all files containing an IP address and send the errors (mostly "you do not have permission to read this") to `/dev/null`:

```
$ egrep -r "192.168.(1|0)." /etc/ 2> /dev/null
/etc/privoxy/config:#      address 192.168.0.1 on your local private network
/etc/privoxy/config:#      (192.168.0.0) and has another outside connection with a
/etc/privoxy/config:#        listen-address  192.168.0.1:8118
/etc/avahi/hosts:# 192.168.0.1 router.local
/etc/dhcp/dhclient-exit-hooks.d/rfc3442-classless-routes:#   new_rfc3442_classless_static_routes='24 192 168 10 192 168 1 1 8 10 10 17 66 41'
/etc/dhcp/dhclient-exit-hooks.d/rfc3442-classless-routes:#   192.168.10.0/24 via 192.168.1.1
/etc/hosts:192.168.1.22 atiteltestbed
/etc/hosts:192.168.100.244 adpsms
/etc/ppp/options:# ms-dns 192.168.1.1
/etc/ppp/options:# ms-dns 192.168.1.2
/etc/ppp/options:# ms-wins 192.168.1.50
/etc/ppp/options:# ms-wins 192.168.1.51
/etc/ssl/openssl.cnf:# proxy = # set this as far as needed, e.g., http://192.168.1.1:8080
/etc/cups/cups-browsed.conf:# BrowseAllow 192.168.1.12
/etc/cups/cups-browsed.conf:# BrowseAllow 192.168.1.0/24
/etc/cups/cups-browsed.conf:# BrowseAllow 192.168.1.0/255.255.255.0
/etc/cups/cups-browsed.conf:# BrowseDeny 192.168.1.13
/etc/proxychains4.conf:## Exclude connections to 192.168.1.0/24 with port 80
/etc/proxychains4.conf:# localnet 192.168.1.0:80/255.255.255.0
/etc/proxychains4.conf:## Exclude connections to 192.168.100.0/24
/etc/proxychains4.conf:# localnet 192.168.100.0/255.255.255.0
/etc/proxychains4.conf:# localnet 192.168.0.0/255.255.0.0
/etc/proxychains4.conf:#	 	socks4	192.168.1.49	1080
/etc/sane.d/kodakaio.conf:#net 192.168.1.2 0x4041
/etc/sane.d/kodakaio.conf:#net 192.168.1.17 0x4067
/etc/sane.d/epsonds.conf:# net 192.168.1.123
/etc/sane.d/airscan.conf:#"Kyocera MFP Scanner" = http://192.168.1.102:9095/eSCL
/etc/sane.d/airscan.conf:#ip    = 192.168.0.1    ; blacklist by address
/etc/sane.d/airscan.conf:#ip    = 192.168.0.0/24 ; blacklist the whole subnet
/etc/sane.d/dell1600n_net.conf:#named_scanner: 192.168.0.20
/etc/sane.d/epson2.conf:# net 192.168.1.123
/etc/sane.d/magicolor.conf:# net 192.168.0.1
/etc/sane.d/saned.conf:#192.168.0.1
/etc/sane.d/saned.conf:#192.168.0.1/29
/etc/fwupd/redfish.conf:# ex: https://192.168.0.133:443
```

### Extended grep
Regex is cool and `grep` is awesome so many people have tried adding to them or inventing their variants. One is GNU Extended grep. This dialect of regex, does not need much escaping and you can use it via `-E` switch or using `egrep` instead of the normal `grep`. For example, `|` in an extended regex means "or". So you can do a `egrep "a|b" words` to match anything with an `a` or a `b`. 

### Fixed grep

If you need to search for exact strings \(and not interpret it as a regex\), use `grep -F` or `fgrep` so the `fgrep this$` won't go for the end of the line and will find _this$that_ instead.

### sed

In previous lessons, we saw simple `sed` usage and now I have great news for you: **sed understands regex**! You can use `-r` switch to tell sed that we are using regexes.

```
$ sed -r "s/(Z|R|J)/starts with ZRJ/" friends.txt 
starts with ZRJee
starts with ZRJosha
starts with ZRJim
Xavier
Krishna
Mary
```

Common switches:

| switch | meaning |
| :--- | :--- |
| -r | use advanced regex |
| -n | suppress output, you can use p at the end of your regex \( /something/p \) to print the output |

</br>

```
sed -rn "s/happy/HAPPY/p" words 
HAPPY
slapHAPPY
unHAPPY
```

Still eager to learn? See how you can solve the Wordle using regexes:

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZbdTghkVM_4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
