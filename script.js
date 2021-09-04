// const meetingLinks = [
//   {
//     id: new Date().toISOString(),
//     event: "Manjarkom",
//     link: [
//       "https://meet.google.com/fib-ibmu-jys",
//       "https://meet.google.com/fib-ibmu-abs",
//     ],
//     date: "Kamis",
//     start_time: "15:00",
//     end_time: "18:00",
//   },
// ];

const titleMain = document.getElementById("titleMain");
const titleAdd = document.getElementById("titleAdd");
const titleUpdate = document.getElementById("titleUpdate");

const btnNew = document.getElementById("btn-new");
const btnCancel = document.getElementById("btn-cancel");
const btnClear = document.getElementById("clear");

let btnUpdate;

const meetingList = document.getElementById("meetingList");
const modalAdd = document.getElementById("modal-add");
const modalUpdate = document.getElementById("modal-update");

let allData = [];

function getAllData() {
  allData = JSON.parse(localStorage.getItem("meetingLinks"));
}

const getUpdate = function () {
  if (titleMain.classList.contains("hidden")) {
    titleMain.classList.remove("hidden");
  } else {
    titleMain.classList.add("hidden");
  }

  if (titleUpdate.classList.contains("hidden")) {
    titleUpdate.classList.remove("hidden");
  } else {
    titleUpdate.classList.add("hidden");
  }

  if (!meetingList.classList.contains("hidden")) {
    meetingList.classList.add("hidden");
  } else {
    meetingList.classList.remove("hidden");
  }

  if (modalUpdate.classList.contains("hidden")) {
    modalUpdate.classList.remove("hidden");
  } else {
    modalUpdate.classList.add("hidden");
  }

  if (btnCancel.classList.contains("hidden")) {
    btnCancel.classList.remove("hidden");
  } else {
    btnCancel.classList.add("hidden");
  }

  if (btnNew.classList.contains("hidden")) {
    btnNew.classList.remove("hidden");
  } else {
    btnNew.classList.add("hidden");
  }

  const id = this.getAttribute("data-id");
  const eventName = this.getAttribute("data-event").split(",").join(" ");
  const link = this.getAttribute("data-link");
  const start_time = this.getAttribute("data-start_time");
  const end_time = this.getAttribute("data-end_time");
  const date = this.getAttribute("data-date");

  const updateEvent = document.getElementById("updateEvent");
  const updateLink = document.getElementById("updateLink");
  const updateStart = document.getElementById("updateStart");
  const updateEnd = document.getElementById("updateEnd");
  const updateDate = document.getElementById("updateDate");

  updateEvent.value = eventName;
  updateLink.value = link;
  updateStart.value = start_time;
  updateEnd.value = end_time;
  updateDate.value = date;

  const objIndex = allData.findIndex((obj) => obj.id == id);

  const btnUpdateData = document.getElementById("btn-updateData");
  btnUpdateData.addEventListener("click", function () {
    allData[objIndex].link = updateLink.value;
    allData[objIndex].event = updateEvent.value;
    allData[objIndex].start_time = updateStart.value;
    allData[objIndex].end_time = updateEnd.value;
    allData[objIndex].date = updateDate.value;
    localStorage.setItem("meetingLinks", JSON.stringify(allData));
  });
};

function getDelete() {
  const id = this.getAttribute("data-id");

  const newData = allData.filter((item) => item.id !== id);
  allData = newData;
  localStorage.setItem("meetingLinks", JSON.stringify(allData));
  reloadList();
}

