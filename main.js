//----variables------//
var form = document.getElementById('add-frm');
var items = document.getElementById('items');
var ntitle = document.getElementById('n-title');
var nbody = document.getElementById('n-body');
var tableDiv = document.getElementById('tbl-div');
var search = document.getElementById('srch');
var resetBtn = document.getElementById('reset')

var noteCount = 0;
var newNote = '';
var isUpdate = false;
var record = '';
var note = '';
var body = '';


//----Events-----------//
//for page load
window.onload = updateTable;

//for form submition
form.addEventListener('submit', addNote);

//for search
search.addEventListener('keyup', searchNotes);

//for remove
items.addEventListener('click', removeNote);

//for view & update
items.addEventListener('click', viewUpdateNote);

//for reset
resetBtn.addEventListener('click', resetAll);

//--------Functions----------//

//update table
function updateTable(){
    // Display the table when notes get added
    if(noteCount > 0){
        tableDiv.style.display = '';
        
        //update note
        if(isUpdate){
            note.firstChild.textContent = ntitle.value;
            note.lastChild.textContent = nbody.value;
            //Reset update and notecount
            isUpdate = false;
            noteCount--;
        }
        //add new note
        else{
            items.appendChild(newNote);
        }
    }
    else{
        tableDiv.style.display = 'none';
    }
}

//  Add note
function addNote(e){
    e.preventDefault();
    
    // Validate input
    if(ntitle.value == '' || nbody.value == ''){
        alert("Please fill all fields");
    }
    else{
        //Create new note recors

        // New tr
        var tr = document.createElement('tr');
        tr.className = 'item';

        //New td for title and body
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(ntitle.value));
        var span = document.createElement('span');
        span.className = 'note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);

        //New td for view
        var td2 = document.createElement('td');
        td2.className = 'btcellv';
        var btn1 = document.createElement('button');
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id', 'vw');
        td2.appendChild(btn1);

        //New td for delete
        var td3 = document.createElement('td');
        td3.className = 'btcelld';
        var btn2 = document.createElement('button');
        btn2.appendChild(document.createTextNode('Delete'));
        btn2.setAttribute('id', 'dt');
        td3.appendChild(btn2);

        //Add all tds to tr
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Increments note counts
        noteCount++;

        // set new note
        newNote = tr;

        // Add or update table
        updateTable();

        }

        //reset all
        resetAll();
}

// Search note
function searchNotes(e){
    // Text to lowercase
    var searchTxt = e.target.value.toLowerCase();
    
    //Get list
    var list = items.getElementsByClassName('item');
    
    //convert to an array
    var listArr = Array.from(list);
    listArr.forEach(function(item){
        //Get title
        var noteTitle = item.firstChild.textContent;
        //Match
        if(noteTitle.toLowerCase().indexOf(searchTxt) !==-1){
            item.style.display='';
        }
        else{
            item.style.display = 'none';
        }
    });
}

//Remove note
function removeNote(e){
   if(e.target.id === 'dt'){
       if(confirm("Are you sure")){
           //Delete Notes
           var tr = e.target.parentElement.parentElement;
           items.removeChild(tr);

           //update table
           noteCount--;
           if(noteCount === 0){
               updateTable();
           }
       }
   }
}

//view and update note
function viewUpdateNote(e){
    if(e.target.id === 'vw'){
        //get the element values and update input field
        record = e.target.parentElement.parentElement;
        note = record.firstChild;
        ntitle.value = note.firstChild.textContent;
        nbody.value = note.lastChild.textContent;
        isUpdate = true;
    }
}

//reset all
function resetAll(){
    ntitle.value = '';
    nbody.value = '';
    isUpdate = false;
    newNote = '';
}