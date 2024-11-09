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
function loadAlgorithm(algorithm) {
  let title = '';
  let description = '';
  let complexity = '';
  const startButton = document.getElementById('startButton');
  const targetInputContainer = document.getElementById('targetInputContainer');
  let data = [];

  // Prompt the user to enter an array
  let userArray = prompt("Enter the array elements separated by commas:");
  if (userArray) {
      data = userArray.split(',').map(Number);
  }

  // Choose algorithm details based on selection
  switch (algorithm) {
      case 'linearSearch':
          title = 'Linear Search Visualization';
          description = 'Sequentially checks each element until the target is found.';
          complexity = 'O(n) - Time Complexity';
          startButton.onclick = () => runLinearSearch(data);
          targetInputContainer.style.display = 'block';
          break;
      case 'binarySearch':
          title = 'Binary Search Visualization';
          description = 'Divides the array and searches recursively.';
          complexity = 'O(log n) - Time Complexity';
          startButton.onclick = () => runBinarySearch(data);
          targetInputContainer.style.display = 'block';
          break;
      case 'hashing':
          title = 'Hashing Visualization';
          description = 'Maps values to fixed indices using a hash function.';
          complexity = 'O(1) - Average Time Complexity';
          startButton.onclick = () => runHashing(data);
          targetInputContainer.style.display = 'none';
          break;
      case 'bubbleSort':
          title = 'Bubble Sort Visualization';
          description = 'Swaps adjacent elements if they are in the wrong order.';
          complexity = 'O(n^2) - Time Complexity';
          startButton.onclick = () => runBubbleSort(data);
          targetInputContainer.style.display = 'none';
          break;
      case 'selectionSort':
          title = 'Selection Sort Visualization';
          description = 'Finds the minimum element and places it at the beginning.';
          complexity = 'O(n^2) - Time Complexity';
          startButton.onclick = () => runSelectionSort(data);
          targetInputContainer.style.display = 'none';
          break;
      case 'insertionSort':
          title = 'Insertion Sort Visualization';
          description = 'Builds a sorted array by inserting elements one by one.';
          complexity = 'O(n^2) - Time Complexity';
          startButton.onclick = () => runInsertionSort(data);
          targetInputContainer.style.display = 'none';
          break;
  }

  document.getElementById('algorithmTitle').innerText = title;
  document.getElementById('algorithmDescription').innerText = description;
  document.getElementById('timeComplexity').innerText = complexity;
}

// Adjusted algorithms to take 'data' as a parameter
function runLinearSearch(data) {
  const target = parseInt(document.getElementById("targetValue").value);
  d3.select("#visualization").html("");

  // Visualization setup
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
              document.getElementById('output').innerText = `Target ${target} found at index ${index}`;
              return;
          }
          index++;
          setTimeout(highlightNext, 500);
      } else {
          document.getElementById('output').innerText = "Target not found";
      }
  }
  highlightNext();
}

function runBinarySearch(data) {
  data.sort((a, b) => a - b); // Ensure array is sorted for binary search
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

  let left = 0;
  let right = data.length - 1;

  function highlightNext() {
      if (left <= right) {
          const mid = Math.floor((left + right) / 2);
          svg.selectAll("rect").attr("fill", (d, i) => i === mid ? "orange" : "steelblue");

          if (data[mid] === target) {
              document.getElementById('output').innerText = `Target ${target} found at index ${mid}`;
              return;
          } else if (data[mid] < target) {
              left = mid + 1;
          } else {
              right = mid - 1;
          }
          setTimeout(highlightNext, 1000);
      } else {
          document.getElementById('output').innerText = "Target not found in the array";
      }
  }
  highlightNext();
}

// Modify other algorithms similarly, by accepting 'data' parameter
// Example for runBubbleSort:
function runBubbleSort(data) {
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

  let i = 0, j = 0;

  function bubbleStep() {
      if (i < data.length) {
          if (j < data.length - i - 1) {
              svg.selectAll("rect").attr("fill", (d, index) => (index === j || index === j + 1) ? "orange" : "steelblue");

              if (data[j] > data[j + 1]) {
                  [data[j], data[j + 1]] = [data[j + 1], data[j]];
                  svg.selectAll("text").data(data).text(d => d);
              }
              j++;
          } else {
              j = 0;
              i++;
          }
          setTimeout(bubbleStep, 500);
      }
  }
  bubbleStep();
}

