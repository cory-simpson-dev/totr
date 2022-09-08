const deleteBtn = document.querySelectorAll('.delete')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteReview)
})

//added a "windowConfirm" variable to open a confirmation window for deleting. 
async function deleteReview(){
    let windowConfirm = confirm("Are you sure you want to delete this review?")
    if (windowConfirm == true) {

      const review = this.id
      console.log(review)
 
    try{
        const response = await fetch('reviews/deleteCheckin', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'reviewId': review
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}}