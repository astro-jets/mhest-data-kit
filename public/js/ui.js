
//Custom drop down
const wrapper = document.querySelector('.wrapper');
const selectBtn = document.querySelector('.select-btn')
const searchField = document.querySelector('.search-field')
const cboID = document.querySelector('.cboID')
const cbos = document.querySelectorAll('.cbo')
const optionsContainer = wrapper.querySelector('.options');
let cboList = [];

if(cbos)
{
    cbos.forEach(cbo => {
        cboList.push(cbo)
    });
}

if(selectBtn)
{
    selectBtn.addEventListener('click',()=>{
    wrapper.classList.toggle('active');
    })
}

if(searchField)
{
    searchField.addEventListener('keyup',()=>{
        let searchedVal = searchField.value.toLowerCase()
        filterCBO(cboList,searchedVal)
    })
}


function updateName(selectedList)
{
    cboID.value = selectedList.attributes['data-id'].value.trim();
    searchField.value = "";
    cboList.forEach(cbo => {
    cbo.classList.remove('selected')
    if(cbo.attributes['data-id'].value.trim() == selectedList.attributes['data-id'].value.trim())
    {
        cbo.classList.add('selected')
        console.log(cboList)
    }
    });
    filterCBO(cboList,"");
    // const cboID = selectedList.attributes['data-id'].value;
    selectBtn.firstElementChild.innerText = selectedList.innerText;
    wrapper.classList.remove('active');    
}

function filterCBO(cbo_array,searchedVal)
{
    arr = cbo_array.filter(data=>{
        return data.innerText.toLowerCase().trim().startsWith(searchedVal);
    }).map(data=> `<li data-id="${data.attributes['data-id'].value.trim()}" class="${data.className}" onclick="updateName(this)">${data.innerText}</li>`).join("")
    optionsContainer.innerHTML=arr ? arr : "Oops! CBO not found.";    
}