
let currentEditingParagraph = null;

let D = document.getElementById("d");
D.addEventListener("click", function () {
    let rightbottom = document.getElementById("rightbottom");
    rightbottom.style.display = "none";
});

let click = document.getElementById("btn").addEventListener("click", function (e) {
    e.preventDefault();

    let ParentTag = currentEditingParagraph || document.createElement("div");
    ParentTag.setAttribute("class", "parent");

    let Target = document.getElementById("rightbottom");
    Target.style.height = "100%";
    if (!currentEditingParagraph) {
        Target.appendChild(ParentTag);
    }

    let Input = document.getElementById("input").value;
    let currentTime = new Date();
    let formattedTime = currentTime.toLocaleString();

    let Element = currentEditingParagraph || document.createElement("p");
    Element.setAttribute("class", "ptag1");
    Element.setAttribute("style", "display:block;");
    Element.innerHTML = `${Input} - ${formattedTime}`;



    if (!currentEditingParagraph) {
        ParentTag.appendChild(Element);

        let CheckBox = document.createElement("img");
        CheckBox.setAttribute("class", "icons checkinput");
        CheckBox.setAttribute("src", "https://img.icons8.com/ios/50/edit-property.png");
        CheckBox.setAttribute("style", "cursor:pointer;height:22px;width:22px");
        ParentTag.appendChild(CheckBox);

        let Delete = document.createElement("img");
        Delete.setAttribute("class", "icons delete");
        Delete.setAttribute("src", "https://img.icons8.com/quill/50/waste.png");
        Delete.setAttribute("style", "cursor:pointer;height:22px;width:22px");
        ParentTag.appendChild(Delete);


        let Completed = document.createElement("img");
        Completed.setAttribute("src","https://img.icons8.com/sf-regular-filled/48/checked-checkbox.png");
        Completed.setAttribute("id","check");
        Completed.setAttribute("style","cursor:pointer;height:32px;width:32px;margin-bottom:-5px;margin-left:15px;");
        ParentTag.appendChild(Completed);


        Completed.addEventListener("click",function(){
            if(ParentTag.style.textDecorationLine === "line-through"){
                ParentTag.style.textDecorationLine = "none";
            }
            else{
                ParentTag.style.textDecorationLine = "line-through";
            }
        });


        Delete.addEventListener("click", function () {
            if(confirm("Are You Sure Want To Delete Your List")){
                ParentTag.style.display = "none";
            }
        });

        CheckBox.addEventListener("click", function () {
            currentEditingParagraph = Element;
            handleCheckBoxClick(Element);
        });
    }

    if (Input == "" || Input == null) {
        alert("Please Enter Your List Below");
        ParentTag.style.display = "none";
    } else {
        let existingData = localStorage.getItem("ToDoList");
        let ToDo = existingData ? JSON.parse(existingData) : [];
        ToDo.push(Input);
        localStorage.setItem("ToDoList", JSON.stringify(ToDo));
        document.getElementById("input").value = "";
    }

    if (Element.textContent.length > 40) {
        Element.style.whiteSpace = "pre-wrap";
        Element.style.overflowWrap = "break-word";
    }

    currentEditingParagraph = null;
});

function handleCheckBoxClick(clickedElement) {
    let Ptags = document.querySelectorAll(".ptag1");
    let Inp = document.getElementById("input");

    for (let i = 0; i < Ptags.length; i++) {
        if (Ptags[i] === clickedElement) {
            Inp.value = Ptags[i].innerHTML.split(' - ')[0];
            break;
        }
    }
}
