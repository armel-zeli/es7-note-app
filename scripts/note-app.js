'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)
/**
 * Add new note when the user click on the button
 */
document.querySelector('#create-note').addEventListener('click',  () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt:timestamp,
        updatedAt: timestamp,
    })
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})

/**
 * Filter notes by text
 */
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

/**
 * Filter notes by
 */
document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes,filters)
})

/**
 * Re-render the notes when the localStorage is updated
 */
window.addEventListener('storage', (e) => {
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})
