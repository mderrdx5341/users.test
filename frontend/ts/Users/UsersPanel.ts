import User from './User';
import UserListTemplate from './UserListTemplate';
import UserAddTemplate from './UserAddTemplate';

class UsersPanel
{
	private _html: HTMLElement;
	private _template: string;

	constructor()
	{
		this._html = document.createElement('div');
		this._html.className = "user_panel";
		this._template = 'list';
	}

	public switchToListUsers() : void
	{
		this._template = 'list';
	}

	public switchToAddUser() : void
	{
		this._template = 'add';
	}

	public async buildHtmlElement() : Promise<HTMLElement>
	{
		switch(this._template) {
			case 'list':
				await this._listUsers();
				break;
			case 'add':
				await this._addUser();
				break;
		}

		return this._html;
	}

	private async _listUsers () : Promise<void>
	{
		let users = await this._getUsers();
		users.forEach((user: User) => {
			let userListTemplate = new UserListTemplate(user);
			this._html.appendChild(userListTemplate.buildHtmlElement());
		});

		this._html.appendChild(this._buildHtmlButtonAdd());
	}

	private async _addUser() : Promise<void>
	{
		let userAddTemplate = new UserAddTemplate();
		this._html.appendChild(userAddTemplate.buildHtmlElement());
	}

	private async _getUsers() : Promise<User[]>
	{
		let users: User[] = [];
		let response = await fetch('/users/');
		if (response.ok) { 
			let json = await response.json();
			json.forEach((userJson: {id: number, name: string, email: string, address: string}) => {
				let user = new User(
					userJson.id,
					userJson.name,
					userJson.email,
					userJson.address
				);
				users.push(user);
			});
		} else {
		  alert("Error HTTP: " + response.status);
		}

		return users;
	}

	private _buildHtmlButtonAdd() : HTMLElement
	{
		let btn = document.createElement('button');
		btn.innerHTML = 'Add';
		btn.addEventListener('click', event => {
			event.preventDefault();
			this.switchToAddUser();
		});
		return btn;
	}
}

export default UsersPanel;
