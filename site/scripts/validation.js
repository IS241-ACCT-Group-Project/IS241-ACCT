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
		messages.push("Password must be 5 digits.")
    }
	if (messages.length > 0)
	{
		e.preventDefault()
		errorElement.innerText = messages.join(', ')
	}
});
