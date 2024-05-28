// Initialize Google Charts
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

//define array taskList
let taskList = [];

//define mapping between sleep types and corresponding image
const sleepTypeImages = {
  "Full Nights Sleep": "photos/sleep.jpeg",
  "Power Nap": "photos/power-nap.png",
  "Restful Nap": "photos/restful-nap.jpeg"
};

// Retrieve tasks from local storage when the page loads
window.onload = function () {
  let storedTasks = JSON.parse(localStorage.getItem('taskList'));
  if (storedTasks !== null) {
    taskList = storedTasks;
    taskList.forEach(task => displayTask(task));
  }
  drawChart(); // Draw chart with existing data



  //Example test data is for demonstrative purposes only, to show functionality once multiple entires have been made.
  // Define a unique ID's for the example tasks
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

  // Check if each example task already exists before adding
  exampleTasks.forEach(task => {
    if (!taskList.some(t => t.id === task.id)) {
      addTask(task.date, task.type, task.start, task.end, task.rating, task.details, task.id);
      console.log(task.date);
    }
  });
};




//add tasks and push onto the array
function addTask(date, type, start, end, rating, details, id = Date.now()) {
  let task = {
    // id: Date.now(), // Generate a unique ID for each task

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
  localStorage.setItem('taskList', JSON.stringify(taskList)); // Update local storage
  displayTask(task); // Pass the newly added task to displayTask

  drawChart(); // Update chart with new data
}



// Function to format the date to make it user friendly
// previously yy/mm/dd, now it will show weekday dd/mm/yy
function formatDate(dateString) {
  const options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options); // 'en-GB' is for British English locale
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


//create function for when submit button is pressed
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = form.elements.sleepDate.value;
  const type = form.elements.taskType.value;
  const start = form.elements.sleepStart.value;
  const end = form.elements.sleepEnd.value;
  const rating = form.elements.sleepRating.value;
  const details = form.elements.dreamDetails.value;

  if (date && type && start && end && rating) {
    addTask(date, type, start, end, rating, details);
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



//create the tasks in a list
function displayTask(task) {
  let item = document.createElement("li");
  item.setAttribute("data-id", task.id);

  //include image based on sleep type
  let img = document.createElement("img");
  img.src = sleepTypeImages[task.type];
  img.alt = task.type;
  img.classList.add("sleep-type-image");


  item.innerHTML = `
    <p><strong>Date:</strong> ${formatDate(task.date)}</p>
    <p><strong>Duration:</strong> ${task.duration}</p>
    <p><strong>Rating:</strong> ${task.rating}</p>
  `;
  //<p><strong>Type:</strong> ${task.type}</p>
  //<p><strong>Start:</strong> ${task.start}</p>
  //<p><strong>End:</strong> ${task.end}</p>
  //<p><strong>Dream Details:</strong> ${task.details}</p>


  //insert image
  item.insertBefore(img, item.firstChild); // Insert the image at the beginning


  //insert item
  // tasklist.appendChild(item);

  // Prepend item so new tasks get added to the top of page
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
    document.querySelector("#modal-date").textContent = `Date: ${formatDate(task.date)}`;
    document.querySelector("#modal-type").textContent = `Type: ${task.type}`;
    document.querySelector("#modal-start").textContent = `Start: ${task.start}`;
    document.querySelector("#modal-end").textContent = `End: ${task.end}`;
    document.querySelector("#modal-duration").textContent = `Duration: ${task.duration}`;
    document.querySelector("#modal-rating").textContent = `Rating: ${task.rating}`;
    document.querySelector("#modal-details").textContent = `Details: ${task.details}`;
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
    taskList = taskList.filter(t => t.id != task.id); // Remove from taskList based on task id
    localStorage.setItem('taskList', JSON.stringify(taskList)); // Update local storage



    drawChart(); // Update chart after deletion
  });


}




//draw the google chart
function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Date');
  data.addColumn('number', 'Sleep Duration (hours)');

  // Filter tasks to include only "Full Nights Sleep" entries
  const fullNightSleepTasks = taskList.filter(task => task.type === "Full Nights Sleep");

  // Sort tasks by date (most recent first), limit to the past 7 entries, and then reverse the order.
  // More logical to see new entries get added from left to right
  const sortedTasks = fullNightSleepTasks
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7)
    .reverse();


  // Add rows to the data table
  sortedTasks.forEach(task => {
    const [hrs, mins] = task.duration.split(' ').map(part => parseInt(part));
    const duration = hrs + mins / 60;
    const formattedDate = formatDate(task.date); // Use formatDate function to make the date user-friendly
    data.addRow([formattedDate, duration]);
  });

  const options = {
    title: 'Full Nights Sleep - Past 7 Logged Entries',
    hAxis: { title: 'Date' },
    vAxis: { title: 'Duration (hours)' },
    legend: 'none',

    //same colours as form
    colors: ['3291F1'],
    backgroundColor: '#ffffff'
  };

  const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}