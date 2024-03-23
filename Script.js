let data = '[{"id":"1","taskName":"Task One","dateTaskEntered":"Tue Mar 19 2024","location":"hosur","isCompleted":"true","isTrash":"false"},{ "id":"2","taskName":"Task Two","dateTaskEntered":"Tue Mar 19 2024","location":"hosur","isCompleted":"false","isTrash":"false"},{"id":"3","taskName":"Angular Intro","dateTaskEntered":"Wed Mar 20 2024","location":"Doha","isCompleted":"false","isTrash":"true"},{"id":"4","taskName":"Advance Concepts","dateTaskEntered":"Wed Mar 20 2024","location":"Doha","isCompleted":"false","isTrash":"false"},{"id":"5","taskName":"HTML and CSS","dateTaskEntered":"Tue Mar 19 2024","location":"Doha","isCompleted":"false","isTrash":"false"}]';
// let dataJSON='';

const createBtn = document.getElementById('createBtn');
const formCreate = document.querySelector('.form_create');//input field
const defaultValue = document.getElementById('noTasks');
const btnCompleted = document.getElementById('compTask');

const toast = document.getElementById('added');
const completed = document.getElementById('completed');
const deleted = document.getElementById('deleted');

const createTaskForm = document.getElementById('formCreate');//div for 
const create = document.getElementById('create');//btn
const activeTaskBtn = document.getElementById('activeTaskBtn');

const search = document.getElementById('search');//search field
const btn_search = document.getElementById('btn_search');//search btn

const deletedTask = document.getElementById('deletedTask');
const deletedTaskBtn = document.getElementById('deletedTaskBtn');

// const activeTaskDiv = document.getElementById('activeTaskDiv');
const activeTask = document.getElementById('activeTask');

const displayDiv = document.getElementById('display');

const selectAllCheckbox = document.getElementById('selectAllCheckbox');
const checkboxAll = document.getElementsByName('checkboxList');

const SearchValNotFound = document.getElementById('SearchValNotFound');

let gblBtnClicked='';
let selectAllTasks;
let gblArrCheckBoxValues=[];

createBtn.addEventListener('click',createTask);
btnCompleted.addEventListener('click',showCompletedTask);
create.addEventListener('click',showInputField);
activeTaskBtn.addEventListener('click',showActiveList);
deletedTaskBtn.addEventListener('click',showDeletedList);
btn_search.addEventListener('click',searchFunction);
search.addEventListener('keyup',searchFunction);

selectAllCheckbox.addEventListener('change',selectAllValues);

function selectAllValues(event){
    event.preventDefault();
    checkboxAll.forEach((checkbox)=>{
        if(selectAllCheckbox.checked){
            selectAllTasks=true;
        }
        else{
            selectAllTasks=false;
        }
        checkbox.checked=selectAllCheckbox.checked;
    });  
    
};

window.onload= function() {
    displayDiv.style.display='none';
    createTaskForm.style.display='none';
    SearchValNotFound.style.display='none';
    gblBtnClicked='';
};


function createTableRows(Sno,idKeyVal,taskName,dateTaskEntered,location,tbl_body_display){
    const tbl_row = document.createElement('tr');
    let compBtn = '<button type="button" class="action_button" style="cursor:pointer;" id="comp_' + idKeyVal + '"onclick="compTask(event)"><i id="comp_icon_'+idKeyVal+'" class="fa-solid fa-check"></i></button>';//used inline css and id is unique for the button and the icon
    let delBtn = '<button type="button" class="action_button" style="cursor:pointer;" id="del_' + idKeyVal + '" onclick="delTask(event)"><i id="del_icon_'+idKeyVal+'" class="fa-solid fa-trash"></i></button>';
    let checkBox = '<input type="checkbox" name="checkboxList" id="checkbox_'+idKeyVal+'"/>';
    // let dropDownList = '<select id="actionList" onChange="actionSelection(event,'+idKeyVal+')"><option>Select an action..</option><option value="completed">Complete</option><option value="deleted">Delete</option></select>';

    tbl_row.innerHTML = `<td><div>${Sno}${checkBox}</div></td>
                        <td><div class="cellContent">${taskName}</div></td>
                        <td>${dateTaskEntered}</td>
                        <td>${location}</td>
                        <td>${compBtn}
                        ${delBtn}</td>`;

    tbl_body_display.appendChild(tbl_row); 
}