function reloadList() {
  getAllData();
  console.log(allData);
  const listClass = document.getElementById("list-class");
  const noMeet = document.getElementById("noMeet");
  if (allData == null || allData.length < 1) {
    btnClear.classList.add("hidden");
    noMeet.classList.remove("hidden");
    listClass.innerHTML = "";
    return;
  } else {
    btnClear.classList.remove("hidden");
    noMeet.classList.add("hidden");
  }

  const childElement = allData
    .map((item) => {
      let cdData = "";
      const nameEvent = item.event.split(" ");
      cdData += "<li>";

      cdData += "<div class='class-title'>";
      cdData += "<span class='event'>" + item.event + " | ";
      cdData +=
        "<span class='day text-dark-blue'>" + item.date + "</span>" + " | ";
      cdData += "<span class='time text-tomato'>";
      cdData +=
        "<span>" +
        item.start_time +
        "</span>" +
        " - " +
        "<span>" +
        item.end_time +
        "</span>";
      cdData += "</span>";
      cdData += "</span>";

      cdData += "<div>";
      cdData +=
        "<span class='btn-update' data-end_time=" +
        item.end_time +
        " data-start_time=" +
        item.start_time +
        " data-date=" +
        item.date +
        " data-link=" +
        item.link +
        " data-id=" +
        item.id +
        " data-event=" +
        nameEvent +
        ">";
      cdData += "<i class='fas fa-edit fa-sm text-warning'></i>";
      cdData += "</span>";

      cdData += "<span class='btn-delete' data-id=" + item.id + ">";
      cdData += "<i class='fas fa-trash-alt fa-sm text-tomato'></i>";
      cdData += "</span>";

      cdData += "</div>";
      cdData += "</div>";

      cdData += "<ul class='list-link'>";

      cdData += "<li>";
      cdData += "<a target='_blank' href=" + `${item.link}` + ">";
      cdData += `${item.link}`;
      cdData += "</a>";
      cdData += "</li>";

      cdData += "</ul>";

      cdData += "</li>";

      return cdData;
    })
    .join("");

  listClass.innerHTML = childElement;
  btnUpdate = document.querySelectorAll(".btn-update");
  btnDelete = document.querySelectorAll(".btn-delete");
  btnUpdate.forEach((el) => el.addEventListener("click", getUpdate));
  btnDelete.forEach((el) => el.addEventListener("click", getDelete));
}

window.onload = reloadList();

function clearData() {
  localStorage.removeItem("meetingLinks");
  reloadList();
}

btnClear.addEventListener("click", function () {
  clearData();
});

btnNew.addEventListener("click", function () {
  const btnSubmit = document.getElementById("btn-submit");

  btnSubmit.addEventListener("click", function () {
    const eventName = document.getElementById("eventName").value;
    const link = document.getElementById("link").value;
    const date = document.getElementById("date").value;
    const start_time = document.getElementById("start_time").value;
    const end_time = document.getElementById("end_time").value;

    console.log("event: ", eventName);
    const newData = {
      id: new Date().toISOString(),
      event: eventName,
      link: link,
      date: date,
      start_time: start_time,
      end_time: end_time,
    };

    if (allData == null) {
      allData = [newData];
    } else {
      allData.push(newData);
    }
    localStorage.setItem("meetingLinks", JSON.stringify(allData));
  });

  titleMain.classList.add("hidden");
  titleAdd.classList.remove("hidden");
  meetingList.classList.add("hidden");
  btnNew.classList.add("hidden");
  modalAdd.classList.remove("hidden");
  btnCancel.classList.remove("hidden");
});

btnCancel.addEventListener("click", function () {
  reloadList();

  if (titleMain.classList.contains("hidden")) {
    titleMain.classList.remove("hidden");
  } else {
    titleMain.classList.add("hidden");
  }

  if (
    titleUpdate.classList.contains("hidden") &&
    !titleAdd.classList.contains("hidden")
  ) {
    titleAdd.classList.add("hidden");
  } else {
    titleUpdate.classList.add("hidden");
  }

  if (!meetingList.classList.contains("hidden")) {
    meetingList.classList.add("hidden");
  } else {
    meetingList.classList.remove("hidden");
  }

  if (
    modalUpdate.classList.contains("hidden") &&
    !modalAdd.classList.contains("hidden")
  ) {
    modalAdd.classList.add("hidden");
  } else {
    modalUpdate.classList.add("hidden");
  }

  if (btnCancel.classList.contains("hidden")) {
    btnCancel.classList.remove("hidden");
  } else {
    btnCancel.classList.add("hidden");
  }

  if (btnNew.classList.contains("hidden")) {
    btnNew.classList.remove("hidden");
  } else {
    btnNew.classList.add("hidden");
  }
});
