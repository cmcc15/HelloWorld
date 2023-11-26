document.addEventListener("DOMContentLoaded", () => {
  loadNotes();
  setupEventStreams();
});

function loadNotes() {
  const noteContainer = document.getElementById("note-container");
  noteContainer.innerHTML = "";

  // Retrieve notes from local storage
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note, index) => {
    const noteDiv = createNoteElement(note.text, note.color, index);
    noteContainer.appendChild(noteDiv);
  });
}

function createNoteElement(text, color, index) {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  noteDiv.style.backgroundColor = color || getRandomColor();
  noteDiv.textContent = text;
  noteDiv.addEventListener("click", () => selectNoteAction(index));

  return noteDiv;
}

function addOrUpdateNote() {
  const selectedNoteIndex = getSelectedNoteIndex();
  const noteInput = document.getElementById("note-input");
  const colorSelector = document.getElementById("color-selector");

  if (selectedNoteIndex === -1) {
    // Add new note
    const noteText = noteInput.value.trim();
    if (noteText !== "") {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const newNote = {
        text: noteText,
        color: colorSelector.value,
      };
      notes.push(newNote);
      localStorage.setItem("notes", JSON.stringify(notes));

      const noteContainer = document.getElementById("note-container");
      const newNoteDiv = createNoteElement(newNote.text, newNote.color, notes.length - 1);
      noteContainer.appendChild(newNoteDiv);

      noteInput.value = "";
    }
  } else {
    // Update existing note
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes[selectedNoteIndex].text = noteInput.value.trim();
    notes[selectedNoteIndex].color = colorSelector.value;
    localStorage.setItem("notes", JSON.stringify(notes));

    loadNotes();
    noteInput.value = "";
  }
}

function deleteNote() {
  const selectedNoteIndex = getSelectedNoteIndex();
  if (selectedNoteIndex !== -1) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(selectedNoteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));

    loadNotes();
  }
}

function changeNoteColor() {
  const selectedNoteIndex = getSelectedNoteIndex();
  const colorSelector = document.getElementById("color-selector");

  if (selectedNoteIndex !== -1) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes[selectedNoteIndex].color = colorSelector.value;
    localStorage.setItem("notes", JSON.stringify(notes));

    loadNotes();
  }
}

function selectNoteAction(index) {
  const noteInput = document.getElementById("note-input");
  const colorSelector = document.getElementById("color-selector");
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  noteInput.value = index !== -1 ? notes[index].text : "";
  colorSelector.value = index !== -1 ? notes[index].color : "";

  // Remove the "selected" class from all notes
  const noteContainer = document.getElementById("note-container");
  const noteElements = noteContainer.getElementsByClassName("note");
  for (let i = 0; i < noteElements.length; i++) {
    noteElements[i].classList.remove("selected");
  }

  // Add the "selected" class to the clicked note
  if (index !== -1) {
    noteElements[index].classList.add("selected");
  }
}

function setupEventStreams() {
  const addOrUpdateNoteStream = rxjs.fromEvent(document.getElementById("add-edit-button"), "click");
  const deleteNoteStream = rxjs.fromEvent(document.getElementById("delete-button"), "click");
  const changeNoteColorStream = rxjs.fromEvent(document.getElementById("color-button"), "click");

  const selectNoteStream = new rxjs.Subject();
  const mouseClickStream = rxjs.fromEvent(document.getElementById("note-container"), "click").pipe(
    rxjs.operators.map((event) => {
      const noteElements = document.getElementsByClassName("note");
      for (let i = 0; i < noteElements.length; i++) {
        if (event.target === noteElements[i]) {
          return i;
        }
      }
      return -1;
    })
  );

  mouseClickStream.subscribe((index) => selectNoteStream.next(index));

  const addOrUpdateNoteSubscription = addOrUpdateNoteStream.subscribe(() => addOrUpdateNote());
  const deleteNoteSubscription = deleteNoteStream.subscribe(() => deleteNote());
  const changeNoteColorSubscription = changeNoteColorStream.subscribe(() => changeNoteColor());

  const selectNoteSubscription = selectNoteStream.subscribe((index) => selectNoteAction(index));

  // Unsubscribe to event streams when the page is unloaded
  window.addEventListener("beforeunload", () => {
    addOrUpdateNoteSubscription.unsubscribe();
    deleteNoteSubscription.unsubscribe();
    changeNoteColorSubscription.unsubscribe();
    selectNoteSubscription.unsubscribe();
  });
}

function getSelectedNoteIndex() {
  const noteContainer = document.getElementById("note-container");
  const notes = noteContainer.getElementsByClassName("note");

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("selected")) {
      return i;
    }
  }

  return -1;
}

function getRandomColor() {
  const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"];
  return colors[Math.floor(Math.random() * colors.length)];
}
