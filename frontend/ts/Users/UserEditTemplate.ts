import User from './User';

import AppEventManager from '../Event/AppEventManager';
import AppEvent from '../Event/AppEvent';
import AppEventData from '../Event/AppEventData';
import App from '../App';

class UserEditTemplate
{
	private _user: User;
	private _form: HTMLElement;

	constructor(user: User)
	{
		this._user = user;
		this._form = document.createElement('form');
	}

	public buildHtmlElement(): HTMLElement
	{
		this._form.innerHTML = 
			`
				<input type="hidden" class="id" name="id" value="${this._user.id()}">
				<div>Name: <input class="name" required name="name" value="${this._user.name()}"></div>
				<div>Email: <input class="email" required name="email" value="${this._user.email()}"></div>
				<div>Address: <input class="address" required name="address" value="${this._user.address()}"></div>
				<div><input type="submit"></div>
			`;
		this._form.appendChild(this._buildLinkToList());

		this._form.addEventListener('submit', event => {
			event.preventDefault();
			let inputId: HTMLInputElement = this._form.querySelector('.id');
			let inputName: HTMLInputElement = this._form.querySelector('.name');
			let inputEmail: HTMLInputElement = this._form.querySelector('.email');
			let inputAddress: HTMLInputElement = this._form.querySelector('.address');
			let user = new User(
				parseInt(inputId.value),
				inputName.value,
				inputEmail.value,
				inputAddress.value
			);
			this._updateUser(user);
		});
		return this._form;
	}

	private _buildLinkToList() : HTMLElement
	{
		let link = document.createElement('a');
		link.innerHTML = 'to List';
		link.setAttribute('href', "/");
		link.addEventListener('click', event => {
			event.preventDefault();
			AppEventManager.trigger(
				new AppEvent('changePanel', new AppEventData('UserList'))
			);
		});

		return link;
	}

	private async _updateUser(user: User)
	{
		let data = {
			id : user.id(),
			name : user.name(),
			email : user.email(),
			address: user.address(),
		};

		let response = await fetch('/users/update/', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (response.ok) { 
			let json = await response.json();
			if (json.message === 'not_auth') {
				AppEventManager.trigger(
					new AppEvent('changePanel', new AppEventData('Auth'))
				);
				return;
			}
			App.auth = true;
			alert('User updated');
		} else {
		  alert("Error HTTP: " + response.status);
		}
	}
}

export default UserEditTemplate;