function display(displayVal,btnClicked){ 
    displayDiv.style.display='block'; 
    const tbl_body_display = document.querySelector('#tasktbl tbody'); 
    tbl_body_display.innerHTML=''; 
    let Sno=0;
    let displayValue = JSON.parse(displayVal,(key,value)=>{
        return value;
    });
    
    switch(btnClicked){
        case "active":
        case "create":
            for(let d of displayValue){
                if(d.isCompleted==="false" && d.isTrash==="false"){ //the condition to be active
                    Sno+=1;
                    createTableRows(Sno,d.id,d.taskName,d.dateTaskEntered,d.location,tbl_body_display);
                }
            }
        break;
        case "completed":
            for(let d of displayValue){
                if(d.isCompleted==="true" && d.isTrash==="false"){
                    Sno+=1;
                    createTableRows(Sno,d.id,d.taskName,d.dateTaskEntered,d.location,tbl_body_display);
                }
            }
        break;
        case "deleted":
            for(let d of displayValue){
                if(d.isTrash==="true"){ //the condition to be deleted
                    Sno+=1;
                    createTableRows(Sno,d.id,d.taskName,d.dateTaskEntered,d.location,tbl_body_display);
                }
            }
        break;
    }
}

function disableStyleForButtons(){
    create.style.backgroundColor="";
        create.style.color="";
        create.style.fontWeight='';
        create.style.boxShadow="";

        activeTaskBtn.style.backgroundColor="";
        activeTaskBtn.style.color="";
        activeTaskBtn.style.fontWeight='';
        activeTaskBtn.style.boxShadow="";

        btnCompleted.style.backgroundColor="";
        btnCompleted.style.color="";
        btnCompleted.style.fontWeight='';
        btnCompleted.style.boxShadow="";

        deletedTaskBtn.style.backgroundColor="";
        deletedTaskBtn.style.color="";
        deletedTaskBtn.style.fontWeight='';
        deletedTaskBtn.style.boxShadow="";
}

function setStyleToActiveButton(btnClicked){
    disableStyleForButtons();
    switch(btnClicked){
        case "create":
            create.style.backgroundColor="#891652";
            create.style.color="#FF204E";
            create.style.fontWeight='bold';
            create.style.boxShadow="0 12px 12px 0 rgba(0,0,0,0.24), 0 10px 50px 0 rgba(0,0,0,0.24)";
        break;
        case "active":
            activeTaskBtn.style.backgroundColor="#891652";
            activeTaskBtn.style.color="#FF204E";
            activeTaskBtn.style.fontWeight='bold';
            activeTaskBtn.style.boxShadow="0 12px 12px 0 rgba(0,0,0,0.24), 0 10px 50px 0 rgba(0,0,0,0.24)";
        break;
        case "deleted":
            deletedTaskBtn.style.backgroundColor="#891652";
            deletedTaskBtn.style.color="#FF204E";
            deletedTaskBtn.style.fontWeight='bold';
            deletedTaskBtn.style.boxShadow="0 12px 12px 0 rgba(0,0,0,0.24), 0 10px 50px 0 rgba(0,0,0,0.24)";
        break;
        case "completed":
            btnCompleted.style.backgroundColor="#891652";
            btnCompleted.style.color="#FF204E";
            btnCompleted.style.fontWeight='bold';
            btnCompleted.style.boxShadow="0 12px 12px 0 rgba(0,0,0,0.24), 0 10px 50px 0 rgba(0,0,0,0.24)";
        break;
    }
}

function showInputField(event){
    event.preventDefault();
    selectAllCheckbox.checked=false;
    selectAllTasks=false;
    defaultValue.style.display='none';
    SearchValNotFound.style.display='none';
    createTaskForm.style.display='block';
    gblBtnClicked='create';
    setStyleToActiveButton("create");
    display(data,"active");
}

function createTask(event){
    // prepare the task data (assign id, add any required field)
    // store the date in json file
    // list the new data 
    event.preventDefault(); //it will not cause the page to refresh
    defaultValue.style.display='none';
    const tbl_row = document.createElement('tr');
    const tbl_body = document.querySelector('#tasktbl tbody');
    let date =new Date().toDateString();
    const loc = 'Doha';
    if(formCreate.value===''){
        alert('enter task');
        displayDiv.style.display='none';
    }
    else{
                const taskVal = formCreate.value;
                let taskValue = JSON.parse(data);
                let idKeyVal = getId(taskValue);        
                let isCompletedVal = "false";
                let isTrashVal = "false";
                let valToAppend = {"id":idKeyVal,"taskName":taskVal,"dateTaskEntered":date,"location":"Doha","isCompleted":isCompletedVal,"isTrash":isTrashVal};
                taskValue.push(valToAppend);
                data=JSON.stringify(taskValue);
                display(data,gblBtnClicked);
                showToast();
    };
    formCreate.value='';
}

