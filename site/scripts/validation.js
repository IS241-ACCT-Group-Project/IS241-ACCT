const name = document.getElementById('name')
const address = document.getElementById('address')
const zipCode = document.getElementById('zipCode')
const phone = document.getElementById('phone')
const username = document.getElementById('username')
const password = document.getElementById('password')
const siteID = document.getElementByID('siteID')
const patientID = document.getElementById('paitentID')

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

	if (username.value === '' || username.value == null) {
		messages.push('Username is required')
	}

	if (password.value === '' || password.value == null) {
		messages.push('Password is required')
	}
	if (siteID.value === '' || siteID.value == null) {
		messages.push('Site ID is required')
	}
	if (patientID.value === '' || paiteintID.value == null) {
		messages.push('Patient ID is required')
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
	
	if (messages.length > 0)
	{
		e.preventDefault()
		errorElement.innerText = messages.join(', ')
	}
});
