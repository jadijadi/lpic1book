Title: 103.8 Basic file editing
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
sortorder: 190


_Weight: 3_

Candidates should be able to edit text files using vi. This objective includes vi navigation, vi modes, inserting, editing, deleting, copying and finding text. It also includes awareness of other common editors and setting the default editor.

### Objectives

- Navigate a document using vi.
- Understand and use vi modes.
- Insert, edit, delete, copy and find text in vi.
- Awareness of Emacs, nano and vim.
- Configure the standard editor.

- `vi`
- /, ?
- h,j,k,l
- i, o, a
- d, p, y, dd, yy
- ZZ, :w!, :q!
- EDITOR

<iframe width="560" height="315" src="https://www.youtube.com/embed/7S5RaX1OsTE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Introduction
As any other tool, we have a wide range of selection when it comes to text editors. One of the most common and super powerful choices is the `vi` editor. It is pre-installed on all major Linux distributions, and you can be sure that knowing it, will let you edit your files on all environments, let it be a remote server over SSH or a coding environment on your desktop machine or a CyberDeck machine with a minimal keyboard. Its only _drawback_ might be its kind of slow learning curve, but I'm sure after a 1-hour session with it, you will manage to find your way in `vi`.

There is an _Improved_ version of `vi` which is called _VIMproved_ or `vim`. Sometimes that's what you will find on your system, and sometimes the `vi` command is aliased or linked to `vim`. Let's check this on our system (Ubuntu 22.04):

```
jadi@funlife:~$ whatis vi
vi (1)               - Vi IMproved, a programmer's text editor
jadi@funlife:~$ whereis vi
vi: /usr/bin/vi /usr/share/man/man1/vi.1.gz
jadi@funlife:~$ whatis vim
vim (1)              - Vi IMproved, a programmer's text editor
jadi@funlife:~$ whereis vim
vim: /usr/bin/vim /etc/vim /usr/share/vim /usr/share/man/man1/vim.1.gz
jadi@funlife:~$ vi --version
VIM - Vi IMproved 9.0 (2022 Jun 28, compiled Aug 23 2022 20:18:58)
Included patches: 1-242
Modified by team+vim@tracker.debian.org
Compiled by team+vim@tracker.debian.org
Huge version without GUI.  Features included (+) or not (-):
+acl               +file_in_path      +mouse_urxvt       -tag_any_white
+arabic            +find_in_path      +mouse_xterm       -tcl
+autocmd           +float             +multi_byte        +termguicolors
+autochdir         +folding           +multi_lang        +terminal
-autoservername    -footer            -mzscheme          +terminfo
-balloon_eval      +fork()            +netbeans_intg     +termresponse
+balloon_eval_term +gettext           +num64             +textobjects
-browse            -hangul_input      +packages          +textprop
++builtin_terms    +iconv             +path_extra        +timers
+byte_offset       +insert_expand     -perl              +title
+channel           +ipv6              +persistent_undo   -toolbar
+cindent           +job               +popupwin          +user_commands
-clientserver      +jumplist          +postscript        +vartabs
-clipboard         +keymap            +printer           +vertsplit
+cmdline_compl     +lambda            +profile           +vim9script
+cmdline_hist      +langmap           -python            +viminfo
+cmdline_info      +libcall           +python3           +virtualedit
+comments          +linebreak         +quickfix          +visual
+conceal           +lispindent        +reltime           +visualextra
+cryptv            +listcmds          +rightleft         +vreplace
+cscope            +localmap          -ruby              +wildignore
+cursorbind        -lua               +scrollbind        +wildmenu
+cursorshape       +menu              +signs             +windows
+dialog_con        +mksession         +smartindent       +writebackup
+diff              +modify_fname      +sodium            -X11
+digraphs          +mouse             -sound             -xfontset
-dnd               -mouseshape        +spell             -xim
-ebcdic            +mouse_dec         +startuptime       -xpm
+emacs_tags        +mouse_gpm         +statusline        -xsmp
+eval              -mouse_jsbterm     -sun_workshop      -xterm_clipboard
+ex_extra          +mouse_netterm     +syntax            -xterm_save
+extra_search      +mouse_sgr         +tag_binary        
-farsi             -mouse_sysmouse    -tag_old_static    
   system vimrc file: "/etc/vim/vimrc"
     user vimrc file: "$HOME/.vimrc"
 2nd user vimrc file: "~/.vim/vimrc"
      user exrc file: "$HOME/.exrc"
       defaults file: "$VIMRUNTIME/defaults.vim"
  fall-back for $VIM: "/usr/share/vim"
Compilation: gcc -c -I. -Iproto -DHAVE_CONFIG_H -Wdate-time -g -O2 -ffile-prefix-map=/build/vim-Oy69Mt/vim-9.0.0242=. -flto=auto -ffat-lto-objects -flto=auto -ffat-lto-objects -fstack-protector-strong -Wformat -Werror=format-security -DSYS_VIMRC_FILE=\"/etc/vim/vimrc\" -DSYS_GVIMRC_FILE=\"/etc/vim/gvimrc\" -D_REENTRANT -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1 
Linking: gcc -Wl,-Bsymbolic-functions -flto=auto -ffat-lto-objects -flto=auto -Wl,-z,relro -Wl,-z,now -Wl,--as-needed -o vim -lm -ltinfo -lselinux -lsodium -lacl -lattr -lgpm -L/usr/lib/python3.10/config-3.10-x86_64-linux-gnu -lpython3.10 -lcrypt -ldl -lm -lm 
```

