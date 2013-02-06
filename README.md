Workflowy Roll-Up Bookmarklet
=============================

Simple bookmarklet that adds a "sum" to nodes in a Workflowy document, allowing for easy roll-up calculations of hierarchical data.

Values are calculated by extracting an integer enclose by square brackets from the end of any Workflowy node, and summing with the total of the values of nested nodes.

See demo.html for an example.

Drag this link to your bookmarks: [Workflowy Roll-Up][1]

  [1]: javascript:(function(){;(function()%7Bvar%20valueFromString=function(s)%7Bvar%20pats=%5B/%5C%5B(%5Cd+%5C.?%5Cd*)%5C%5D$/,/%5C((%5Cd+%5C.?%5Cd*)%5C)$/,/%5Cs(%5Cd+%5C.?%5Cd*)$/%5D;for(var%20k%20in%20pats)%7Bvar%20pat=pats%5Bk%5D;var%20r=s.match(pat);if(r)%7Breturn%20parseFloat(r%5B1%5D)%7D%7Dreturn%200%7D;var%20nodeValue=function(el)%7Bvar%20value=$(el).attr(%22data-node-value%22);if(value===undefined)%7Bvar%20name=$(el).children(%22.name%22).children(%22.content%22).text();var%20myVal=valueFromString(name);var%20childVals=0;$(el).children(%22.children%22).children(%22.project%22).each(function(idx,childEl)%7BchildVals+=nodeValue(childEl)%7D);value=myVal+childVals;$(el).attr(%22data-node-value%22,value)%7Dreturn%20value%7D;var%20addRollups=function()%7B$(%22.project%22).each(function(idx,el)%7Bval=nodeValue(el);if(val!=0)%7B$(el).addClass(%22js-changed-name%22);$name=$(el).children(%22.name%22).children(%22.content%22);$(el).attr(%22data-original-name%22,$name.text());$name.append(%22%20&amp;mdash;%20%22+nodeValue(el))%7D%7D)%7D;var%20removeRollups=function()%7B$(%22.js-changed-name%22).each(function(idx,el)%7B$(el).children(%22.name%22).children(%22.content%22).text($(el).attr(%22data-original-name%22));$(el).removeClass(%22js-changed-name%22)%7D)%7D;var%20toggleRollups=function()%7Bif(window.rollupsToggled)%7BremoveRollups();window.rollupsToggled=0%7Delse%7BaddRollups();window.rollupsToggled=1%7D%7D;toggleRollups();$(%22#toggleButton%22).click(toggleRollups)%7D)();})()
