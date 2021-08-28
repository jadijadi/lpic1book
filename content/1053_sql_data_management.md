Title: 105.3 Removed!
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
Topic: Shells and Shell Scripting

How luckY! this is removed. If you insist this used to be the old text:
## 105.3 SQL data management

_Weight: 2_

Candidates should be able to query databases and manipulate data using basic SQL commands. This objective includes performing queries involving joining of 2 tables and/or subselects.

#### Key Knowledge Areas

* Use of basic SQL commands
* Perform basic data manipulation

#### Terms and Utilities

* insert
* update
* select
* delete
* from
* where
* group by
* order by
* join

### Databases

This module is about SQL language and MySQL is one of the many SQL databases. For this lesson, a database consists of some **table**s and each table has some **row**s and **filed**s. Lets have a look. In this lesson we are not going to _create_ or _design_ databases. You only need to have a general understanding of databases \(SQL databases\) and know some command to use \(read query or update or add to them\). The database I'm going to use in this lesson is called `lpic` and has two tables `contact` and `info`.

### mysql command line

As I said, we are not goint to learn the `mysql` here, we only need to focus on `SQL` as a query language. You only need to know that `mysql` is a command line program to ineteractivly connect to a `mysql-server`. I use it like this:

```text
$ mysql -u root -p
```

which means I'm going to use `u`ser root and will provide a password. It was also possible to say:

```text
$ mysql -u root -p mypass lpic
```

to provide the pass on command line \(not a good idea for security reasons!\) and tell mysql program to connect to `lpic` database when it starts.

#### using a database

When you connect to a database, you have to use the `use` command to select which database you are going to issue commands on. Normally a database server \(say mysql\) can have 100s of different databases in it, each for one user or program.

```text
jadi@funlife:~$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 17
Server version: 5.6.25-0ubuntu0.15.04.1 (Ubuntu)

Copyright (c) 2000, 2015, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| bad                |
| good               |
| lpic               |
| mysql              |
| performance_schema |
| ugly               |
+--------------------+
7 rows in set (0.00 sec)

mysql> USE LPIC;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> SHOW TABLES;
+----------------+
| Tables_in_lpic |
+----------------+
| info           |
| phonebook      |
+----------------+
2 rows in set (0.00 sec)
```

As you can see `mysql` is friendly and shows lovely tables! I've told her to `use lpic` and then `show tables` and now I know that I have two tables: info & phonebook.

> Note: it is common to type MYSQL commands in CAPITAL LETTERS and names and values and .. in lower case.

### SELECT

`SELECt` is obvious! It selects from a table. When we are not sure what field we are looking for, we can select `*` to get all fields.

```text
mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  |                  | 0935secret     |
+--------+------------------+----------------+
4 rows in set (0.00 sec)
```

or ask for a specific field:

```text
mysql> SELECT name FROM phonebook;
+--------+
| name   |
+--------+
| jadi   |
| nasrin |
| sina   |
| haale  |
+--------+
3 rows in set (0.00 sec)
```

### WHERE

You can add _conditions_ to your SQL queries using `WHERE`. Lets have a look at the other table we have:

```text
mysql> SELECT * FROM info;
+--------+--------+--------+-------+
| name   | height | weight | mood  |
+--------+--------+--------+-------+
| jadi   |    180 |     74 | happy |
| sina   |    175 |     81 | happy |
| nasrin |    174 |     68 | happy |
| mina   |    171 |     59 | sad   |
+--------+--------+--------+-------+
4 rows in set (0.00 sec)
```

What if we only wanted to see our _happy_ friends?

```text
mysql> SELECT * FROM info WHERE mood = 'happy';
+--------+--------+--------+-------+
| name   | height | weight | mood  |
+--------+--------+--------+-------+
| jadi   |    180 |     74 | happy |
| sina   |    175 |     81 | happy |
| nasrin |    174 |     68 | happy |
+--------+--------+--------+-------+
3 rows in set (0.00 sec)

mysql>
```

Dont be afraid for _mina_, we will make her happy later but for now we need to see the friends who are happy and more than 80Kg.

```text
mysql> SELECT * FROM info WHERE mood = 'happy' AND weight >= 80;
+--------+--------+--------+-------+
| name   | height | weight | mood  |
+--------+--------+--------+-------+
| sina   |    175 |     81 | happy |
+--------+--------+--------+-------+
3 rows in set (0.00 sec)
```

Or if I only needed the name:

