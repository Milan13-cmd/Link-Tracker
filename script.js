let myLeads = [];
const inputEL = document.getElementById("input-el")
const btn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("remove-btn");
const tabBtn = document.getElementById("tab-btn")
// Get th leads from the localstorage- PS: JSON.parse() 
// Store it in a variable, leasFromstorage
// log out the variable
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
// Check if leadsFromLocalStorage is truthy
// If so, set myLeads to its value and call renderLeads()
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads);
    })

})
// Create a variable, listitems, to hold all the Html for the list items
function render(leads){

    let listItems = "";
    for(i = 0; i < leads.length; i++){

        // Add the item to the listitem
        listItems += `
        <li>
        <a href="${leads[i]}" target= "_blank">
               ${leads[i]}
        </a>
        </li>`;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads =[]
    render(myLeads);
})



btn.addEventListener('click', function(){
    myLeads.push(inputEL.value);
    inputEL.value='';
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads)
})
