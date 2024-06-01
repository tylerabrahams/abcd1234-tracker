# tabr9714-sleeptracker

*Overview:*

This project is a web-based tracking application that visualises sleep data. 
It allows users to log their sleep information and gives different inputs in a form including the date, sleep type, start and end times, rating, and optional dream details.

On submission of the form, the app displays all logged entries on the 'Previous Sleep Data' tasklist. This data also gets loaded onto local storage. 
Using the given information the app updates the DOM to the right of the page. It calculates and displays some key information like the total sleep duration, alongside the date when the sleep entry was submitted, the sleep rating, and a picture of the type of sleep depending on the option chosen: 'Full nights sleep', 'Restful Nap', and 'Power Nap".

This information was specifically chosen to be displayed on the UI as users can quickly check for the essential and useful information first. 

If they desire to, they can check for a more detailed layout of the information using the more info button to the right of the logged entry.
    - The more info button creates a modal that displays all the details entered and calculated about the users sleep.

Next to it is the delete button.
    - The delete button removes the task from the tasklist and off local storage.



11 example data entries were created as the window loads to demonstrate the apps functionality. These examples are purely to show what the app would look like if it was beingg used. 

They can be deleted to show what the app would look like with no data provided. 
(All graphs reset and tasklist empty)




*UI*

Different shades of blue and purple were chosen for the background and surrounding colours of the application as they are most linked to having a calming effect and suited the theme of sleep and rest.

White text highlights key information and is used to make certain functions and general text stand out. 

The form section has a much lighter electric blue to draw the eyes of the user towards it first.

A green button is used for the more info button as it distinguishes it from the rest of the page. 
As you hover over it the button reacts by inverting the colour of the text and turning the bakground a lighter green.

The delete button is a subtle grey colour however if the user hovers over the button the background turns a bright red, warning the user and alerting them of the function of the button.




*Key Features:*

Sleep Duration Chart: 
    - Displays the sleep duration for the past 7 logged entries as a column chart.
    - Only takes into account the 'Full Nights Sleep' sleep types so users can see the differeing hours of overnight sleep over time.

another chart?



Responsive Design: 
    - The layout adapts to different screen sizes, ensuring usability on both desktop and mobile devices.

Modal for Detailed Information: 
    - A modal window provides detailed information for each sleep entry, which can be closed with a button.
    - Background becomes transluscent and nothing is clickable but the close button.







References:

