// Initialise Google Charts
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

//define array taskList
let taskList = [];

//define mapping between sleep types and corresponding image
const sleepTypeImages = {
  "Full Nights Sleep": "public/photos/sleep.jpeg",
  "Power Nap": "public/photos/power-nap.png",
  "Restful Nap": "public/photos/restful-nap.jpeg"
};

// Retrieve tasks from local storage when the page loads
window.onload = function () {
  let storedTasks = JSON.parse(localStorage.getItem('taskList'));
  if (storedTasks !== null) {
    taskList = storedTasks;
    taskList.forEach(task => displayTask(task));
  }
  //draw google charts with existing data
  drawChart();



  //Example test data is for demonstrative purposes only, to show functionality once multiple entires have been made.
  // Define a unique ID's for the example tasks so they can be tracked.
  const exampleTasks = [
    { id: 1, date: '01/01/2024', type: 'Full Nights Sleep', start: '23:00', end: '09:00', rating: 5, details: 'Example Test data' },
    { id: 2, date: '01/01/2024', type: 'Power Nap', start: '12:00', end: '12:25', rating: 3, details: 'Example Test data' },

    { id: 3, date: '01/02/2024', type: 'Full Nights Sleep', start: '22:30', end: '07:30', rating: 4, details: 'Example Test data' },

    { id: 4, date: '01/03/2024', type: 'Full Nights Sleep', start: '22:30', end: '08:30', rating: 4, details: 'Example Test data' },
    { id: 5, date: '01/03/2024', type: 'Restful Nap', start: '14:00', end: '15:10', rating: 2, details: 'Example Test data' },

    { id: 6, date: '01/04/2024', type: 'Full Nights Sleep', start: '22:30', end: '07:30', rating: 4, details: 'Example Test data' },

    { id: 7, date: '01/05/2024', type: 'Full Nights Sleep', start: '22:30', end: '09:30', rating: 4, details: 'Example Test data' },
    { id: 8, date: '01/05/2024', type: 'Power Nap', start: '13:00', end: '13:30', rating: 4, details: 'Example Test data' },


    { id: 9, date: '01/06/2024', type: 'Full Nights Sleep', start: '22:30', end: '08:30', rating: 4, details: 'Example Test data' },

    { id: 10, date: '01/07/2024', type: 'Full Nights Sleep', start: '22:30', end: '10:00', rating: 4, details: 'Example Test data' },
    { id: 11, date: '01/07/2024', type: 'Restful Nap', start: '15:00', end: '15:45', rating: 5, details: 'Example Test data' }
  ];

  // Check if each example task already exists before adding so there are no duplicates
  exampleTasks.forEach(task => {
    if (!taskList.some(t => t.id === task.id)) {
      addTask(task.date, task.type, task.start, task.end, task.rating, task.details, task.id);
      console.log(task.date);
    }
  });

  //update the total logged entries conunter
  updateEntryCounter()
};



//define counter to tally all logged entries
let entryCounter = 0;
console.log(entryCounter);

//function updates entry counter display on right column
function updateEntryCounter(){
  const counterElement = document.getElementById("entry-counter");
  entryCounter = taskList.length;
  counterElement.innerHTML = `<h3>😴 Total Logged Entries: ${entryCounter}</h3>`;
  console.log(entryCounter);
}



// Function to enable scrolling for the right column when cursor is over it
function rightColumnScroll() {
  const rightColumn = document.querySelector('.right-column');

  // Enable vertical scrollbar
  rightColumn.addEventListener('mouseenter', function () {
    rightColumn.style.overflowY = 'auto'; 
  });

  // Disable vertical scrollbar
  rightColumn.addEventListener('mouseleave', function () {
    rightColumn.style.overflowY = 'hidden'; 
  });
}

// call the function to enable scrolling for the right column
rightColumnScroll();



//add tasks and push onto the array
function addTask(date, type, start, end, rating, details, id = Date.now()) {
  let task = {

    // Use provided ID or generate a unique ID for each task
    id: id,

    date: date,
    type: type,
    start: start,
    end: end,
    rating: parseInt(rating),
    details: details,

    //add duration and call the function to calculate using the given data
    duration: calculateSleepDuration(start, end)
  };

  taskList.push(task);

  // Update local storage
  localStorage.setItem('taskList', JSON.stringify(taskList)); 

  // Pass the newly added task to displayTask
  displayTask(task); 

  //update chart
  drawChart();

  //update entry counter
  updateEntryCounter();
}


// Function to format the date to make it more user friendly
function formatDate(dateString) {

  // previously yy/mm/dd, now it will show-  weekday dd/mm/yy
  const options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };

  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}


//function to calculate the sleep duration using inputted start and end times
function calculateSleepDuration(start, end) {
  const startTime = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);

  let diffMs = endTime - startTime;
  if (diffMs < 0) {
    // Adjust for times that cross midnight
    diffMs += 24 * 60 * 60 * 1000;
  }

  const diffHrs = Math.floor(diffMs / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);

  return `${diffHrs}h ${diffMins}m`;
}



const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

//create function for when the submit button is pressed
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = form.elements.sleepDate.value;
  const type = form.elements.taskType.value;
  const start = form.elements.sleepStart.value;
  const end = form.elements.sleepEnd.value;
  const rating = form.elements.sleepRating.value;
  const details = form.elements.dreamDetails.value;

  //check if all required fields are filled in
  if (date && type && start && end && rating) {

    //call the addTask function with info
    addTask(date, type, start, end, rating, details);

    //reset the form to be used again
    form.reset();

  } else {

    alert("Please fill in all required fields.");
  }
});


//create modal functionality to get more information on items in tasklist
const modal = document.querySelector("[data-modal]")

//show the modal
function showModal() {
  modal.style.display = 'block'
}

//close the modal
function closeModal() {
  modal.style.display = 'none';
}

//add functionality to the close modal button
modal.querySelector("[data-close-modal]").addEventListener("click", closeModal);



//create the tasks and their contents
function displayTask(task) {
  let item = document.createElement("li");
  item.setAttribute("data-id", task.id);

  //include image based on corrresponding sleep type
  let img = document.createElement("img");
  img.src = sleepTypeImages[task.type];
  img.alt = task.type;
  img.classList.add("sleep-type-image");


  //display key information
  item.innerHTML = `
    <p><strong>Date:</strong> ${formatDate(task.date)}</p>
    <p><strong>Duration:</strong> ${task.duration}</p>
  `;
  //<p><strong>Rating:</strong> ${task.rating}</p>
  //<p><strong>Type:</strong> ${task.type}</p>


  //insert image at the beginning before the text
  item.insertBefore(img, item.firstChild);

  // Prepend item so new tasks get added to the top of page, makes it more user friendly
  tasklist.prepend(item);


  //create the more info button
  let moreinfoButton = document.createElement("button");
  let moreinfoButtonText = document.createTextNode("More Info");
  moreinfoButton.appendChild(moreinfoButtonText);

  // Add a class to the button to change its css
  moreinfoButton.classList.add("more-info-button");

  //add to the end of item list
  item.appendChild(moreinfoButton);


  //add all details into modal when more info button is pressed 
  moreinfoButton.addEventListener("click", () => {
    // <strong> bolds the text
    //&nbsp is a non breaking space
    document.querySelector("#modal-date").innerHTML = `<strong>Date:</strong> &nbsp; ${formatDate(task.date)}`;
    document.querySelector("#modal-type").innerHTML = `<strong>Type:</strong> &nbsp; ${task.type}`;
    document.querySelector("#modal-start").innerHTML = `<strong>Start:</strong> &nbsp; ${task.start}`;
    document.querySelector("#modal-end").innerHTML = `<strong>End:</strong> &nbsp; ${task.end}`;
    document.querySelector("#modal-duration").innerHTML = `<strong>Duration:</strong> &nbsp; ${task.duration}`;
    document.querySelector("#modal-rating").innerHTML = `<strong>Rating:</strong> &nbsp; ${task.rating}`;
    document.querySelector("#modal-details").innerHTML = `<strong>Dream Details:</strong> &nbsp; ${task.details}`;
    showModal();
  });


  //create the delete button
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);

  // Add a class to the button to change its css
  delButton.classList.add("del-button");

  //add to the end of item list
  item.appendChild(delButton);


  //create the function for when the delete button is pressed
  delButton.addEventListener("click", function (event) {
    item.remove();

    // Remove from taskList based on task id
    taskList = taskList.filter(t => t.id != task.id); 

    // Update local storage
    localStorage.setItem('taskList', JSON.stringify(taskList)); 

    //update chart
    drawChart();

    //update entry counter
    updateEntryCounter();

  });

}



//draw the google chart
function drawChart() {

  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Date');
  data.addColumn('number', 'Sleep Duration (hours)');

  // Filter tasks to include only "Full Nights Sleep" entries
  const fullNightSleepTasks = taskList.filter(task => task.type === "Full Nights Sleep");

  // Sort tasks by date (most recent first)
  // limit to the past 7 entries, then reverse the order. (more logical to see new entries get added from left to right)
  const sortedTasks = fullNightSleepTasks
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7)
    .reverse();


  // Add rows to the data table
  sortedTasks.forEach(task => {
    const [hrs, mins] = task.duration.split(' ').map(part => parseInt(part));
    const duration = hrs + mins / 60;

    // Use formatDate function to make the date user-friendly
    const formattedDate = formatDate(task.date); 
    data.addRow([formattedDate, duration]);
  });

  const options = {
    title: 'Full Nights Sleep - Past 7 Logged Entries',
    // x-axis
    hAxis: {
      title: 'Date',
      titleTextStyle: { bold: true }
    },
    //y-axis
    vAxis: {
      title: 'Duration (hours)',
      titleTextStyle: { bold: true }
    },
    legend: 'none',

    //consistency using the same blue and white colours as the form
    colors: ['3291F1'],
    backgroundColor: '#ffffff'
  };

  //call and draw column chart
  const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(data, options);


  // Call average sleep type function below
  displayAverageRatings();

  // Call average sleep duration function below
  displayAverageSleepDuration();

}


// Calculate the average ratings for each sleep type
function calculateAverageRatings() {
  const averageRatings = {};

  // Initialise rating sums and counts for each sleep type
  const ratingSums = {
    "Full Nights Sleep": 0,
    "Power Nap": 0,
    "Restful Nap": 0
  };
  const ratingCounts = {
    "Full Nights Sleep": 0,
    "Power Nap": 0,
    "Restful Nap": 0
  };

  // Go through taskList to calculate sums and counts
  taskList.forEach(task => {
    ratingSums[task.type] += task.rating;
    ratingCounts[task.type]++;
  });

  // Calculate average ratings for each sleep type
  for (const type in ratingSums) {

    //checks for ratings for the current sleep type, if true and count is greater than 0, sum is divided by counter.
    //if false and there are no ratings, and makes the rating 0.
    averageRatings[type] = ratingCounts[type] > 0 ? ratingSums[type] / ratingCounts[type] : 0;
  }

  return averageRatings;
}


// Display average ratings in the DOM
function displayAverageRatings() {

  const averageRatings = calculateAverageRatings();
  const averageRatingsContainer = document.getElementById("ratings_div");

  // Clear previous content
  averageRatingsContainer.innerHTML = "";

  // Display average ratings for each sleep type
  for (const type in averageRatings) {

    // Round to 2 decimal places
    const rating = averageRatings[type].toFixed(2);
    const ratingElement = document.createElement("h3");

    //change the style to the sleep type and sleep rating
    ratingElement.innerHTML = `<h3> ${type}:</h3><p>${rating} / 5</p>`;

    //add the entire element into the container
    averageRatingsContainer.appendChild(ratingElement);
  }
}



// Calculate the average sleep duration for each sleep type
function calculateAverageSleepDuration() {
  const averageSleepDuration = {};

  // Initialise duration sums and counts for each sleep type
  const durationSums = {
    "Full Nights Sleep": { hours: 0, minutes: 0 },
    "Power Nap": { hours: 0, minutes: 0 },
    "Restful Nap": { hours: 0, minutes: 0 }
  };
  const durationCounts = {
    "Full Nights Sleep": 0,
    "Power Nap": 0,
    "Restful Nap": 0
  };

  // Go through taskList to calculate sums and counts
  taskList.forEach(task => {
    const [hrs, mins] = task.duration.split(' ').map(part => parseInt(part));
    durationSums[task.type].hours += hrs;
    durationSums[task.type].minutes += mins;
    durationCounts[task.type]++;
  });

  // Calculate average sleep duration for each sleep type
  for (const type in durationSums) {
    const totalMinutes = durationSums[type].hours * 60 + durationSums[type].minutes;
    const count = durationCounts[type];
    const avgTotalMinutes = count > 0 ? totalMinutes / count : 0;
    const avgHours = Math.floor(avgTotalMinutes / 60);
    const avgMinutes = Math.round(avgTotalMinutes % 60); // Round to the nearest minute
    averageSleepDuration[type] = { hours: avgHours, minutes: avgMinutes };
  }

  return averageSleepDuration;
}

// Display average sleep duration in the DOM
function displayAverageSleepDuration() {
  const averageSleepDuration = calculateAverageSleepDuration();
  const averageSleepContainer = document.getElementById("duration_div");

  // Clear previous content
  averageSleepContainer.innerHTML = "";

  // Display average sleep duration for each sleep type
  for (const type in averageSleepDuration) {
    const avgHours = averageSleepDuration[type].hours;
    const avgMinutes = averageSleepDuration[type].minutes;
    const sleepTypeElement = document.createElement("h3");
    sleepTypeElement.innerHTML = `<h3> ${type}:</h3><p>${avgHours} hours ${avgMinutes} minutes</p>`;
    averageSleepContainer.appendChild(sleepTypeElement);
  }
}