function setInitialProgress() {
  const progress1 = 50;
  const progress2 = 50;
  const progressBar1 = document.getElementById("progressBar1");
  const progressText1 = document.getElementById("progressText1");
  setTimeout(() => {
    progressBar1.style.width = progress1 + "%";
    progressText1.textContent = progress1 + "%";
  }, 100);
  const progressBar2 = document.getElementById("progressBar2");
  const progressText2 = document.getElementById("progressText2");
  setTimeout(() => {
    progressBar2.style.width = progress2 + "%";
    progressText2.textContent = progress2 + "%";
  }, 100);
}













function changeColor(selectedItem,no) {
  let title = document.getElementById('title');
  title.innerText=no;
  const items = document.getElementsByTagName('li');
  const contents = document.getElementsByClassName('content');
  for (let item of items) {
      item.classList.remove('active');
  }
  for (let content of contents) {
      content.classList.remove('active');
  }
  selectedItem.classList.add('active');
  const selectedContentId = selectedItem.innerText.trim().toLowerCase() + 'Content';
  const selectedContent = document.getElementById(selectedContentId);
  selectedContent.classList.add('active');
}














document.addEventListener("DOMContentLoaded", setInitialProgress);
function runLinearSearch() {
  const data = [5, 3, 8, 6, 2, 7, 10, 29];
  const target = parseInt(document.getElementById("targetValue").value);
  d3.select("#visualization").html("");

  const svg = d3.select("#visualization").append("svg")
      .attr("width", 500)
      .attr("height", 100);

  svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 60)
      .attr("y", 30)
      .attr("width", 50)
      .attr("height", 50)
      .attr("fill", "steelblue");

  svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 60 + 20)
      .attr("y", 60)
      .attr("fill", "white")
      .text(d => d);

  let index = 0;
  function highlightNext() {
      if (index < data.length) {
          svg.selectAll("rect").attr("fill", (d, i) => i === index ? "orange" : "steelblue");
          if (data[index] === target) {
              let output = document.getElementById('output');
              output.innerText = `Target ${target} found at index ${index}`;
              return;
          }
          index++;
          setTimeout(highlightNext, 1000);
      } else {
          let output = document.getElementById('output');
          output.innerText = "Target not found in the array";
      }
  }
  highlightNext();
}
const calendarElement = document.getElementById('calendar');
let streakDays = [1, 2, 5, 6, 7, 15];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
dayNames.forEach(day => {
  const dayElement = document.createElement('div');
  dayElement.classList.add('day-name');
  dayElement.textContent = day;
  calendarElement.appendChild(dayElement);
});
function createCalendar() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) {
    calendarElement.appendChild(document.createElement('div'));
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.textContent = day;
    if (streakDays.includes(day)) {
      dayElement.classList.add('streak-day');
    }
    dayElement.addEventListener('click', () => {
      dayElement.classList.toggle('streak-day');
      if (streakDays.includes(day)) {
        streakDays = streakDays.filter(d => d !== day);
      } else {
        streakDays.push(day);
      }
    });

    calendarElement.appendChild(dayElement);
  }
}
createCalendar();