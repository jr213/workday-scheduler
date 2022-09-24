let $currentDay = $("#currentDay");
let $timeBlock = $(".time-block");
let $weekContainer = $(".schedule");

let todoList = [];
 
let currentDate = moment().format("dddd, MMMM Do");
let currentHour = moment().format("H");

function setSchedule(){

  $timeBlock.each(function(){
    let $thisBlock = $(this);
    let thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    let todoObj = {
      hour: thisBlockHr,
      text: "",
    }
    todoList.push(todoObj);
  });

  localStorage.setItem("todoObj", (todoList));
}

function setBlock(){
    $timeBlock.each(function(){
      let $thisBlock = $(this);
      let thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
  todoList = localStorage.getItem("todos");
  todoList = JSON.stringify(todoList);

  for (let i = 0; i < todoList.length; i++){
    let itemHour = todoList[i].hour;
    let itemText = todoList[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(todoList);
}

function saveHandler(){
  let $thisBlock = $(this).parent();

  let hourUpdate = $(this).parent().attr("data-hour");
  let itemToAdd = (($(this).parent()).children("textarea")).val();

  for (let i = 0; i < todoList.length; i++){
    if (todoList[i].hour == hourUpdate){
      todoList[i].text = itemToAdd;
    }
  }
  localStorage.setItem("todos"(todoList));
  renderSchedule();
}
$(document).ready(function(){
  setBlock();
  if(localStorage.getItem("todos")){
    setSchedule();
  } 
  $currentDay.text(currentDate);
  renderSchedule();
  $weekContainer.on("click", "button", saveHandler);
  
});