```text
mysql> SELECT name FROM info WHERE mood = 'happy' AND weight >= 80;
+------+
| name |
+------+
| sina |
+------+
1 row in set (0.00 sec)
```

### ORDER BY

This is used if you want to **sort** the data based on one field. Here I'm checking my phone book based on peoples names:

```text
mysql> SELECT * FROM phonebook ORDER BY name;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| haale  |                  | 0935secret     |
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
+--------+------------------+----------------+
4 rows in set (0.00 sec)
```

This order can be done on any field, including numbers:

```text
mysql> SELECT * FROM info ORDER BY height;
+--------+--------+--------+-------+
| name   | height | weight | mood  |
+--------+--------+--------+-------+
| mina   |    171 |     59 | sad   |
| nasrin |    174 |     68 | happy |
| sina   |    175 |     81 | happy |
| jadi   |    180 |     74 | happy |
+--------+--------+--------+-------+
4 rows in set (0.00 sec)
```

### GROUP BY

This will _group_ the output. Unfortunately this is not very clear. Lets see the first example:

```text
mysql> SELECT * FROM info GROUP BY mood;
+------+--------+--------+-------+
| name | height | weight | mood  |
+------+--------+--------+-------+
| jadi |    180 |     74 | happy |
| mina |    171 |     59 | sad   |
+------+--------+--------+-------+
2 rows in set (0.00 sec)
```

We've seen that we have only two `mood`s in our table: sad & happy. When `SELECT`ing all fields \(that is `*`\) from this table `GROUP BY` mood, SQL will check all the moods, shows us only ONE from each. This can be used like the `uniq` command you leaned from LPIC101:

```text
mysql> SELECT mood FROM info GROUP BY mood;
+-------+
| mood  |
+-------+
| happy |
| sad   |
+-------+
2 rows in set (0.00 sec)
```

Which gives you all available moods in the table. In real life this is not very useful and most of the times it is combined with `count`. Have a look:

```text
mysql> SELECT count(mood), mood FROM info GROUP BY mood;
+-------------+-------+
| count(mood) | mood  |
+-------------+-------+
|           3 | happy |
|           1 | sad   |
+-------------+-------+
2 rows in set (0.00 sec)
```

Whic counts home many rows have that specific mood. So I have 3 happy friends and one sad friend.

> Note: `count` is not part of LPIC 105.3

### INSERT

Another clear command. It adds a new row to a talbe. Say I want to add some data to phonebook:

```text
mysql>  INSERT INTO phonebook (name, phone, email) VALUES ('ghasem', '+982112345678', '');
Query OK, 1 row affected (0.01 sec)

mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  |                  | 0935secret     |
| ghasem |                  | +982112345678  |
+--------+------------------+----------------+
5 rows in set (0.00 sec)
```

### DELETE

You know it! This will DELETE from a table. But be careful of what you delete... WHERE is your fiend here:

mysql&gt; DELETE FROM phonebook WHERE name = 'ghasem'; Query OK, 1 row affected \(0.01 sec\)

```text
mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  |                  | 0935secret     |
+--------+------------------+----------------+
4 rows in set (0.00 sec)
```

### UPDATE

Did I tell you that SQL looks like plain English? I was right because you know what `UPDATE` does! It updates \(changes\) row and again `WHERE` is your friend:

```text
mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  |                  | 0935secret     |
+--------+------------------+----------------+
4 rows in set (0.00 sec)

mysql> UPDATE phonebook SET  email='haale@lpic.fake' WHERE name = 'haale';
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  | haale@lpic.fake  | 0935secret     |
+--------+------------------+----------------+
4 rows in set (0.00 sec)
```

### JOIN

The JOIN command can be complicated but luckily we are on LPIC1-Exam 102 and we do not need to learn much ;\) Join will join/mix two tables. Just check this:

