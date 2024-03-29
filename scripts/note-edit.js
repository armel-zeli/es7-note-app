'use strict'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substr(1)
let notes = getSavedNotes()

let note = notes.find((note) => note.id === noteId)

if(!note){
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body

dateElement.textContent = generateLastEdited(note.updatedAt)

/**
 * Store the note title when the user type some contents
 */
titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

/**
 * Store the body note when the user type some contents
 */
bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

/**
 * Remove the note and redirect to home page
 */
removeElement.addEventListener('click',() => {
    removeNote(noteId)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){

        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)

        if(!note){
            location.assign('/index.html')
        }
        titleElement.value = note.title
        bodyElement.value = note.body
        note.updatedAt = moment().valueOf()
        dateElement.textContent = generateLastEdited(note.updatedAt)

    }
})

