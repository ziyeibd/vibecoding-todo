 const button = document.getElementById("helloButton");
  const message = document.getElementById("message");
const showAllButton = document.getElementById("showAllButton");
const showActiveButton = document.getElementById("showActiveButton");
const showCompletedButton = document.getElementById("showCompletedButton");
  button.addEventListener("click", function() {
    message.textContent = "你好，这是我的第一个网页互动！";
  });

  const noteInput = document.getElementById("noteInput");
  const saveNoteButton = document.getElementById("saveNoteButton");
  const noteList = document.getElementById("noteList");
  const clearNotesButton = document.getElementById("clearNotesButton");
  const emptyMessage = document.getElementById("emptyMessage");
 
  const statsText = document.getElementById("statsText");
  
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let currentFilter = "all";
  function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderStats() {
  const totalCount = notes.length;

  const completedCount = notes.filter(function(note) {
    return note.completed === true;
  }).length;

  const activeCount = totalCount - completedCount;

  statsText.textContent =
    "总数：" +
    totalCount +
    "，已完成：" +
    completedCount +
    "，未完成：" +
    activeCount;
}

 function renderNotes() {
  renderStats()
  
  noteList.innerHTML = "";
  if (notes.length === 0) {
    emptyMessage.textContent = "暂无任务，添加一个开始吧。";
    return;
  }

  emptyMessage.textContent = "";

  let visibleNotes = notes;

  if (currentFilter === "active") {
    visibleNotes = notes.filter(function(note) {
      return note.completed === false;
    });
  }

  if (currentFilter === "completed") {
    visibleNotes = notes.filter(function(note) {
      return note.completed === true;
    });
  }

 for (let index = 0; index < visibleNotes.length; index++) {
  const note = visibleNotes[index];

    noteList.innerHTML =
      noteList.innerHTML +
      "<li>" +
      "<span style='" +
      (note.completed ? "text-decoration: line-through;" : "") +
      "'>" +
      note.text +
      "</span>" +
     " <button onclick='toggleNote(" +
      note.id +
      ")'>完成/取消</button>" +
      " <button onclick='deleteNote(" +
      note.id +
      ")'>删除</button>" +
      "</li>";
  }
}


function deleteNote(id) {
   notes = notes.filter(function(note) {
    return note.id !== id;
  });
  saveNotes();
  renderNotes();
}

function toggleNote(id) {
 for (let index = 0; index < notes.length; index++) {
    if (notes[index].id === id) {
      notes[index].completed = !notes[index].completed;
    }
  }
  saveNotes();
  renderNotes();
}

 saveNoteButton.addEventListener("click", function() {
  if (noteInput.value === "") {
    alert("请先输入任务");
  } else {
    notes.push({
      id: Date.now(),
      text: noteInput.value,
      completed: false
});;
    saveNotes();
    renderNotes();
    noteInput.value = "";
  }
});
clearNotesButton.addEventListener("click", function() {
  const shouldClear = confirm("确定要清空全部任务吗？");

  if (shouldClear === true) {
    notes = [];
    saveNotes();
    renderNotes();
  }
});

showAllButton.addEventListener("click", function() {
  currentFilter = "all";
  renderNotes();
});

showActiveButton.addEventListener("click", function() {
  currentFilter = "active";
  renderNotes();
});

showCompletedButton.addEventListener("click", function() {
  currentFilter = "completed";
  renderNotes();
});