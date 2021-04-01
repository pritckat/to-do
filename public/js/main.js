const deleteItems = document.querySelectorAll('.deleteItem')
const updateItems = document.querySelectorAll('.updateItem')
const editItems = document.querySelectorAll('.editItem')

Array.from(deleteItems).forEach(e => {
    e.addEventListener('click', deleteItem)
})

Array.from(updateItems).forEach(e => {
    e.addEventListener('click', updateItem)
})

Array.from(editItems).forEach(e=> {
    e.addEventListener('click', editItem)
})


function editItem() {
    const item = this.parentNode.childNodes[3].innerText
    this.parentNode.childNodes[3].classList.toggle('hidden')
    this.parentNode.childNodes[5].classList.toggle('hidden')
    this.parentNode.childNodes[7].classList.toggle('hidden')
    this.parentNode.childNodes[9].classList.toggle('hidden')
    this.parentNode.childNodes[7].value = item
}

async function deleteItem() {
    const item = this.parentNode.childNodes[3].innerText
    console.log(item)
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'item': item
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function updateItem() {
    const item = this.parentNode.childNodes[3].innerText
    const update = this.parentNode.childNodes[7].value
    console.log(item)
    try{
        const response = await fetch('updateItem', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'item': item,
                'update': update
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}