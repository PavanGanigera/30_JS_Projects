let createBtn = document.getElementById('Create');
let noteContainer = document.querySelector('.noteContainer');

function showNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      noteContainer.innerHTML = savedNotes;
    }
  }
  showNotes();

function updateStorage() {
    localStorage.setItem('notes', noteContainer.innerHTML);
}

createBtn.addEventListener('click', function () {

    let noteDiv = document.createElement('div');
    noteDiv.className = 'note bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl mb-4';
    noteDiv.innerHTML = `
                <h2 contenteditable="true" class="text-xl font-bold focus:outline-none">Untitled Note</h2>
                <p contenteditable="true" class="inputBox text-gray-700 focus:outline-none">Write your note here...</p>
                <div class="flex justify-end gap-3 mt-4">
                    <button class="saveBtn bg-green-600 text-white font-semibold px-3 py-1 rounded-full hover:bg-green-700 active:bg-green-800 focus:outline-none shadow-xl transition duration-300 mt-4"><i class="fa-solid fa-floppy-disk me-2 "></i>Save</button>
                    <button class="delBtn bg-red-600 text-white font-semibold px-3 py-1 rounded-full hover:bg-red-700 active:bg-red-800 focus:outline-none shadow-xl transition duration-300 mt-4"><i class="fa-solid fa-trash me-2"></i>Delete</button>
                </div>
            `;

    noteContainer.appendChild(noteDiv);
    // updateStorage();
});

noteContainer.addEventListener('click', function (e) {
    // Delete button functionality
    if (e.target.closest('.delBtn')) {
        const note = e.target.closest('.note');
        if (note && confirm('Are you sure you want to delete this note?')) {
          note.remove();
          updateStorage();
        }
      }
    // Save button functionality
    if (e.target.closest('.saveBtn')) {
        const note = e.target.closest('.note');
        const titleElement = note.querySelector('h2');
        const contentElement = note.querySelector('p');
      
        const title = titleElement.innerText.trim();
        const content = contentElement.innerText.trim();

        // Check for empty or default text
        if ( title === '' || content === '' || title === 'Untitled Note' || content === 'Write your note here...') {
          alert('Please enter a valid title and note content before saving.');
        } 
        else {
          alert(`Note Saved!\nTitle: ${title}\nContent: ${content}`);
          updateStorage();
        }
      }    
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.execCommand('insertHTML', false, '<br><br>');
        e.preventDefault(); 
      }
})