```text
mysql>  SELECT * FROM phonebook JOIN info;
+--------+------------------+----------------+--------+--------+--------+-------+
| name   | email            | phone          | name   | height | weight | mood  |
+--------+------------------+----------------+--------+--------+--------+-------+
| jadi   | jadi@jadi.net    | +9890something | jadi   |    180 |     74 | happy |
| nasrin | nasrin@lpic.test | +9898989898    | jadi   |    180 |     74 | happy |
| sina   | far@from.here    | +687randomnum  | jadi   |    180 |     74 | happy |
| haale  | haale@lpic.fake  | 0935secret     | jadi   |    180 |     74 | happy |
| jadi   | jadi@jadi.net    | +9890something | sina   |    175 |     81 | happy |
| nasrin | nasrin@lpic.test | +9898989898    | sina   |    175 |     81 | happy |
| sina   | far@from.here    | +687randomnum  | sina   |    175 |     81 | happy |
| haale  | haale@lpic.fake  | 0935secret     | sina   |    175 |     81 | happy |
| jadi   | jadi@jadi.net    | +9890something | nasrin |    174 |     68 | happy |
| nasrin | nasrin@lpic.test | +9898989898    | nasrin |    174 |     68 | happy |
| sina   | far@from.here    | +687randomnum  | nasrin |    174 |     68 | happy |
| haale  | haale@lpic.fake  | 0935secret     | nasrin |    174 |     68 | happy |
| jadi   | jadi@jadi.net    | +9890something | mina   |    171 |     59 | sad   |
| nasrin | nasrin@lpic.test | +9898989898    | mina   |    171 |     59 | sad   |
| sina   | far@from.here    | +687randomnum  | mina   |    171 |     59 | sad   |
| haale  | haale@lpic.fake  | 0935secret     | mina   |    171 |     59 | sad   |
+--------+------------------+----------------+--------+--------+--------+-------+
16 rows in set (0.00 sec)
```

Every single row from first table \(phonebook\) is copied in front of the second table \(info\). Not very useful _yet_. It becomes useful when you give a _common field_ or tell it to JOIN tables based on a criteria; using `WHERE`. Here is the magic:

```text
mysql> SELECT * FROM phonebook JOIN info ON phonebook.name = info.name;
+--------+------------------+----------------+--------+--------+--------+-------+
| name   | email            | phone          | name   | height | weight | mood  |
+--------+------------------+----------------+--------+--------+--------+-------+
| jadi   | jadi@jadi.net    | +9890something | jadi   |    180 |     74 | happy |
| sina   | far@from.here    | +687randomnum  | sina   |    175 |     81 | happy |
| nasrin | nasrin@lpic.test | +9898989898    | nasrin |    174 |     68 | happy |
+--------+------------------+----------------+--------+--------+--------+-------+
3 rows in set (0.00 sec)
```

Great! Now I have my firneds list, their moods and their phone numbers! Say I'm bored and I need to phone a cool friend:

```text
mysql> SELECT phonebook.name, phone, mood FROM phonebook JOIN info ON phonebook.name = info.name WHERE mood = 'happy';
+--------+----------------+-------+
| name   | phone          | mood  |
+--------+----------------+-------+
| jadi   | +9890something | happy |
| sina   | +687randomnum  | happy |
| nasrin | +9898989898    | happy |
+--------+----------------+-------+
3 rows in set (0.00 sec)
```

> Note: both tables have a field called `name` so I needed to use phonebook.name to tell SQL which name I want to show.

Obviously we can add more criteria and go out with a person shorter than 175cm:

```text
mysql> SELECT phonebook.name, phone, mood FROM phonebook JOIN info ON phonebook.name = info.name AND height < 175;
+--------+-------------+-------+
| name   | phone       | mood  |
+--------+-------------+-------+
| nasrin | +9898989898 | happy |
+--------+-------------+-------+
1 row in set (0.00 sec)
```

cool? but we are not finished yet. I do not like having sad friends and I have one, lets make her happy too!

```text
mysql> SELECT * FROM info WHERE mood = 'sad';
+------+--------+--------+------+
| name | height | weight | mood |
+------+--------+--------+------+
| mina |    171 |     59 | sad  |
+------+--------+--------+------+
1 row in set (0.01 sec)

mysql> UPDATE info SET mood = 'happy' WHERE name = 'mina';
Query OK, 0 rows affected (0.02 sec)
Rows matched: 1  Changed: 0  Warnings: 0

mysql> SELECT * FROM info WHERE mood = 'sad';                                   
Empty set (0.00 sec)

mysql> SELECT * FROM info;
+--------+--------+--------+-------+
| name   | height | weight | mood  |
+--------+--------+--------+-------+
| jadi   |    180 |     74 | happy |
| sina   |    175 |     81 | happy |
| nasrin |    174 |     68 | happy |
| mina   |    171 |     59 | happy |
+--------+--------+--------+-------+
4 rows in set (0.00 sec)
```

Easy. The last command is even easier:

### quit

```text
mysql> quit
Bye
jadi@funlife:~$
```

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

