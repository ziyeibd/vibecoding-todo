 const button = document.getElementById("helloButton");
  const message = document.getElementById("message");

  button.addEventListener("click", function() {
    message.textContent = "你好，这是我的第一个网页互动！";
  });

  const noteInput = document.getElementById("noteInput");
  const saveNoteButton = document.getElementById("saveNoteButton");
  const noteList = document.getElementById("noteList");
  const clearNotesButton = document.getElementById("clearNotesButton");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
 function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
 function renderNotes() {
  noteList.innerHTML = "";

  for (let index = 0; index < notes.length; index++) {
    const note = notes[index];

    noteList.innerHTML =
      noteList.innerHTML +
      "<li>" +
      "<span style='" +
      (note.completed ? "text-decoration: line-through;" : "") +
      "'>" +
      note.text +
      "</span>" +
      " <button onclick='toggleNote(" +
      index +
      ")'>完成/取消</button>" +
      " <button onclick='deleteNote(" +
      index +
      ")'>删除</button>" +
      "</li>";
  }
}
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function toggleNote(index) {
  notes[index].completed = !notes[index].completed;
  saveNotes();
  renderNotes();
}

 saveNoteButton.addEventListener("click", function() {
  if (noteInput.value === "") {
    alert("请先输入任务");
  } else {
    notes.push({
  text: noteInput.value,
  completed: false
});;
    saveNotes();
    renderNotes();
    noteInput.value = "";
  }
});
clearNotesButton.addEventListener("click", function() {
  notes = [];
  saveNotes();
  renderNotes();
});
renderNotes();