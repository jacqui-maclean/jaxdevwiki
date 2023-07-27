I want a digital version of my notes

Currently I have the following categories

JS
React
Git
VSC

Some search functionality would be good, not sure how to implement this and want to crack on, so will put tags on the page for now and look at searches later

On the main page I will have 4 categories as outlined above - this will be easy to expand
Each category page will display alphabetic cards that refer to each page of notes.

I guess if these are stored in JSON objects as static data, then I can put the detail there and extract it out into the card components. I will put my preexisting notes as images, and then add any notes to the JSON manually - with an eye to finally adding a CMS function that will enable me to dynamically add notes to the JSON object.

Have made the beginning of the JS data and put it in assets/data

3 days later - I now have the data displayed how I want it. It is categorised into objects,array,function,variables, and can easily be extended to cover the further categories.

I would like eventually to have a dynamic navbar that looks like file tabs, I could do this by having an array that each selected item id gets sent to, so that should the link on the tab get clicked then that page can be built.

I want to look into hosting the data remotely-poss making an api.

The data is getting unwieldly as it grows, have decided to split it into category arrays, this should clean up the jsx too as then the categories can display dynamically rather than being hard coded.
