# The design system

The hierachical design system consists of;
1. pages and layouts, made up of
2. components, made up of
3. elements, made up of
4. atoms, that make up

The lower you go in the stack, the less knowledge they have of their environment. Meaning a atom never assumes the width or height or location of an element. An element does not care or know about the layout of the page, app or poster. This means you can change an atom, and know it wont have detremental effects on the layouts. It will work. And you can change the layout without having to worry about the elements. 

This ensures we only have a single direction of dependency, the lower in the 