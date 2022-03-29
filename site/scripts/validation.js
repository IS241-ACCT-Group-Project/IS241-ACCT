const name = document.getElementById('name')
const address = document.getElementById('address')
const zipCode = document.getElementById('zipCode')
const phone = document.getElementById('phone')

var form = document.getElementById("newSiteForm");
form.addEventListener('submit', (e) => {
	let messages = []
	if (name.value === '' || name.value == null)
	{
		messages.push('Name is required')
	}

	if (zipCode.value.length < 5)
	{
		messages.push("Zipcode must be 5 digits.")
	}

	function phone(inputtxt) {
		var phoneno = /^\d{10}$/;
		if ((inputtxt.value.match(phoneno))
        {
			return true;
		}
		else {
			alert("Please enter a valid 10 digit phone number with appropriate characters");
			return false;
		}
	}


	else {
		alert("message");
		return false;
	}
	
	if (messages.length > 0)
	{
		e.preventDefault()
		errorElement.innerText = messages.join(', ')
	}
});
