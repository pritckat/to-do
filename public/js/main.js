const deleteItems = document.querySelectorAll('.deleteItem')

Array.from(deleteItems).forEach(e => {
    e.addEventListener('click', deleteItem)
})

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