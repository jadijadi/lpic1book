---
authors: Talha Mansoor
Title: Home Page -- Projects List
Tags: remarkable, unique, home
Date: 2019-07-01 01:12
comments: false
Slug: projects-list
Category: Components
---

Projects list is read from `PROJECTS` in your Pelican configuration
(`pelicanconf.py`) file. It is an array of dictionaries. Each
dictionary has three keys,

1. `name` which will have name of your project,
1. `url` which will have URL of the project, and
1. `description` which will have the description of the project.

You can define as many projects as you want. Here
is an example,

    #!Python
    PROJECTS = [{
        'name': 'Logpad + Duration',
        'url': 'https://github.com/talha131/logpad-plus-duration#logpad--duration',
        'description': 'Vim plugin to emulate Windows Notepad logging feature,'
        ' and log duration of each entry'},
        {'name': 'Elegant Theme for Pelican',
        'url': 'http://oncrashreboot.com/pelican-elegant',
        'description': 'A clean and distraction free theme, with search and a'
        ' lot more unique features, using Jinja2 and Bootstrap'}]

To configure the projects' list title, set `PROJECTS_TITLE` variable in your Pelican configuration. Its default value is "My Projects". For example,

```python
PROJECTS_TITLE = "Related Projects"
```

![Home Page Sample]({static}/images/elegant-theme_home-page-features.png)
