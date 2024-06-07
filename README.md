## DECO2017 Web App Prototype

Made by Tyler Abrahams- tabr9714


## Overview:
Welcome to SleepWise! Your personalised sleep tracker.

This project is a single-page application (SPA) that allows you to log your sleep data, track sleep patterns, and visualise your sleep statistics over time. Its main purpose is to record and analyse your sleep data, providing accurate calculations based on the information you input.
It is built using basic HTML, CSS and Javascript. Uses Local Storage for data persistence.


## Version Control
This project uses github for tracking changes, managing development and code repository hosting. 
See github repository here: https://github.com/tylerabrahams/tabr9714-sleeptracker-final 


## Features
- *Sleep Form*: Log sleep data including date, type of sleep, start time, end time, sleep rating, and optional dream details.
- *Full Nights Sleep Column Chart*: View a chart displaying the duration of full nights' sleep for the past seven entries.
- *All Time Average Info Modals*: View all-time average sleep ratings and durations by clicking the corresponding buttons. The modal pop-ups provide detailed information and statistics.
- *Previous Sleep Data Tasklist*: All logged entries are displayed in the right column under 'previous sleep data' and is stored using Local Storage. Entry counter tally updates automatically.
- *Responsive design*: Layout adapts to different screen sizes, ensuring usability on both desktop and mobile devices.

1. **Logging Sleep Data:**
    - On the sleep form (middle column), fill in the date, type of sleep, start time, end time, sleep rating, and optional dream details.
    - Click the submit button to log the entry.

2. **Viewing Logged Entires**
    - Application displays all logged entries on the 'Previous Sleep Data' tasklist. (Right column)
    - This data also gets loaded onto local storage. 
    - Duration of sleep is calculated and is displayed alongside date inputted.
    - Picture is also shown on each task depending on the users choice of Sleep Type. ('Full nights sleep', 'Restful Nap', and 'Power Nap")
    - Data entry counter is updated whenever a new entry or task is submitted/deleted.

3. **Viewing Sleep Statistics:**
    - The main Google chart (left column) displays the duration of full nights' sleep for the past seven entries as a column chart.
        - Only takes into account the 'Full Nights Sleep' sleep types so users can see their full nights of sleep over time.
        - The graph represents the duration in hours calculated by the app on the y-axis. 
        - Day and date of submission is on the x-axis.
    - Click on the "⭐ All Time Average Sleep Ratings ⭐" button to view average sleep ratings in a modal.
    - Click on the "🛌 All Time Average Sleep Durations 🛌" button to view average sleep durations in a modal.

4. **Viewing More Details:**
    - Each logged entry has a "More Info" button to view detailed information in a modal.
    - The modal window provides detailed information for each sleep entry, which can be closed with a close button.

5. **Deleting Entires**
    - Each logged entry has a "Delete" button to remove the entry. Will also remove the entry from Local Storage.


**Background and Text Colour Choices:**

- Different shades of blue and purple were chosen for the background and surrounding colours of the application as they are most linked to having a calming effect and best suited the theme of sleep and rest.
- White text highlights key information and is used to make the general text and certain functions stand out. 
- The form section has a much lighter electric blue to draw the eyes of the user towards it first.
- Average duration and rating modals keep the purple theme with different coloured borders to make them unique.
- More Info modal uses a dark green to create a visual separation with the rest of the modals.
- Delete button is a sublte grey however turns bright red when hivered over to warn the user.



## Setup

'Npm run dev' for updated code to run on localhost:1234 (recommended)

'Npm run start' for code to run on localhost:8888 (this tends to be slightly more glitchy and may not update in real time)


- 11 example data entries were created as the window loads to demonstrate the apps functionality. 
- These examples are purely to show what the app would look like without the user having to manually input multiple entries to see how the app works. 

- They can easily be deleted with the delete button to show what the app would look like with no data provided. (All graphs will reset and tasklist will be emptied, a simple refresh will load the test data back on to the page.)


## Usage
There are two options:

1. View the website online at the following URL and copy the code into VSCode: https://github.com/tylerabrahams/tabr9714-sleeptracker-final
2. Open the index.html file in your web browser to start using this application.

Once the command 'npm run dev' has been inputted in terminal and the page is open on localhost:1234, fill out the form and click submit. 
You will see your newly added task at the top of the "previous sleep data' column and the entry counter will update.
The google column chart and average statistic modals underneath will also update.


## Limitations:

This application uses localStorage for data persistence, which is limited to the specific browser and device. If opened on a different browser or device, the user's past entries and personalised column chart and statistics will not be there.


## Sources:

YouTube Videos:
1. Modal Tutorial: Fireship. (2023, August 24). Learn Modals in 10 Minutes - JavaScript Modal Tutorial. [Video]. YouTube. https://youtu.be/ywtkJkxJsdg?si=H4IBwiMuqP3jG39L
2. Google Charts Tutorial: Traversy Media. (2023, September 12). Google Charts Tutorial - Learn Google Charts with JavaScript. [Video]. YouTube. https://youtu.be/tSHwhtZ96_8?si=448hgT9AQ6c6qqHk
3. JavaScript Dates Tutorial: The Net Ninja. (2023, July 10). JavaScript Date Objects - Full Tutorial. [Video]. YouTube. https://youtu.be/CnozSz4wbBQ?si=6bumMSdELdeJ8snk
4. Layout Inspiration: DesignCourse. (2023, May 15). Web Design Layout Inspiration: Tips and Examples. [Video]. YouTube. https://youtu.be/pb20ljTtOBk?si=HLy8WRcl9-D0_jx_

Websites:
1. Symbols and icons: I2Symbol. (n.d.). Symbols and Icons. Retrieved June 8, 2024, from https://www.i2symbol.com/symbols
2. Emojis: Emojipedia. (n.d.). Person in Bed Emoji. Retrieved June 8, 2024, from https://emojipedia.org/person-in-bed

Images:
1. Full Night's Sleep: Tetiana Lazunova. (2020). A woman falls asleep and counts sheep, insomnia [Vector image]. iStock. https://media.istockphoto.com/id/1275847179/vector/a-woman-falls-asleep-and-counts-sheep-insomnia.jpg?s=612x612&w=0&k=20&c=LwijnKK5_LgHj8-XZWNzUsShqXeaMp4nCmB60ZrbazM=
2. Power Nap: Vasilyev Alexandr. (2020). Young female get healthy sleeping [Illustration]. Shutterstock. https://www.shutterstock.com/image-vector/young-female-get-healthy-sleeping-260nw-1988850308.jpg
3. Restful Nap: Lund, J. (2019). Restful nap [Photograph]. Medium. https://miro.medium.com/v2/resize:fit:1200/1*Kpz9HBXFyXtivPq2x-OANw.jpeg


## Acknowledgements:

I had trouble accessing and running the demo repository that this application was intially based off as it did not update in real time with the changes made. I had to book a tutoring session to solve this issue however, in the meantime I created the basis of my application on a separate VSCode folder and copied the progress made so far into this final github repository once it was functioning properly.
The changes made from then on are recorded in this github repository.


## AI Acknowledgements:

Project was initially generated with the following prompts using ChatGPT3.5:

- Help write a readme file for the application.
- Explain why local storage is not working properly on my application.