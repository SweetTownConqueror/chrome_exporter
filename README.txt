chrome_exporter
little chrome extension I made to export cookies, history and bookmarks

In this branch I started to add a functionality to import the cookies, history and bookmarks from the exported json generated in the first version.

The problem is that the function chrome.bookmark.create(bookmark) didn't work as expected: When trying to create a bookmark with the id specified in the json, a bookmark with an other id is created. It causes problems when trying to create a child directory and you specify a parent id that does'nt match with the parent directory id created.

Maybe tryong to programmatically delete all bookmarks before in the aim to reset the id count may work?

Or try to conturn the problem otherwise..

Anyway the work I made is attached to this file
