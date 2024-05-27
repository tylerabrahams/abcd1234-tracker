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
  updateAverages(); // Update averages with existing data
};

//add tasks and push onto the array
function addTask(date, type, start, end, rating, details) {
  let task = {
    id: Date.now(), // Generate a unique ID for each task
    date: date,
    type: type,
    start: start,
    end: end,
    rating: parseInt(rating),
    details: details,
    duration: calculateSleepDuration(start, end)
  };

  taskList.push(task);
  localStorage.setItem('taskList', JSON.stringify(taskList)); // Update local storage
  displayTask(task); // Pass the newly added task to displayTask

  drawChart(); // Update chart with new data
  updateAverages(); // Update averages with new data
}

//use math to calculate the sleep duration using inputted start and end times
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


//access modal to get more information on items in tasklist
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
    <p><strong>Date:</strong> ${task.date}</p>
    <p><strong>Type:</strong> ${task.type}</p>
    <p><strong>Rating:</strong> ${task.rating}</p>
    
  `;
  //<p><strong>Start:</strong> ${task.start}</p>
  //<p><strong>End:</strong> ${task.end}</p>
  //<p><strong>Duration:</strong> ${task.duration}</p>
  //<p><strong>Dream Details:</strong> ${task.details}</p>


  //insert image
  item.insertBefore(img, item.firstChild); // Insert the image at the beginning

  //insert items
  tasklist.appendChild(item);



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
    document.querySelector("#modal-date").textContent = `Date: ${task.date}`;
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
    updateAverages(); // Update averages after deletion
  });

  
}


//draw the google chart
function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Date');
  data.addColumn('number', 'Sleep Duration (hours)');

  taskList.forEach(task => {
    const [hrs, mins] = task.duration.split(' ').map(part => parseInt(part));
    const duration = hrs + mins / 60;
    data.addRow([task.date, duration]);
  });

  const options = {
    title: 'Sleep Duration Over Time',
    hAxis: { title: 'Date' },
    vAxis: { title: 'Duration (hours)' },
    legend: 'none',
    colors: ['#1c91c0'],
    backgroundColor: '#f1f8e9'
  };

  const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}