const LangStorage = "meetLinkLang";
const MeetStorage = "meetingLinks";
let selectedLang = localStorage.getItem(LangStorage);

const setLanguage = (lang) => {
  localStorage.setItem(LangStorage, lang);
  selectedLang = lang;
};

const languageAvailable = ["Indonesia", "English"];
const language = selectedLang ? selectedLang : "English";

const whichLanguage = (english, bahasa) => {
  return language == "English" ? english : bahasa;
};

const displayLanguage = {
  // Button
  clearBtn: whichLanguage("Clear all meeting", "Hapus semua rapat"),
  addLinkBtn: whichLanguage("New meeting", "Rapat baru"),
  cancelBtn: whichLanguage("Cancel", "Batal"),
  submitBtn: whichLanguage("Submit", "Submit"),
  updateBtn: whichLanguage("Update", "Perbarui"),

  // Title
  addTitle: whichLanguage("Add new meeting", "Tambah Rapat baru"),
  updateTitle: whichLanguage("Update meeting", "Perbarui Rapat"),

  // Input field
  meetingName: whichLanguage("Meeting Name", "Nama Rapat"),
  meetingLink: whichLanguage("Meeting Link", "Link Rapat"),
  dayDate: whichLanguage("Date", "Tanggal"),
  isRepeat: whichLanguage("Repeat every week", "Ulangi setiap minggu"),
  startTime: whichLanguage("Start Time", "Waktu Mulai"),
  endTime: whichLanguage("End Time", "Waktu Berakhir"),

  // Placeholder input
  meetingPlaceholder: whichLanguage("Meeting name here", "Masukan nama rapat"),
  linkPlaceholder: whichLanguage("Meeting link here", "Masukan link rapat"),
  startPlaceholder: whichLanguage("16:00", "16:00"),
  endPlaceholder: whichLanguage("17:00", "17:00"),

  repetead: whichLanguage("Repeated", "Setiap"),

  // Date format
  dateRegion: whichLanguage("en-US", "id"),
};

const titleMain = document.getElementById("titleMain");
const titleAdd = document.getElementById("titleAdd");
const titleUpdate = document.getElementById("titleUpdate");
const titleAddBtn = document.getElementById("titleAddBtn");

const btnNew = document.getElementById("btn-new");
const btnCancel = document.getElementById("btn-cancel");
const btnClear = document.getElementById("clear");
const btnSetting = document.getElementById("btn-setting");

let btnUpdate;

const meetingList = document.getElementById("meetingList");
const modalAdd = document.getElementById("modal-add");
const modalUpdate = document.getElementById("modal-update");
const modalSetting = document.getElementById("modal-setting");
const mainPage = document.getElementById("main-page");

let allData = [];

const labelMeeting = document.getElementsByClassName("labelMeeting");
const labelLink = document.getElementsByClassName("labelLink");
const labelDate = document.getElementsByClassName("labelDate");
const labelCheck = document.getElementsByClassName("labelCheck");
const labelStart = document.getElementsByClassName("labelStart");
const labelEnd = document.getElementsByClassName("labelEnd");

const meetingPlaceholder = document.getElementsByClassName("eventName");
const linkPlaceholder = document.getElementsByClassName("link");
const StartPlaceholder = document.getElementsByClassName("start_time");
const endPlaceholder = document.getElementsByClassName("end_time");

const changeLanguageDisplay = () => {
  titleAdd.textContent = displayLanguage.addTitle;
  titleUpdate.textContent = displayLanguage.updateTitle;
  titleAddBtn.textContent = displayLanguage.addLinkBtn;
  btnClear.textContent = displayLanguage.clearBtn;
  btnCancel.textContent = displayLanguage.cancelBtn;

  // Label input
  for (let i = 0; i < labelMeeting.length; i++) {
    labelMeeting[i].textContent = displayLanguage.meetingName;
    labelLink[i].textContent = displayLanguage.meetingLink;
    labelDate[i].textContent = displayLanguage.dayDate;
    labelCheck[i].textContent = displayLanguage.isRepeat;
    labelStart[i].textContent = displayLanguage.startTime;
    labelEnd[i].textContent = displayLanguage.endTime;
  }

  for (let i = 0; i < meetingPlaceholder.length; i++) {
    meetingPlaceholder[i].placeholder = displayLanguage.meetingPlaceholder;
    linkPlaceholder[i].placeholder = displayLanguage.linkPlaceholder;
    StartPlaceholder[i].placeholder = displayLanguage.startPlaceholder;
    endPlaceholder[i].placeholder = displayLanguage.endPlaceholder;
  }
};

const timepicker = new TimePicker(
  ["start_time", "end_time", "updateStart", "updateEnd"],
  {
    lang: "en",
    theme: "dark",
  }
);
timepicker.on("change", function (evt) {
  var value = (evt.hour || "00") + ":" + (evt.minute || "00");
  evt.element.value = value;
});

const isEmpty = (str) => !str.trim().length;

function getAllData() {
  allData = JSON.parse(localStorage.getItem(MeetStorage));
}

