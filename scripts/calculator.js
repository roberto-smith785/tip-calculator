// items to add eventlisteners to start
var bill = document.querySelector("#bill-input");
var tip = document.querySelector(".btn-active");
var people = document.querySelector("#people")
var err = document.querySelector(".error");
var btns = document.querySelectorAll(".percentage");
var reset = document.querySelector(".reset-btn");

// items to add eventlisteners to end



// containers start
var tip_container = document.querySelector(".tip");
var total_container = document.querySelector(".total-amount");
// containers end

function calTip(amount, percentage, persons) {
    var tip_due;
    var total_person;
    var total;

    tip_due = ((amount * percentage) / persons);
    total = ((tip_due * persons) + amount);
    total_person = (total / persons);

    tip_container.innerText = tip_due;
    total_container.innerText = total_person;
}

function check_values() {

    for (let i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("btn-active")) {
            calTip(parseFloat(bill.value), parseFloat(btns[i].value), parseFloat(people.value));
        } else if (btns[i].classList.contains("btn-active") && btns[i].getAttribute("id") == "per-custom") {
            btns[i].addEventListener("input", () => {
                btns[i].setAttribute("value", (btns[i].value / 100));
            })
            calTip(parseFloat(bill.value), parseFloat(btns[i].value), parseFloat(people.value));
        }
    }


}


bill.addEventListener("click", check_values());
people.addEventListener("click", check_values());

// tip eventlistener section start
btns.forEach(btn => {
        btn.addEventListener("click", () => {

            for (let i = 0; i < btns.length; i++) {
                if (btn.getAttribute("id") == btns[i].getAttribute("id")) {
                    btns[i].classList.add("btn-active");
                    if (btn.getAttribute("id") == "per-custom") {
                        btn.addEventListener("click", () => {
                            err.style = "display:none";
                            btn.setAttribute("value", (btn.value / 100));
                        })
                        calTip(parseFloat(bill.value), parseFloat(btn.value), parseFloat(people.value));

                    } else {
                        calTip(parseFloat(bill.value), parseFloat(btn.value), parseFloat(people.value));
                    }
                } else {
                    btns[i].classList.remove("btn-active");
                }
            }

        })
    })
    // tip eventlistener section end


bill.addEventListener("change", check_values());
people.addEventListener("change", check_values());

reset.addEventListener("click", () => {
    bill.value = '';
    people.value = '';
    tip_container.innerText = 0.00;
    total_container.innerText = 0.00;
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("btn-active");
    }
    btns[5].value = '';
})