// Similarly update runSelectionSort, runInsertionSort, and runHashing functions


const initialColor = "rgb(63, 81, 181)";
const considerColor = "#ff931e";
const minElementColor = "#5C038C";
const maxElementColor = "#1B1734";

let elements = [];
let noElement = 10;

const generateRandomElements = (start, end) => {
    return Math.floor(Math.random() * (end - start - 1) + start);
};

const generateRandomArray = () => {
    const temp = [];
    for (let i = 0; i < noElement; i++) {
        temp.push(generateRandomElements(10, 100));
    }
    elements = temp;
    renderArray();
};

const renderArray = () => {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    elements.forEach((value, idx) => {
        const elementDiv = document.createElement('div');
        elementDiv.className = 'array-element';
        elementDiv.setAttribute('data-index', idx);

        const elementPara = document.createElement('p');
        elementPara.textContent = value;

        const indexLabel = document.createElement('span');
        indexLabel.className = 'index-label';
        indexLabel.textContent = idx;

        elementDiv.appendChild(indexLabel);
        elementDiv.appendChild(elementPara);
        arrayContainer.appendChild(elementDiv);
    });
};

const highlightElement = (index, color) => {
    const elements = document.getElementsByClassName('array-element');
    setTimeout(() => {
        elements[index].style.backgroundColor = color;
    }, 500);
    setTimeout(() => {
        elements[index].style.backgroundColor = initialColor;
    }, 1000);
};

const handleNewInput = () => {
    const index = parseInt(document.getElementById('index-input').value);
    const newElement = parseInt(document.getElementById('element-input').value);

    if (isNaN(newElement) || isNaN(index) || index > elements.length || index < 0) {
        alert('Please enter a valid index and number');
        return;
    }

    elements.splice(index, 0, newElement);
    animateInsert(index);
};

const handleDelete = () => {
    const deleteIndex = parseInt(document.getElementById('delete-index-input').value);

    if (isNaN(deleteIndex) || deleteIndex >= elements.length || deleteIndex < 0) {
        alert('Please enter a valid index to delete');
        return;
    }

    animateDelete(deleteIndex);
};

const findMin = () => {
    let minIndex = 0;
    elements.forEach((value, idx) => {
        setTimeout(() => {
            highlightElement(idx, considerColor);
            if (elements[idx] < elements[minIndex]) minIndex = idx;
            if (idx === elements.length - 1) highlightElement(minIndex, minElementColor);
        }, idx * 500);
    });
};

const findMax = () => {
    let maxIndex = 0;
    elements.forEach((value, idx) => {
        setTimeout(() => {
            highlightElement(idx, considerColor);
            if (elements[idx] > elements[maxIndex]) maxIndex = idx;
            if (idx === elements.length - 1) highlightElement(maxIndex, maxElementColor);
        }, idx * 500);
    });
};

const removeDuplicate = () => {
    const uniqueElements = [];
    elements.forEach((value, idx) => {
        setTimeout(() => {
            if (!uniqueElements.includes(value)) {
                uniqueElements.push(value);
                highlightElement(idx, 'green');
            } else {
                highlightElement(idx, 'red');
            }
            if (idx === elements.length - 1) {
                elements = uniqueElements;
                renderArray();
            }
        }, idx * 500);
    });
};

const animateInsert = (index) => {
    renderArray();
    const elements = document.getElementsByClassName('array-element');
    elements[index].style.transform = "scale(1.2)";
    setTimeout(() => {
        elements[index].style.transform = "scale(1)";
    }, 500);
};

const animateDelete = (index) => {
    const elements = document.getElementsByClassName('array-element');
    elements[index].style.backgroundColor = "red";
    setTimeout(() => {
        elements[index].remove();
        elements.splice(index, 1);
        renderArray();
    }, 500);
};

window.onload = () => {
    generateRandomArray();
};