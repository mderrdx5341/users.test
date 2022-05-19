import User from './User';

import AppEventManager from '../Event/AppEventManager';
import AppEvent from '../Event/AppEvent';
import AppEventData from '../Event/AppEventData';

class UserAddTemplate
{
	private _form: HTMLElement;

	constructor()
	{
		this._form = document.createElement('form');
	}

	public buildHtmlElement(): HTMLElement
	{
		this._form.innerHTML = 
			`
				<div>Name: <input class="name" required name="name"></div>
				<div>Email: <input class="email" required name="email"></div>
				<div>Address: <input class="address" required name="address"></div>
				<div><input type="submit"></div>
			`;

		this._form.appendChild(this._buildLinkToList());

		this._form.addEventListener('submit', event => {
			event.preventDefault();
			let inputName: HTMLInputElement = this._form.querySelector('.name');
			let inputEmail: HTMLInputElement = this._form.querySelector('.email');
			let inputAddress: HTMLInputElement = this._form.querySelector('.address');
			let user = new User(
				0,
				inputName.value,
				inputEmail.value,
				inputAddress.value
			);
			this._createUser(user);
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

	private async _createUser(user: User)
	{
		let data = {
			name : user.name(),
			email : user.email(),
			address: user.address(),
		};

		let response = await fetch('/users/create/', {
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
			alert('User added');
		} else {
		  alert("Error HTTP: " + response.status);
		}
	}
}

export default UserAddTemplate;
