class Note {
    constructor(content, parent = null, color = 'red') {
        this.content = content;
        this.parent = parent;
        this.children = [];
        this.color = color;
    }

    addChild(childContent) {
        const childNote = new Note(childContent, this, this.color);
        this.children.push(childNote);
        return childNote;
    }

    delete() {
        if (this.parent) {
            this.parent.children = this.parent.children.filter(child => child !== this);
        } else {
            notes = notes.filter(note => note !== this);
        }
        updateUI();
    }
}

let notes = [];

document.getElementById('addParentBtn').addEventListener('click', () => {
    const parentContent = prompt('Enter parent note content:');
    const chooseParentColorInput = document.getElementById('chooseParentColorInput');

    if (parentContent) {
        const parentNote = new Note(parentContent, null, chooseParentColorInput.value);
        notes.push(parentNote);
        updateUI();
    }
});

function updateUI() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    notes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesContainer.appendChild(noteElement);
    });
}

function createNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.style.backgroundColor = note.color;

    const contentElement = document.createElement('div');
    contentElement.textContent = note.content;

    const typeLabel = document.createElement('span');
    typeLabel.textContent = note.parent ? 'Child' : 'Parent';
    typeLabel.style.marginLeft = '10px';
    contentElement.appendChild(typeLabel);

    noteElement.appendChild(contentElement);

    noteElement.addEventListener('click', () => {
        // Commented out the child creation on clicking the parent's content
        // const childContent = prompt('Enter child note content:');
        // if (childContent) {
        //     note.addChild(childContent);
        //     updateUI();
        // }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        note.delete();
    });

    noteElement.appendChild(deleteButton);

    if (!note.parent) {
        const addChildButton = createAddChildButton();
        addChildButton.addEventListener('click', () => {
            const childContent = prompt('Enter child note content:');
            if (childContent) {
                note.addChild(childContent);
                updateUI();
            }
        });

        noteElement.appendChild(addChildButton);
    }

    if (note.children.length > 0) {
        const childContainer = document.createElement('div');
        note.children.forEach(child => {
            const childElement = createNoteElement(child);
            childElement.classList.add('child-note');
            childContainer.appendChild(childElement);
        });
        noteElement.appendChild(childContainer);
    }

    return noteElement;
}

function createAddChildButton() {
    const addChildButton = document.createElement('button');
    addChildButton.textContent = 'Add Child';
    return addChildButton;
}
