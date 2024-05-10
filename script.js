let myLeads = [];
const inputEL = document.getElementById("input-el");
const btn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("remove-btn");
const tabBtn = document.getElementById("tab-btn");
// Get th leads from the localstorage- PS: JSON.parse()
// Store it in a variable, leasFromstorage
// log out the variable
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// Check if leadsFromLocalStorage is truthy
// If so, set myLeads to its value and call renderLeads()
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
// Create a variable, listitems, to hold all the Html for the list items

function generateListItemHTML(lead, index) {
  return `
    <div class="box">
      <li>
        <a href="${lead}" target="_blank">${lead}</a>
        <span class="delete-icon" data-index="${index}">&#10006;</span>
      </li>
    </div>  
    `;
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += generateListItemHTML(leads[i], i);
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function addLead(){
    myLeads.push(inputEL.value);
    inputEL.value= "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
}

btn.addEventListener("click", addLead);

inputEL.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        addLead();
    }
})

document.addEventListener("click", function (e) {
  if (e.target.className === "delete-icon") {
    const index = e.target.dataset.index;
    myLeads.splice(index, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});
