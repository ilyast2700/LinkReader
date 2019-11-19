function loadFile() {
  var input, file, fr;

  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileinput');
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  }
  else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

//Active percentage section
  let progress = document.querySelector('.percent'); //Working class
  function updateProgress(loaded, total) {
    let percentLoaded = Math.round((loaded / total) * 100);
    if (percentLoaded <= 100) {
      progress.style.opacity = 1;
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
      console.log('Percents done = ' + percentLoaded + '%');
    }
  }


  function receivedText(e) {

    let lines = e.target.result;
    let newArr = JSON.parse(lines);
    let length = Object.keys(newArr[0]).length;
    let i = 0;

    function theLoop() {

      setTimeout(function() {
        console.log(newArr[0][i]); //Unnecessary stuff
        console.log('i = ' + i); //Unnecessary stuff
//<<<< Uncomment below to open links in browser >>>>
        //window.open(newArr[0][i]);
        i++;
        updateProgress(i, length);
        if (i < length) {
          theLoop();
        }
      }, 3500);  //Change timeout ms

    }
    theLoop();

  }
}