function compTask(event){
    event.preventDefault();
    let taskValue = JSON.parse(data);
    let text = 'Confirm if you want to complete this task';
    
    if(gblBtnClicked!=='completed'){
        if(selectAllTasks){
            if(confirm("Do you want to mark all as complete?")){
                let taskValue = JSON.parse(data);
                for(let d of taskValue){
                        d.isCompleted="true";
                        data=JSON.stringify(taskValue);
                        event.target.closest('button').disabled = true;
                };
                setStyleToActiveButton(gblBtnClicked);
                display(data,gblBtnClicked); 
                showToastCompleted();
                selectAllCheckbox.checked=false;
                selectAllTasks=false;
            }
        }
        else if(confirm(text)==true && selectAllTasks==false){
            const checkboxes = document.getElementsByName("checkboxList");
            checkboxes.forEach((checkbox)=>{if(checkbox.checked){
                    let id = checkbox.id.charAt(checkbox.id.length-1);
                    // console.log(id);
                    for(let d of taskValue){
                        if(parseInt(d.id)===parseInt(id)){
                            d.isCompleted="true";                
                            // console.log(d.id+" set to true");
                        }
                    };
                }
                else{
                    // let taskValue = JSON.parse(data);
                    let id = event.target.closest('button').id; //event delegation, checking for the closest btn and its clicked unctionality will be executed.
                    id = id.charAt(id.length-1);
                    for(let d of taskValue){
                        if(parseInt(d.id)===parseInt(id)){
                            d.isCompleted="true";
                            // data=JSON.stringify(taskValue);
                            // event.target.closest('button').disabled = true;
                        }
                    };
                }
            });
            data=JSON.stringify(taskValue);
            // console.log(data);
            setStyleToActiveButton(gblBtnClicked);
            display(data,gblBtnClicked); 
            showToastCompleted();
            selectAllCheckbox.checked=false;
            selectAllTasks=false;
        } 
    }
}

function delTask(event){
    event.preventDefault();
    let taskValue = JSON.parse(data);
    let deltaskText = "Are you sure you want to delete the task?";
    if(gblBtnClicked!=='deleted'){
        if(selectAllTasks){
            if(confirm("Are you sure you want to delete all?")){
                let taskValue = JSON.parse(data);
                let id = event.target.closest('button').id;
                id = id.charAt(id.length-1);
                for(let d of taskValue){
                        d.isTrash="true";
                        data=JSON.stringify(taskValue);
                        event.target.closest('button').disabled = true;
                };
                setStyleToActiveButton(gblBtnClicked);
                display(data,gblBtnClicked);
                showToastDeleted();
                selectAllCheckbox.checked=false;
                selectAllTasks=false;
            }
        }
        else if(confirm(deltaskText)==true && selectAllTasks==false){
            const checkboxes = document.getElementsByName("checkboxList");
            checkboxes.forEach((checkbox)=>{
                if(checkbox.checked){
                    let id = checkbox.id.charAt(checkbox.id.length-1);
                    // console.log(id);
                    for(let d of taskValue){
                        if(parseInt(d.id)===parseInt(id)){
                            d.isTrash="true";                
                            // console.log(d.id+" set to true");
                        }
                    };
                }
                else{
                    let id = event.target.closest('button').id;
                    id = id.charAt(id.length-1);
                    for(let d of taskValue){
                        if(parseInt(d.id)===parseInt(id)){
                            d.isTrash="true";
                            // data=JSON.stringify(taskValue);
                            // event.target.closest('button').disabled = true;
                        }
                    };
                }
            });
            data=JSON.stringify(taskValue);
            setStyleToActiveButton(gblBtnClicked);
            display(data,gblBtnClicked);
            showToastDeleted();
            selectAllCheckbox.checked=false;
            selectAllTasks=false;
        } 
    }
}

function getId(jsObj){
    let id='';
    let arrIndex=[];
    for (let d of jsObj){
        arrIndex.push(d.id);
    }
    arrIndex.sort((a,b)=>{return a-b;});
    id = parseInt(arrIndex[arrIndex.length-1])+1;
    return id;
}

function showActiveList(event){
    event.preventDefault();
    selectAllCheckbox.checked=false;
    selectAllTasks=false;
    defaultValue.style.display='none';
    createTaskForm.style.display='none';
    SearchValNotFound.style.display='none';
    gblBtnClicked='active';
    setStyleToActiveButton("active");
    display(data,"active");
    // paginationFunction();
}

