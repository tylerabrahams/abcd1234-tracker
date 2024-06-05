# tabr9714-sleeptracker

*Overview:*

This project is a web-based tracking application that visualises sleep data. 
It allows users to log their sleep information and gives different inputs in a form including the date, sleep type, start and end times, rating, and optional dream details.

On submission of the form, the app displays all logged entries on the 'Previous Sleep Data' tasklist. This data also gets loaded onto local storage. 
Using the given information the app updates the DOM to the right most column of the page. It calculates and displays some key information like the total sleep duration, alongside the date when the sleep entry was submitted, the sleep rating, and a picture representing the type of sleep depending on the users choice. ('Full nights sleep', 'Restful Nap', and 'Power Nap")

    This information was specifically chosen to be displayed on the UI as users can quickly check for the most essential and useful information first. 

11 example data entries were created as the window loads to demonstrate the apps functionality. 
These examples are purely to show what the app would look like without the user having to manually input multiple entries to see how the app works. 

They can easily be deleted with the delete button to show what the app would look like with no data provided. (All graphs will reset and tasklist will be emptied, a simple refresh will load the test data back on to the page.)



*Background and Text Colour choices:*

Different shades of blue and purple were chosen for the background and surrounding colours of the application as they are most linked to having a calming effect and suited the theme of sleep and rest.
White text highlights key information and is used to make the general text and certain functions stand out. 
The form section has a much lighter electric blue to draw the eyes of the user towards it first.

The font for headings...
The font for the paragraph was Ubuntu...

Emojis have been added for ...




*Format and Layout:*

All information is housed in a container split into 3 columns. 

- The first column contains all the statistics and data and represents them visually in a graph or modal.
- the second column is the actual sleep form where suers input their data.
- the third column is where users can see all of their past entries and can access more information or delete their selected entry.




*UI and Key Features*


Sleep Duration Chart: 
    - Displays the sleep duration for the past 7 logged entries as a column chart.
    - Only takes into account the 'Full Nights Sleep' sleep types so users can see the differeing hours of overnight sleep over time.
    - used google charts...
    - the google chart showing the past 7 logged entries of the users full nights of sleep. The graph represents the duration in hours calculated by the app over the date of the submission.


Average Sleep Rating Modal:



Average Sleep Duration Modal:



Sleep Info Form:



Total Logged Entries Tally:



More Info Button:
    - A green button is used for the more info button as it distinguishes it from the rest of the page. 
    - As you hover over it the button reacts by inverting the colour of the text and turning the bakground a lighter green.
    - The more info button creates a modal that displays all the details entered and calculated about the users  sleep.

    Modal for More Information: 
        - A modal window provides detailed information for each sleep entry, which can be closed with a close button.
        - Background becomes transluscent and nothing is clickable but the close button.

Delete button:
    - The delete button removes the task from the tasklist and off local storage.
    - The delete button is a subtle grey colour however if the user hovers over the button the background turns a bright red, warning the user and alerting them of the function of the button.

Responsive Design: 
    - The layout adapts to different screen sizes, ensuring usability on both desktop and mobile devices.







References:

Modal Tutorial: https://youtu.be/ywtkJkxJsdg?si=H4IBwiMuqP3jG39L
Google Charts Tutorial: https://youtu.be/tSHwhtZ96_8?si=448hgT9AQ6c6qqHk

Symbols and icons: https://www.i2symbol.com/symbols 
Emojis: https://emojipedia.org/person-in-bed 


