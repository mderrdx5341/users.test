import User from './User';
import UserListTemplate from './UserListTemplate';
import UserAddTemplate from './UserAddTemplate';
import UserEditTemplate from './UserEditTemplate';

import AppEventManager from '../Event/AppEventManager';
import AppEvent from '../Event/AppEvent';
import AppEventData from '../Event/AppEventData';

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

	public async switchToListUsers() : Promise<void>
	{
		this._clearHtml();
		await this._listUsers();
	}

	public async switchToAddUser() : Promise<void>
	{
		this._clearHtml();
		await this._addUser();
	}

	public async switchToEditUser(id: number) : Promise<void>
	{
		this._clearHtml();
		await this._editUser(id);
	}

	public async buildHtmlElement() : Promise<HTMLElement>
	{
		return this._html;
	}

	private _clearHtml()
	{
		this._html.innerHTML = '';
	}

	private async _listUsers () : Promise<void>
	{
		let users = await this._getUsers();
		users.forEach((user: User) => {
			let userListTemplate = new UserListTemplate(user);
			this._html.appendChild(userListTemplate.buildHtmlElement());
		});

		this._html.appendChild(this._buildHtmlButtonAdd());
		this._html.appendChild(this._buildHtmlButtonDelete());
	}

	private async _addUser() : Promise<void>
	{
		let userAddTemplate = new UserAddTemplate();
		this._html.appendChild(userAddTemplate.buildHtmlElement());
	}

	private async _editUser(id: number) : Promise<void>
	{
		let user = await this._getUser(id);
		let userEditTemplate = new UserEditTemplate(user);
		this._html.appendChild(userEditTemplate.buildHtmlElement());
	}

	private async _getUser(id: number) : Promise<User>
	{
		let data = {id: id}
		let user: User;
		let response = await fetch('/users/get-by-id/', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (response.ok) { 
			let json = await response.json();
			user = new User(
				json.id,
				json.name,
				json.email,
				json.address
			);
		} else {
		  alert("Error HTTP: " + response.status);
		}

		return user;
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
			AppEventManager.trigger(
				new AppEvent('changePanel', new AppEventData('AddUser'))
			);
		});
		return btn;
	}

	private _buildHtmlButtonDelete() : HTMLElement
	{
		let btn = document.createElement('button');
		btn.innerHTML = 'Delete';
		btn.addEventListener('click', event => {
			this._deleteUsers();
		});
		return btn;
	}

	private async _deleteUsers() : Promise<void>
	{
		let checkboxes = document.querySelectorAll('.delete:checked');
		if (checkboxes.length === 0) {
			return;
		} else {
			let ids:number[] = [];
			checkboxes.forEach((checkbox: HTMLInputElement) => {
				ids.push(parseInt(checkbox.value));
			});

			let response = await fetch('/users/delete/', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(ids)
			});
			if (response.ok) { 
				let json = await response.json();
				AppEventManager.trigger(
					new AppEvent('changePanel', new AppEventData('UserList'))
				);
			} else {
			  alert("Error HTTP: " + response.status);
			}
		}
	}
}

export default UsersPanel;
