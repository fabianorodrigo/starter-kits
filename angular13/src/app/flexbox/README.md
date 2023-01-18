CSS Flexbox
===

User interface module to explorer features of the [CSS Flexible Box Layout Module](https://www.w3.org/TR/css-flexbox/), a layout model that allows responsive elements be organized automatically inside an another container element.

The main idea behind the flex layout is to give the container the ability to alter its items’ width/height (and order) to best fill the available space (mostly to accommodate to all kind of display devices and screen sizes). A flex container expands items to fill available free space or shrinks them to prevent overflow.



# Components


## demo-container

It's a component that receives a set of flexbox properties and set styles dinamically to the container. It also allows the user edit the flexbox properties
for the child/item elements. When its property `showCSS` is TRUE, it also shows equivalent CSS for each configuration.

## demo-property-flex-directions

A component the shows the behavior of a configuration of flexbox properties with each of the four values possible for `flex-direction` side by side.


## item-style-dialog

A dialog used by demo-container to edit the flexbox properties for a child/item element.

# Pages

## justify-content

A page that uses an instance of component demo-container in order to demonstrate behavior differences between all the possible values for `justify-content` flexbox property. It also allows the user change a group of others flexbox properties so it is possible to compare a large number of configurations.



# Sources

https://css-tricks.com/snippets/css/a-guide-to-flexbox/
