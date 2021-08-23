const addTask = document.querySelector(".form-add-task");
const inputAdd = document.querySelector(".input-add");
const taskWrapper = document.querySelector(".task");
const readyTask = document.querySelector(".ready");
const infoTask = document.querySelector(".info-task");
const main = document.querySelector(".tasks");

const addlist = [];
let color = "white";
let id = 0;

const setTask = {
  add(task) {
    if (!task.trim()) {
      alert("Введите данные");
      return;
    }
    const date = this.getDate();
    const tasks = { id, task, date, color };
    addlist.push(tasks);
    showAlltask(task, date, id);
    id += 1;
    this.saved();
  },
  getDate() {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = date.getFullYear();
    let time = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    date = mm + "." + dd + "." + yyyy + "  " + time + ":" + min + ":" + sec;
    return date;
  },
  ready(targetSection, idElement) {
    console.log(idElement);
    addlist.forEach((item) => {
      if (item.id == idElement) {
        if (targetSection.className == "task") {
          targetSection.classList.add("visi");
          item.color = "grin";
        } else {
          item.color = "white";
          targetSection.classList.remove("visi");
        }
      }
    });
    this.saved();
  },
  delete(targetSection, idElement) {
    addlist.forEach((item, index) => {
      if (item.id == idElement) {
        console.log(idElement)
        addlist.splice(index, 1);
        targetSection.remove();
      }
    });
    this.saved();
  },
  saved() {
    let serialObj = JSON.stringify(addlist);
    localStorage.setItem("tasks", serialObj);
    localStorage.setItem("id", id);
  },
};

const showAlltask = (task, date, idElement) => {
  let section = document.createElement("section");
  section.className = "task";
  let div = document.createElement("div");
  div.className = "info-task";
  let p1 = document.createElement("p");
  p1.className = "info-task-p";
  let p2 = document.createElement("p");
  let form = document.createElement("form");
  let button1 = document.createElement("button");
  button1.className = "ready button";
  let button2 = document.createElement("button");
  button2.className = "delete button";
  section.append(div);
  div.append(p1);
  div.append(p2);
  p1.append(task);
  p2.append(date);
  div.append(form);
  form.append(button1);
  button1.append("Выполнено");
  form.append(button2);
  button2.append("Удалить");
  main.append(section);

  button1.addEventListener("click", (event) => {
    event.preventDefault();
    setTask.ready(section, idElement);
  });

  button2.addEventListener("click", (event) => {
    event.preventDefault();
    setTask.delete(section,idElement);
  });
};

addTask.addEventListener("submit", (event) => {
  event.preventDefault();
  setTask.add(inputAdd.value);
  addTask.reset();
});

const init = () => {
  let returnID = JSON.parse(localStorage.getItem("id"));
  id = returnID ;
  let returnObj = JSON.parse(localStorage.getItem("tasks"));

  if (returnObj) {
    returnObj.forEach((item) => {
      addlist.push(item);
      let section = document.createElement("section");

      if (item.color == "grin") {
        section.className = "task visi";
      } else {
        section.className = "task";
      }

      let div = document.createElement("div");
      div.className = "info-task";
      let p1 = document.createElement("p");
      p1.className = "info-task-p";
      let p2 = document.createElement("p");
      let form = document.createElement("form");
      let button1 = document.createElement("button");
      button1.className = "ready button";
      let button2 = document.createElement("button");
      button2.className = "delete button";
      section.append(div);
      div.append(p1);
      div.append(p2);
      p1.append(item.task);
      p2.append(item.date);
      div.append(form);
      form.append(button1);
      button1.append("Выполнено");
      form.append(button2);
      button2.append("Удалить");
      main.append(section);

      button1.addEventListener("click", (event) => {
        event.preventDefault();
        setTask.ready(section, item.id);
      });

      button2.addEventListener("click", (event) => {
        event.preventDefault();
        setTask.delete(section, item.id);
      });
    });
  }
};

init();