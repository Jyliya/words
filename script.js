let data = fetch("words.json");
let dataArr = [];
let type;
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'];
let categories = ["Сім'я", "Будинок, кімнати та меблі", "Кольори", "Природа та погода", "Тварини", "Улюбленці", "Фрукти", "Овочі", "Їжі та напої", "Характеристика", "Школа", "Дієслова", "Прислівники"];
let types = ['іменник', 'прикметник', 'дієслово', 'прислівник'];
// , 'займенник', 'вигук', "прийменник", "фраза", "сполучник"
data
    .then(response => response.json())
    .then(json => {
        sort(json["words"])
        for (item of json["words"]) {
            dataArr.push(item);
        }
    })
    .catch(error => console.error(error));

document.querySelector("select").addEventListener("change", (e) => {
    type = e.target.value;
    document.querySelector("#sorted").remove();
    sort(dataArr)
}); //Виклик сортування

function sort(arr) {
    if (type == undefined) {
        type = "none";
    }
    let arrLength;
    let arrType;
    let match;
    switch (type) {
        case "none":
            arrLength = 0;
            arrType = "none";
            break
        case "alphabet":
            arrLength = alphabet.length;
            arrType = alphabet;
            break
        case "category":
            arrLength = categories.length;
            arrType = categories;
            break
        case "type":
            arrLength = types.length;
            arrType = types;
            break
    }
    let table = document.createElement("table");
    table.id = "sorted"
    if (arrLength == 0 || arrType == "none") {
        for (let i = 0; i < arr.length; i++) {
            table.appendChild(addWordToATable(arr[i], i));
        }
    }
    else {
        for (let i = 0; i < arrLength; i++) {
            let blockHeadline = document.createElement("th");
            blockHeadline.colSpan = "2";
            blockHeadline.textContent = arrType[i];
            blockHeadline.classList.add("name")
            table.appendChild(blockHeadline);
            for (item of arr) {
                switch (type) {
                    case "alphabet":
                        match = Array.from(item.word)[0];
                        break
                    case "category":
                        match = item.category;
                        break
                    case "type":
                        match = item.type;
                        break
                };
                if (match == arrType[i]) {
                    table.appendChild(addWordToATable(item, i));
                }
            }
        }

    }
    document.querySelector("#word-block").appendChild(table)
} // Сортування

function addWordToATable(elem) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.textContent = elem.word;
    td2.textContent = elem.translation;
    td1.classList.add("word")
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
} // Додавання слів до таблиці (на сторінці)

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyA" && e.shiftKey) {
        window.location.href = "/words/results.html"
    }
}) //Відкриття сторінки з результатами