function showCompletedTask(event){
    event.preventDefault();
    selectAllCheckbox.checked=false;
    selectAllTasks=false;
    defaultValue.style.display='none';
    createTaskForm.style.display='none';
    SearchValNotFound.style.display='none';
    gblBtnClicked='completed';
    setStyleToActiveButton(gblBtnClicked);
    display(data,gblBtnClicked);
}

function showDeletedList(event){
    event.preventDefault();
    selectAllCheckbox.checked=false;
    selectAllTasks=false;
    defaultValue.style.display='none';
    createTaskForm.style.display='none';
    SearchValNotFound.style.display='none';
    gblBtnClicked='deleted';
    setStyleToActiveButton(gblBtnClicked);
    display(data,gblBtnClicked); 
}

function searchFunction(event){
    event.preventDefault();
    selectAllCheckbox.checked=false;
    selectAllTasks=false;
    let searchValue = search.value.toLowerCase();
    if(searchValue && gblBtnClicked!==''){
        let displayValue = JSON.parse(data,(key,value)=>{
            return value;
        });
        let searchResults_obj = displayValue.filter((currentValue,index)=>{
            return currentValue.taskName.toLowerCase().includes(searchValue);
        });
        // console.log(searchResults_obj);
        // console.log(Object.keys(searchResults_obj).length);
        if(Object.keys(searchResults_obj).length>0){
            let searchResults=JSON.stringify(searchResults_obj);
            // console.log(searchResults);
            setStyleToActiveButton(gblBtnClicked);
            display(searchResults,gblBtnClicked);
            SearchValNotFound.style.display='none';
        }
        else{
            let searchResults_obj = displayValue.filter((currentValue,index)=>{
                return currentValue.location.toLowerCase().includes(searchValue);});
                if(Object.keys(searchResults_obj).length>0){
                    let searchResults=JSON.stringify(searchResults_obj);
                    // console.log(searchResults);
                    setStyleToActiveButton(gblBtnClicked);
                    display(searchResults,gblBtnClicked);
                    SearchValNotFound.style.display='none';
                }
                else{
                    let searchResults=JSON.stringify(searchResults_obj);
                    setStyleToActiveButton(gblBtnClicked);
                    display(searchResults,gblBtnClicked);
                    SearchValNotFound.style.display='block';
                }

        }
    }
    else if(searchValue==='' || gblBtnClicked!==''){
        setStyleToActiveButton(gblBtnClicked);
        display(data,gblBtnClicked);   
    }
    else{
        alert('Navigate to tasks to search for value');
        search.value='';
    }
}

function showToast(){
    toast.style.display='block';
    setTimeout(()=>{
        toast.style.display='none'},3000);
}

function showToastCompleted(){
    completed.style.display='block';
    setTimeout(()=>{
        completed.style.display='none'},3000);
}

function showToastDeleted(){
    deleted.style.display='block';
    setTimeout(()=>{
        deleted.style.display='none'},3000);
}

function toggleDropDown(){
    let dropDownMenu = document.getElementById('dropDownMenu');
    dropDownMenu.style.display = dropDownMenu.style.display === "block" ? "none" : "block";
}

//pagination

// const rowsPerPage = 5;
// const pagination = document.getElementById('pagination'); 
// const prevButton = document.getElementById('prev'); 
// const nextButton = document.getElementById('next'); 
// const pageNumbers = document.getElementById('page-numbers'); 
// const pageLinks = document.querySelectorAll('.page-link'); 

// function paginationFunction(){
//     const rows = Array.from(document.querySelector('#tasktbl tbody'));
//     console.log(rows);
// }



// function actionSelection(event,idKeyVal){
//     event.preventDefault();
//     let selectedValue = document.getElementById("actionList").value;
//     let taskID = idKeyVal;
//     // console.log(taskID);
//     if(selectedValue==='completed'){
//         compTask(event,taskID);
//     }
//     else if(selectedValue==='deleted'){
//         delTask(event,taskID);
//     }
// }





// function writeData() {
//     const inputData = document.getElementById('inputField').value;
//     fetch('/save', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: new URLSearchParams({
//             data: inputData
//         })
//     })
//     .then(response => response.text())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));
// }

// function readData() {
//     fetch('/read')
//     .then(response => response.text())
//     .then(data => {
//         // document.getElementById('output').innerText = 'Data read: ' + data;
//         dataJSON = data;
//     })
//     .catch(error => console.error('Error:', error));
// }