// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {
  // This will display the current day in the header
  var todaysDate = dayjs();
  $("#currentDay").text(todaysDate.format("dddd: MMM D, YYYY"));
  var currentTime = dayjs().hour();

  $(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //

    // Add a listener for click events on the save button
    $(".saveBtn").click(function (evt) {
      evt.preventDefault();
      var timeBlock = $(this).closest(".time-block");
      var timeBlockId = timeBlock.attr("id");
      var userInput = timeBlock.find(".description").val();
      // Saves user input in local storage using the time block's ID as a key
      localStorage.setItem(timeBlockId, userInput);
    });

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //

    // Applies past, present, or future classes to time blocks based on the current hour
    $(".time-block").each(function () {
      var timeBlock = $(this);
      var timeBlockId = timeBlock.attr("id");
      var parsedTime = parseInt(timeBlockId.split("-")[1]);

      if (parsedTime < currentTime) {
        timeBlock.addClass("past");
      } else if (parsedTime === currentTime) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }

      // TODO: Add code to get any user input that was saved in localStorage and set
      // the values of the corresponding textarea elements. HINT: How can the id
      // attribute of each time-block be used to do this?

      // The code below retrieves user input from local storage and sets the textarea's values
      var savedText = localStorage.getItem(timeBlockId);
      if (savedText !== null) {
        timeBlock.find(".description").val(savedText);
      }
    });
  });
});
