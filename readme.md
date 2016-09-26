# Contents
============
1.  Installation
2.  Sub-folder Problem
3.  Translation
4.  Priorities
5.  Fixed Menu
6.  Fixed Sidebar
7.  Home Item
8.  Mobile Menu Blinking
    
## Installation
============

1.  Upload the theme folder into public/themes on your Redmine server. Then
    login to Redmine, go to Administration \> Settings \> Display tab and select
    the uploaded template. No need to restart apache.

2.  If a previous version of the theme exists, just follow step 1. The theme
    versions are numbered so you will not override any existing theme version.

3.  If you want to make any changes to the theme, use the
    overrides/overrides.css file. Also, make sure to backup the overrides.css
    file in case you make an update of the theme in the future. The LESS files
    are compiled using [Prepros](<https://prepros.io>).

## Subfolder Problem (menu links not working)
=========

If you have your Redmine in a **subfolder**, 3 links in the main menu will not
work - Issues, Spent time and the logo link. To make it work, open javascripts/theme.js and
locate:

\* line 203 which looks like this:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('<a>').attr('href', '/issues').attr('class', 'issues fa df fa-tasks').append(
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

and change it to:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('<a>').attr('href', '/subfolder/issues').attr('class', 'issues fa df fa-tasks').append(
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

\* line 209 which looks like this:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('<a>').attr('href', '/time_entries').attr('class', 'spent_time df fa fa-clock-o').append(
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

and change it to:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('<a>').attr('href', '/subfolder/time_entries').attr('class', 'spent_time df fa fa-clock-o').append(
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

\* line 338 which looks like this:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('#top-menu').append('<a href="/my/page" class="home-link"></a>');
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

and change it to:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('#top-menu').append('<a href="/subfolder/my/page" class="home-link"></a>');

replace the word `subfolder` with the name of your actual subfolder. In Bitnami,
it will be `/redmine`.

## Translation
===========

If you want to translate top menu items that are in English (Issues, Spent time)
into your language, go to javascripts/theme.js and locate lines 204 and 210.
These top menu items are added in this file. There you can translate them into
your language or simply change them: Example:

\* line 204:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('<span>').append('Issues') 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

\--\> translate/change "Issues" so it looks for example like this:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('<span>').append('Tickets')
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

\* line 210:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('<span>').append('Spent time')
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

\--\> translate/change "Spent time" so it looks for example like this:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('<span>').append('Time log')
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

**Note 1**: maintain the quotation marks where they are otherwise it will not
work

**Note 2**: the example is in English-to-English so everyone can understand  
but you can change the words into any language you need

## Priorities
==========

In version 1.1.0 we changed the appearance of priorities so it makes more sense.
We understand that such a change might impact the whole company so we left a way
to switch back. If you want to use the old priorities, just locate a file in
`your_template/stylesheets/css/issue_priorities.css` and comment / rename /
delete it. Then locate `issue_priorities_old.css` in the same folder and rename
it to `issue_priorities.css`. That will do the trick.

## Fixed Menu
==========

In version 1.1.0 we added a fixed top menu. If you do not like it, just locate
`your_theme/stylesheets/css/fixed_menu.css` and either comment it or delete it. The mobile version of the menu run on Redmine 3.2+ is not fixed.

## Fixed Sidebar
==========

In version 1.1.2 we added a fixed sidebar. If you do not like it, just locate
`your_theme/stylesheets/css/fixed_sidebar.css` and either comment it or delete it.

## Home Item
==========

If you want to hide the "Home" top menu item, just go to
`your_theme/stylesheets/less/overrides/overrides.less`, copy what you see, paste
it into `your_theme/stylesheets/css/overrides/overrides.css` and uncomment the
"\#top-menu li a.home" selector.

## Mobile Menu Blinking
==========

In Redmine 3.2.1, we have found a problem with a blinking menu: sometimes when you reload the page or you shrink your browser window, for a fraction of a second you will see the top bar and menu in the Redmine "Default theme" design (light blue). Unfortunately, we are not able to determine which Redmine version you are using and since we want to support versions prior to Redmine 3.2, we had to make a work-around. If you are experiencing such behavior, and you have Redmine 3.2+, to get rid of it, just go to: 

`your_theme/stylesheets/application.css` and locate lines 18 and 19 which liik like this: 

`@import "css/responsive-mobile-menu.css";`  
`// @import "css/responsive-mobile-menu-v3.css";`

To make it work, uncomment line 19 (remove these characters at the beginning of the line `/*` and these characters at the end of the line `*/`) and comment line 18 (add these characters at the beginning of the line `/*` and these characters at the end of the line `*/`). 

Thanks for understanding. 


 

Enjoy!
