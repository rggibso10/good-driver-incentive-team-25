import './adminUserManagement.css'
import { Amplify } from 'aws-amplify'
import { Schema } from './amplify/data/resource'

function getUsersOfType(){
	selection = document.getElementByID('User-Selection').innerHMTL
	//reset list
	const list = document.getElementByID("User-List");
	list.innerHTML = '';
	if(selection.len === 0){
		const li = document.createElement('li');
		li.htmlFor = "none"
		li.textcontent = "Need to select a catagory of users";
		list.appendChild(li);
	}

	//get data from lambda function
	const client = generateClient<Schema>();
	const { code, users } = await client.queries.getUsers({
		table: type,
	});

	//parse data from code given
	if(code === 200){
		//figure out how the data is returned
		users.forEach(user => {
			const li = document.createElement('li');
			const checkbox = document.createElement('input');
			const label = document.createElement('label');
			checkbox.type = 'checkbox';
			checkbox.id = user
			label.htmlFor = user;
			label.textcontent = user;
			li.appendChild(checkbox);
			li.textcontent = label;
			list.appendChild(li);
		});
	}else if(code === 204){
		const li = document.createElement('li');
		li.htmlFor = "none"
		li.textcontent = "No users in this catagory";
		list.appendChild(li);
	}else if(code === 400{
		const li = document.createElement('li');
		li.htmlFor = "none"
		li.textcontent = "Error occured trying to get the user catagory";
		list.appendChild(li);
	}
}

function removeSelected(){

}


function adminManagement() {
	let users_to_delete = [];
	document.getElementByID('User-Selection').onchange = getUsersOfType
	//create code to dynamically make list
	return(
		<div class="Admin-User-Management">
			<h1>User Selection</h1>
			<div class="User-Selection">
				<select id="UserType">
					<option value="">Select a user group</option>
					<option value="Drivers">Drivers</option>
					<option value="Sponsors">Sponsors</option>
					<option value="Admins">Admins</option>
				</select>
			</div>

			<div class="User-Area">
				<h2>Users</h2>
				<ul id="User-List" style={ul_style}></ul>
			</div>
			<div>
				<Button onClick={removeSelected(users_to_delete)}></Button>
			</div>
		</div>
	);
}