To edit a file with vi, just give the file name to it:

```text
$ vi file.txt
```

### vi modes

`vi` works in two modes:

1. **Command mode** is where you go around the file, search, delete text, copy-paste, replace, ... and give other commands to the vi. Some commands start with a `:` and some are only a keypress.
2. **Insert mode** is where what you type, goes into the file at the cursors position.

> To switch to the Command mode, press the ESC key. To go back to the Insert mode, you can use several commands, but one common one is pressing the `i` key.

### Moving the cursor

To move around a text file, use these keys in command mode:

| key | function |
| :---: | :--- |
| h | One character to the left \(only current line\) |
| j | One line down |
| k | One line up |
| l | One character to the right \(only current line\) |
| w | Next word on the current line |
| e | Next end of word on the current line |
| b | Previous beginning of the word on the current line |
| Ctrl-f | Scroll forward one page |
| Ctrl-b | Scroll backward one page |

> Typing a number before most commands will repeat the command that many times \(i.e. `6h` will go 6 characters to the left\)

#### Jumping around

| key | function |
| :---: | :--- |
| G | With no number, will jump to the end & 10G will jump to line 10 |
| H | 5H will go to the 5th line from the top of the screen |
| L | 3L will move the cursor to the 3rd line to the last line of the screen |

### Editing text

These command during the _command mode_ will help you enter, edit, replace and text:

| key | function |
| :---: | :--- |
| i | Enter the insert mode |
| a | Enter the insert mode after the current position of the cursor |
| r | replace only one character |
| o | open a new line below the cursor and go to the insert mode |
| O | open a new line above the cursor and go to the insert mode |
| c | clear to a location and go to the insert mode the replace till there and then normal insert \(`cw` will overwrite the current word\) |
| d | delete. You can mix with w \(`dw`\) to delete a word. Same as `cw`, but `dw` does not go to the insert mode |
| dd | Delete the current line |
| x | Delete character at the position of the cursor |
| p | Paste the last deleted text after the cursor |
| P | Paste the last deleted text before the cursor |
| xp | swaps the character at the cursor position with the one on its right |

### Searching

| key | function |
| :---: | :--- |
| / | Search forward \(`/happiness` will find the next happiness\) |
| ? | Search backward |
| n | repeat previous search. You can also use `/` and `?` without any parameters\) |

> Search wraps around to the top once the bottom of file is reached

### Exiting

It is always funny when you see someone entering to the vi and not knowing how to exit! Learn these and prevent the laughter:

| key | function |
| :---: | :--- |
| :q! | Quit editing without saving = runaway after any mistake |
| :w! | Write the file \(whether modified or not\). Attempt to overwrite existing files or read-only or other unwritable files |
| :w myfile.txt | Write to a new name |
| ZZ | Exit and save the file if modified |
| :e! | Reload the file from disk |
| :! | Run a shell command |

Entering colon \(`:`\) during _command mode_ will move the cursor to the bottom of the screen, and vi will wait for your commands. Press ESC to return to the normal command mode.

> The exclamation mark in most commands will say "I know what I'm doing" and will write on read-only files if you have access and will exit without asking

> it is possible to combine commands. For example, you can combine `:w` and `:q` and just say `:wq` (write and exit).

### help
You can always ask for help with `:help` or `:help subject`. This way vi will open a help text which you can use / search just like any other text. Close it with `:q` command.

## Other editors
You can also use other editors if you want. One easy to use, and common option is `nano` and some other choices are `micro`, `emacs` (full-featured) and `neovim` (an update to vim).

## Default editor
The default editor in `bash` is set using the `EDITOR` environment variable. You can change it with:

```
$ export EDITOR='vim'
```

Or by adding the above line to the `.bashrc` file. We will see these in more details in next chapters.
