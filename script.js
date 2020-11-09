
let allowedEl = document.getElementById('allowed');
let deniedEl = document.getElementById('denied');
let hasFaceMask = false;


//get and save user input
function getInput(){
    
    const name = document.getElementById('name').value;
const age = document.getElementById('age').value;
hasFaceMask = document.getElementById('mask').value;
let gender = document.querySelector('input[name = gender]:checked').value;
console.log(gender);

if(!age || !name){
    alert("please fill all required filled")
    return;
}else{
    const newVisitor = {name, age, hasFaceMask, gender};
save(newVisitor);
allowedEl.innerText = "Allowed Visitors: "+ getAllowedVisitors().length;
deniedEl.innerText = "Denied visitors: " + getDeniedVisitors().length;    
}

viewAllVisitors();
}

//save to local storage
function save(visitor){
const visitors = getVisitors();
const allowedVisitors = getAllowedVisitors();
const deniedVisitors = getDeniedVisitors();
console.log(JSON.stringify(visitors) );
visitors.push(visitor );
localStorage.setItem("visitors", JSON.stringify(visitors) );

//check age and mask of visitors
if(visitor.age <12){
    deniedVisitors.push(visitor);
    localStorage.setItem("denied", JSON.stringify(deniedVisitors) );
alert("Hello, "+ visitor.name + ", You must be 12 years or older to enter Dev Mall");
}
else if(visitor.age >= 12 && hasFaceMask == "true"){
    allowedVisitors.push(visitor);
    localStorage.setItem("allowed", JSON.stringify(allowedVisitors) );
 alert("Hello, "+ visitor.name + ", welcome to Dev Mall");
}
else{
    deniedVisitors.push(visitor);
    localStorage.setItem("denied", JSON.stringify(deniedVisitors) );
    alert("Hello, "+ visitor.name + ", you have been denied entry into Dev Mall");

    
}
}

//get from local storage
function getVisitors(){
    const visitors =JSON.parse(localStorage.getItem('visitors')) ;
    
    //check if there are visitors 
if(!visitors  || visitors.length <1){
return [];
}
else{
    return visitors;
}

}


function getAllowedVisitors(){
    const visitors =JSON.parse(localStorage.getItem('allowed')) ;
    //check if there are visitors 
    if(!visitors  || visitors.length <1){
        return [];
        }
        else{
            return visitors;
        }
}


function getDeniedVisitors(){
    const visitors =JSON.parse(localStorage.getItem('denied')) ;
    //check if there are visitors 
    if(!visitors  || visitors.length <1){
        return [];
        }
        else{
            return visitors;
        }
}


function clearCounter(){
    localStorage.removeItem('visitors');
    localStorage.removeItem('allowed');
    localStorage.removeItem('denied');
window.location.reload();
}


//view visitors
function viewAllVisitors(){
    const data = getVisitors();
    const vElement = document.getElementById('all-visitors');
 const view =   data.map((item)=>{
     let visitorInAllowed = getAllowedVisitors().map((val)=>{return val.name.indexOf(item.name)});
let access =  visitorInAllowed[0] >= 0? "Allowed": "Denied";
console.log(visitorInAllowed[0]);
return ` 
<tr>
<td>${item.name}</td>
<td>${item.age}</td>
<td>${item.gender}</td>
<td>${item.hasFaceMask === "true"? "Yes" : "No"}</td>
<td>${access}</td>
</tr>`;

    })
    vElement.innerHTML=`  <tr>
    <th>NAME</th>
    <th>AGE</th>
    <th>GENDER</th>
    <th>HAS FACE MASK</th>
    <th>ACCESS</th>
    </tr>`+ view.join('\n');
}

//load javascript when windows start
(function(){
    allowedEl.innerText ="Allowed visitors: "+ getAllowedVisitors().length;
    deniedEl.innerText = "Denied visitors: " + getDeniedVisitors().length;
    console.log("visitors:"+ getVisitors());
    ;
})(); 

