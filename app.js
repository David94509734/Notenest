const titleInput =
    document.getElementById("noteTitle");

const bodyInput =
    document.getElementById("noteBody");

const saveButton =
    document.getElementById("saveNote");

const notesContainer =
    document.getElementById("notesContainer");

const connectionStatus =
    document.getElementById("connectionStatus");


// =========================
// LOAD NOTES
// =========================

let notes =
    JSON.parse(
        localStorage.getItem("offlineNotes")
    ) || [];


// =========================
// SAVE NOTES
// =========================

function saveNotes() {

    localStorage.setItem(
        "offlineNotes",
        JSON.stringify(notes)
    );

}


// =========================
// DISPLAY NOTES
// =========================

function renderNotes() {

    notesContainer.innerHTML = "";

    if (notes.length === 0) {

        notesContainer.innerHTML = `
            <div class="empty-state">
                No notes yet.
                Write your first note →
            </div>
        `;

        return;
    }


    notes.forEach((note, index) => {

        const noteElement =
            document.createElement("article");

        noteElement.className = "note";


        noteElement.innerHTML = `
            <h3>${escapeHTML(note.title)}</h3>

            <p>${escapeHTML(note.body)}</p>

            <div class="note-date">
                ${note.date}
            </div>

            <button
                class="delete-note"
                data-index="${index}"
            >
                Delete
            </button>
        `;


        notesContainer.appendChild(
            noteElement
        );

    });

}


// =========================
// ADD NOTE
// =========================

saveButton.addEventListener(
    "click",
    () => {

        const title =
            titleInput.value.trim();

        const body =
            bodyInput.value.trim();


        if (!title && !body) {

            alert(
                "Please write something first."
            );

            return;
        }


        const newNote = {

            title:
                title ||
                "Untitled note",

            body,

            date:
                new Date()
                    .toLocaleString()

        };


        notes.unshift(newNote);

        saveNotes();

        renderNotes();


        titleInput.value = "";

        bodyInput.value = "";

    }
);


// =========================
// DELETE NOTE
// =========================

notesContainer.addEventListener(
    "click",
    event => {

        if (
            event.target.classList
                .contains("delete-note")
        ) {

            const index =
                event.target.dataset.index;


            notes.splice(index, 1);

            saveNotes();

            renderNotes();

        }

    }
);


// =========================
// ONLINE / OFFLINE STATUS
// =========================

function updateConnectionStatus() {

    if (navigator.onLine) {

        connectionStatus.textContent =
            "Online";

    } else {

        connectionStatus.textContent =
            "Offline";

    }

}


window.addEventListener(
    "online",
    updateConnectionStatus
);


window.addEventListener(
    "offline",
    updateConnectionStatus
);


updateConnectionStatus();


// =========================
// SECURITY
// =========================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// =========================
// INITIAL RENDER
// =========================

renderNotes();