# BootStrap 3 Grid Builder

## [DEMO](http://jaykanakiya.com/bootstrap-grid-builder/ "bootstrap layout generator")

A quick layout generator for Bootstrap 3.

The Bootstrap 3 Grid System enables to quickly create responsive layouts .
I have created this to quickly test layouts on all types of devices fast.
You can increase widths and offsets and add rows / cols .
The main advantage is to test that layout on all screen sizes .

*   Please refer [Bootstrap 3 Grid System](http://getbootstrap.com/css/#grid)
*   Following optimizations are made automatically

Heavy use is made of the model -> template of Angular-js .
This is the primary json model used in bootstrap grid builder :
`
model = [ { row : [ { col } , ...  ] } , ... ]
`

Licensed under the Apache License v2.0
http://www.apache.org/licenses/LICENSE-2.0

TO BE DONE :-

- [x]   Pre-made Templates
- []   Add a delete column button
- [x]   Instead of toolbar, Use left-click popovers
- [x]   Add buttons inside the cols
- []   KeyBoard Shortcuts
- []   Ids to the Cols.
- []   Make a Tutorial Video
- []   Undo and Redo functionality
- []   Copy and Paste functionality
- [x]   Save and Reload functionality
- []   Html generation should be done via $compile and should be instant
- []   Implement push-pull classes of bootstrap 3
- []   Implement Grid Builder for 2.3.2
- []   Make a builder for Foundation