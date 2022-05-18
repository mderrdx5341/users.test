import User from './User';
import UserTemplate from './UserTemplate';

class UsersPanel
{
	private _html: HTMLElement;

	constructor()
	{
		this._html = document.createElement('div');
		this._html.className = "user_panel";
	}

	public async buildHtmlElement() : Promise<HTMLElement>
	{
		let users = await this._getUsers();
		users.forEach((user: User) => {
			let userTemplate = new UserTemplate(user);
			this._html.appendChild(userTemplate.buildHtmlElement());
		});

		return this._html;
	}

	public async _getUsers() : Promise<User[]>
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
}

export default UsersPanel;
