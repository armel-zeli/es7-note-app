'use strict'

/**
 * Read existing notes from localStorage
 * @returns {Array|any}
 */
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

/**
 * Remove a note from the list
 *
 * @param id
 */
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

/**
 * Generate a DOM structure for a note
 *
 * @param note
 * @returns {HTMLDivElement}
 */
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    //Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Note sans nom'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //Setup link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //Setup status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

/**
 * Sort your notes by one of three ways
 *
 * @param notes
 * @param sortBy
 * @returns number
 */
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > a.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
}

/**
 * Render application notes
 *
 * @param notes
 * @param filters
 */
const renderNotes = (notes, filters) => {
    const noteEl = document.querySelector("#notes")
    notes = sortNotes(notes, filters.sortBy)

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    noteEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            noteEl.appendChild(generateNoteDOM(note))
        })
    } else {
        let emptyNote = document.createElement('p')
        emptyNote.textContent = 'Aucune note pour le moment'
        emptyNote.classList.add('empty-message')
        noteEl.appendChild(emptyNote)
    }


}

/**
 * Save note to localStorage
 *
 * @param notes
 */
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

/**
 * Generate last edited message
 *
 * @param timestamp
 * @returns {string}
 */

const generateLastEdited = (timestamp) => {
    moment.locale('fr')

    return `Dernière modification ${moment(timestamp).fromNow()}`
}