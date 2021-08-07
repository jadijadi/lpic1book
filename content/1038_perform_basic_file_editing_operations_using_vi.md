Title: 103.8 Perform basic file editing operations using vi
Date: 2021-08-03 13:17
Category: 103

# 103.8 Perform basic file editing operations using vi
*Weight: 3*

Candidates should be able to edit text files using vi. This objective includes vi navigation, basic vi modes, inserting, editing, deleting, copying and finding text.

## Objectives
- Navigate a document using vi.
- Use basic vi modes.
- Insert, edit, delete, copy and find text.


- vi
- /, ?
- h,j,k,l
- i, o, a
- c, d, p, y, dd, yy
- ZZ, :w!, :q!, :e!

## Introduction
`vi` is a great tool! The best editor ever (some say after Emacs) and it is installed on all linux systems. Some say it is difficult to use and *abnormal* and some say it is the most natural editor there can be. Lets see.

> vi can be used with simplest keyboards and over network on ssh terminals

In many systems, ``vi`` command is a link / alias to ``vim`` and there are many versions of vi. Check with ``--version`` switch:

````
$ vi --version
VIM - Vi IMproved 7.4 (2013 Aug 10, compiled Oct 20 2014 16:08:47)
Included patches: 1-273
Modified by pkg-vim-maintainers@lists.alioth.debian.org
Compiled by buildd@
Small version without GUI.  Features included (+) or not (-):
+acl             -farsi           -mouse_sgr       -tag_old_static
-arabic          -file_in_path    -mouse_sysmouse  -tag_any_white
-autocmd         -find_in_path    -mouse_urxvt     -tcl
-balloon_eval    -float           -mouse_xterm     +terminfo
...
````

To edit a file with vi, just give the file name to it:

````
$ vi file.txt
````

## vi moded
`vi` has 2 different modes:
- **Command mode** is where you go around the file, search, delete text, copy paste, replace, ... and give other commands to the vi. Some commands start with a `:` and some are only a keypress.
- **Insert mode** is where what you type, goes into the file at the cursors position.

> If you want to go to the Command mode from the Insert mode, press ESC key. There are several ways to go to the Insert mode from Command mode (including the 'i' key).

## Moving the cursor

If you need to move around, use these keys:

|key|function|
|---|---|
|h|One character to the left (only current line)|
|j|One line down|
|k|One line up|
|l|One character to the right (only current line)|
|w|Next word on the current line|
|e|Next end of word on the current line|
|b|Previous beginning of the word on the current line|
|Ctrl-f|Scroll forward one page|
|Ctrl-b|Scroll backward one page|

> you can type a number before most commands and that command will be repeated that many times (i.e. `6h` will go 6 characters to the left)

### Jumping

|key|function|
|---|---|
|G| With no number, will jump to the end & 10G will jump to line 10|
|H|5H will go to the 5th line from the top of the screen|
|L|3L will move the cursor to the 3rd line to the last line of the screen|


## Editing text
These command during the *command mode* will help you enter, edit, replace, .. test:

|key|function|
|---|---|
|i|Enter the insert mode|
|a|Enter the insert mode after the current position of the cursor|
|r|replace only one character|
|o|open a new line below the cursor and go to the insert mode|
|O|open a new line above the cursor and go to the insert mode|
|c|clear to a location and go to the insert mode the replace till there and then normal insert (`cw` will overwrite the current word)|
|d|delete. you can mix with w (`dw`) to delete a word. Same as cw but dw does not to to the insert mode|
|dd|Delete the current line|
|x|Delete character at the position of the cursor|
|p|Paste the last deleted text after the cursor|
|P|Paste the last deleted text before the cursor|
|xp|swaps the character at the cursor position with the one on its right|

## Searching

|key|function|
|---|---|
|/|Search forward (`/happiness` will find the next happiness)|
|?|Search backward|
|n|repeat previous search. You can also use `/` and `?` without any parameters)|

>Search wraps around to the top once the bottom of file is reached


## Exiting
It is always funny when you see someone entering to the vi and now knowing how to exit! Learn these and prevent the laughter:

|key|function|
|---|---|
|:q!|Quit editing without saving = runaway after any mistake|
|:w!|Write the file (whether modified or not). Attempt to overwrite existing files or read-only or other unwritable files|
|:w myfile.txt|Write to a new name|
|ZZ|Exit and save the file if modified|
|:e!|Reload the file from disk|
|:!|Run a shell command|

Entering colon (`:`) during *command mode* will move the cursor to the bottom of the screen and vi will wait for your commands. Press ESC to return back to the normal command mode.

> The exclamation mark in most commands will say "I know what I'm doing" and will write on read-only files if you have access and will exit without asking


## help
You can always ask for help with `:help` or `:help subject`. This way vi will open a help text which you can use / search just like any other text. Close it with `:q` command.

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
