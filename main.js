const itemInput = document.getElementById('item');
const btn = document.getElementById('btn');
const toaster = document.querySelector('.toaster');


const getData = async()=>{
    const res = await fetch("https://otognfmsxrwlfkfnvoer.supabase.co/rest/v1/items?select=*",{
        method:"GET",
        headers:{
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            "Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo"
        }
    })

    const data = await res.json()
    return data;
}

const insertData =async(item)=>{
    const data = {name : item};
    const res = await fetch("https://otognfmsxrwlfkfnvoer.supabase.co/rest/v1/items",{
        method:"POST",
        
        headers:{
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            "Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    })


}

const deleteData =async (id)=>{

    const res = await fetch(`https://otognfmsxrwlfkfnvoer.supabase.co/rest/v1/items?id=eq.${id}`,{
        method:"DELETE",
        headers:{
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo",
            "Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjYzNzQ2NiwiZXhwIjoxOTUyMjEzNDY2fQ.uQ5D6mLx1KgratOPmfHASUEVAOMOWeHDpeeug3jcJPo"
        }
    })
}


const addToDom = async()=>{
    const items = await getData();
    const itemsOutput = document.querySelector('.items')
    itemsOutput.innerHTML = ""
    items.forEach(element => {
        let item = document.createElement('div');
        item.classList.add('item')
        item.innerHTML = `
                <div class="text">${element.name}</div>
                <div class="btn-container">
                    <button class="del-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            `
        
        const delBtn = item.querySelector('.del-btn');
        delBtn.addEventListener('click',async()=>{
            await deleteData(element.id);
            addToDom();
            toaster.innerHTML = "Item deleted successfully!"
            toaster.style.backgroundColor = "red";
            toaster.classList.add('active');
            setTimeout(()=> toaster.classList.remove('active'), 3000);
        })

    
        itemsOutput.appendChild(item)
    });
}

 addToDom()



btn.addEventListener('click',async(e)=>{
   await insertData(itemInput.value);
    addToDom()
    itemInput.value =""
    toaster.innerHTML = "Item added successfully!"
    toaster.style.backgroundColor = "green";
    toaster.classList.add('active');
    setTimeout(()=> toaster.classList.remove('active'), 3000);
})