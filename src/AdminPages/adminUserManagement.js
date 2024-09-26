const ul_style = {
	list_style_type: 'none',
	padding: '0px'
};

function getUsers(){

}

function getSponsors(){

}

function getAdmins(){

}

function removeSelected(){

}

function adminManagement() {
	let users_to_delete = [];
	//create code to dynamically make list
	return(
		<div class="Admin_User_Management">
			<h1>User Selection</h1>
			<div class="User-Selection">
				<select id="option1">
					<option value="">Select a user group</option>
					<option value="Drivers">Drivers</option>
					<option value="Sponsors">Sponsors</option>
					<option value="Admins">Admins</option>
				</select>
			</div>

			<div class="User-List">
				<h2>Users</h2>
				<ul id="userList" style={ul_style}>
					<li><input type="checkbox" id="user1"><label for="user1"> User 1</label></li>
					<li><input type="checkbox" id="user2"><label for="user2"> User 2</label></li>
					<li><input type="checkbox" id="user3"><label for="user3"> User 3</label></li>
					<li><input type="checkbox" id="user4"><label for="user4"> User 4</label></li>
				</ul>
			</div>
			<div>
				<Button onClick={removeSelected(users_to_delete)}></Button>
			</div>
		</div>
	);
}
