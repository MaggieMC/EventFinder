# Event Finder
Enter a coordinate to find the events closest to you!

Assumptions made:
Perimeter to search for events is currently set to +-5 around the specified coordinates
The maximum number of events generated is currently set to the size of the matrix
The maximum number of tickets per event generated is currently set to 10
The event grid is generated every time the button is clicked, so there is a new grid every time (this can be easily changed)

If there were multiple events at the same location, each coordinate would have to be an array of events

When working with a much larger world size I would need to change the searching algorithms used to a logarithmic one for example in order to make the program more efficient.

To run project: navigate to directory where project is stored, run npm start and go to localhost:3000 in your browser.

Might have to run npm install first.

Must have npm installed.
