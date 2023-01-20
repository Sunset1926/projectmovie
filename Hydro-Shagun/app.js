const CheckboxValue = () => {
    const userProvince = document.getElementById("province").value
    //Checkbox state based on Province
    if (userProvince === "british_columbia") {
        document.getElementById("solar_energy").checked = true;
    }
    else {
        document.getElementById("solar_energy").checked = false;
    }
}
document.getElementById("province").addEventListener("change", CheckboxValue)

const buttonPressed = () => {
    // Get the value from the text box
    const userName = document.querySelector("#name_text_box").value
    const userEmail = document.querySelector("#email_box").value
    const morningElectricity = document.querySelector("#morning_electricity").value
    const afternoonElectricity = document.querySelector("#afternoon_electricity").value
    const eveningElectricity = document.querySelector("#evening_electricity").value
    const userProvince = document.querySelector("#province").value
    const solarEnergy = document.querySelector("#solar_energy").checked

    // To validate if the required fields are NOT empty
    if (userName === "") {
        document.getElementById("error-message-1").innerText = "Name cannot be empty."
        return
    }
    else {
        document.getElementById("error-message-1").innerText = ""
    }

    if (userEmail === "") {
        document.getElementById("error-message-2").innerText = "Email cannot be empty."
        return
    }
    else {
        document.getElementById("error-message-2").innerText = ""
    }

    if (morningElectricity === "") {
        document.getElementById("error-message-3").innerText = "Above Field cannot be empty."
        return
    }
    else {
        document.getElementById("error-message-3").innerText = ""
    }

    if (userProvince === "selectProvince") {
        document.getElementById("error-message-4").innerText = "Province cannot be empty."
        return
    }
    else {
        document.getElementById("error-message-4").innerText = ""
    }

    // Setting empty electricity amounts to 0
    if (afternoonElectricity === "") {
        document.getElementById("afternoon_electricity").value = 0;
        document.getElementById("empty-field-1").innerText = "Above field was empty, so value is set to 0, press Calculate again."
        return
    }
    else {
        document.getElementById("empty-field-1").innerText = ""
    }
    if (eveningElectricity === "") {
        document.getElementById("evening_electricity").value = 0;
        document.getElementById("empty-field-2").innerText = "Above field was empty, so value is set to 0, press Calculate again."
        return
    }
    else {
        document.getElementById("empty-field-2").innerText = ""
    }
    // Electricity amounts cannot be negative
    if (morningElectricity < 0 || afternoonElectricity < 0 || eveningElectricity < 0)
    {
        document.getElementById("error-negative-value").innerText = "Electricity amount cannot be negative!"
        return
    }
    else {
        document.getElementById("error-negative-value").innerHTML = ""
    }

    // Converting electricity amounts to a number and then multiplying with it's rate
   const morningAmount = parseFloat(morningElectricity) * 0.25        
   const afternoonAmount = parseFloat(afternoonElectricity) * 0.31
   const eveningAmount = parseFloat(eveningElectricity) * 0.40

   // Calculating total bill amount
   let totalAmount = morningAmount + afternoonAmount + eveningAmount

   // Hiding the form fields to output the receipt 
   document.getElementById("form_input").style.display="none"

   //Generating the receipt
    document.getElementById("form_output").style.display="block"
    document.getElementById("receipt").innerHTML = "<p>Name : " +  userName + "</p>" 
    document.getElementById("receipt").innerHTML += "<p>Email : " +  userEmail + "</p>"
    document.getElementById("receipt").innerHTML += "<p>Morning charges : $" +  morningAmount.toFixed(2) + "</p>"
    document.getElementById("receipt").innerHTML += "<p>Afternoon charges : $" +  afternoonAmount.toFixed(2) + "</p>"
    document.getElementById("receipt").innerHTML += "<p>Evening charges : $" +  eveningAmount.toFixed(2) + "</p>"
    document.getElementById("receipt").innerHTML += "<p>Total Usage charges : $" +  totalAmount.toFixed(2) + "</p>"

    // Calculating amount after discount on selecting solar energy
   if (solarEnergy === true) {
        const discountAmount = 0.2 * totalAmount
        totalAmount = totalAmount - discountAmount
        document.getElementById("receipt").innerHTML += "<p>Solar Energy Discount Amount : $" +  discountAmount.toFixed(2) + "</p>"
   }
    
   // Deducting provincial credit of $50 for living in British Columbia
   if (userProvince === "british_columbia") {
        totalAmount = totalAmount - 50
        document.getElementById("receipt").innerHTML += "<p>Provincial Credit : $50</p>"
        if (totalAmount < 0) {
            totalAmount = 0
        }
   }
    
    document.getElementById("receipt").innerHTML += "<p>Subtotal : $" +  totalAmount.toFixed(2) + "</p>"

    //Calculating Tax based on Province
    let tax = 0
    let taxAmount = 0
    if (userProvince === "british_columbia") {
        tax = 15
        taxAmount = 0.15 * totalAmount
        totalAmount = totalAmount + taxAmount
    }
    else if (userProvince === "quebec") {
        tax = 7
        taxAmount = 0.07 * totalAmount
        totalAmount = totalAmount + taxAmount
    }
    document.getElementById("receipt").innerHTML += "<p>Tax (" + tax +"%) : $" + taxAmount.toFixed(2) + "</p>"
    document.getElementById("receipt").innerHTML += "<p>Final Total : $" +  totalAmount.toFixed(2) + "</p>"
}
document.getElementById("btn").addEventListener("click", buttonPressed)


const startOver = () => {
    window.location.reload()
}
document.getElementById("start_over").addEventListener("click", startOver)