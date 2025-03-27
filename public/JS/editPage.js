document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll(".image-container").forEach(container =>{
        const deleteBtn = container.querySelector(".delete-btn");
        const form = container.querySelector(".delete-form");
        
        form.addEventListener("submit", (event)=>{
            const isConfirmed = confirm("Are you sure you want to delete this image");
            if(!isConfirmed){
                event.preventDefault();
            }
        })
    
    })
})