function changeInputType(oldObject, oType, oValue) {
  var newObject = document.createElement("input");
  newObject.type = oType;
  newObject.value = oValue;
  if (oldObject.name) newObject.name = oldObject.name;
  if (oldObject.id) newObject.id = oldObject.id;
  if (oldObject.className) newObject.className = oldObject.className;
  oldObject.parentNode.replaceChild(newObject, oldObject);
  return newObject;
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

  if (!modalSetting.classList.contains("hidden")) {
    // modalSetting.classList.remove("hidden");
    modalSetting.classList.add("hidden");
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
  const repeat = document.getElementById("repeatUpdate");

  updateEvent.value = eventName;
  updateLink.value = link;
  updateStart.value = start_time;
  updateEnd.value = end_time;

  const objIndex = allData.findIndex((obj) => obj.id == id);

  repeat.checked = allData[objIndex].repeat;
  const newDate = new Date(allData[objIndex].date);
  const day = ("0" + newDate.getDate()).slice(-2);
  const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  updateDate.value = `${newDate.getFullYear()}-${month}-${day}`;

  const btnUpdateData = document.getElementById("btn-updateData");
  btnUpdateData.addEventListener("click", function () {
    if (
      isEmpty(updateEvent.value) ||
      isEmpty(updateLink.value) ||
      isEmpty(updateDate.value) ||
      isEmpty(updateStart.value) ||
      isEmpty(updateEnd.value)
    ) {
      alert("Please fill all required field");
      return;
    }

    const newDate = new Date(updateDate.value);

    const optionsDate = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const pickDate = new Intl.DateTimeFormat(
      displayLanguage.dateRegion,
      optionsDate
    ).format(newDate);

    allData[objIndex].link = updateLink.value;
    allData[objIndex].event = updateEvent.value;
    allData[objIndex].start_time = updateStart.value;
    allData[objIndex].end_time = updateEnd.value;
    allData[objIndex].date = pickDate;
    allData[objIndex].repeat = repeat.checked;
    localStorage.setItem(MeetStorage, JSON.stringify(allData));
  });
};

function getDelete() {
  const id = this.getAttribute("data-id");

  const newData = allData.filter((item) => item.id !== id);
  allData = newData;
  localStorage.setItem(MeetStorage, JSON.stringify(allData));
  reloadList();
}

function reloadList() {
  getAllData();
  changeLanguageDisplay();
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

      const newDate = new Date(item.date);

      let optionsDate = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      if (item.repeat == true) {
        optionsDate = { weekday: "long" };
      }

      let pickDate = new Intl.DateTimeFormat(
        displayLanguage.dateRegion,
        optionsDate
      ).format(newDate);
      pickDate = item.repeat
        ? `<span class="repeatedSpan">{${displayLanguage.repetead}}</span> ${pickDate}`
        : pickDate;

      cdData += "<li>";

      cdData += "<div class='class-title'>";
      cdData += "<span class='event'>" + item.event + "<br>";
      cdData +=
        "<span class='day text-dark-blue'>" + pickDate + "</span>" + " | ";
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
      cdData +=
        "<a class='linkText' target='_blank' href=" + `${item.link}` + ">";
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
  localStorage.removeItem(MeetStorage);
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
    const repeat = document.getElementById("repeat");

    if (
      isEmpty(eventName) ||
      isEmpty(link) ||
      isEmpty(date) ||
      isEmpty(start_time) ||
      isEmpty(end_time)
    ) {
      alert("Please fill all required field");
      return;
    }
    const newDate = new Date(date);

    let optionsDate = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    let isRepeat = false;

    if (repeat.checked == true) {
      isRepeat = true;
    }

    const pickDate = new Intl.DateTimeFormat(
      displayLanguage.dateRegion,
      optionsDate
    ).format(newDate);

    const newData = {
      id: new Date().toISOString(),
      event: eventName,
      link: link,
      // date: `${formatDate[2]} ${formatDate[1]} ${formatDate[3]}`,
      date: pickDate,
      start_time: start_time,
      end_time: end_time,
      repeat: isRepeat,
    };

    if (allData == null) {
      allData = [newData];
    } else {
      allData.push(newData);
    }
    localStorage.setItem(MeetStorage, JSON.stringify(allData));
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

btnSetting.addEventListener("click", function () {
  modalSetting.classList.remove("hidden");
  mainPage.classList.add("hidden");

  const btnIndo = document.getElementById("indonesia");
  const btnEnglish = document.getElementById("english");

  btnIndo.addEventListener("click", function () {
    setLanguage("Indonesia");
    modalSetting.classList.add("hidden");
    mainPage.classList.remove("hidden");
    alert("Buka kembali pada logo ekstensi untuk melihat perubahan bahasa");
  });

  btnEnglish.addEventListener("click", function () {
    setLanguage("English");
    modalSetting.classList.add("hidden");
    mainPage.classList.remove("hidden");
    alert("Reopen the extension logo to refresh the displayed language");
  });
});
