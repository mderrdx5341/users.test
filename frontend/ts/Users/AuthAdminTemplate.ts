import App from '../App';
import AppEventManager from '../Event/AppEventManager';
import AppEvent from '../Event/AppEvent';
import AppEventData from '../Event/AppEventData';

class AuthAdminTemplate
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
				<div>Login: <input class="login" required name="name"></div>
				<div>Password: <input class="password" type="password" required name="email"></div>
				<div><input type="submit"></div>
			`;

		this._form.addEventListener('submit', event => {
			event.preventDefault();
			let inputLogin: HTMLInputElement = this._form.querySelector('.login');
			let inputPassword: HTMLInputElement = this._form.querySelector('.password');
			this._auth(inputLogin.value, inputPassword.value);
		});
		return this._form;
	}

	private async _auth(login: string, password: string)
	{
		let data = {
			login : login,
			password : password,
		};

		let response = await fetch('/admin/auth/', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (response.ok) { 
			let json = await response.json();
			if (json.message !== 'not_auth') {
				App.auth = true;
				AppEventManager.trigger(
					new AppEvent('changePanel', new AppEventData('UserList'))
				);
			} else {
				alert('error Login or Password');
			}
		} else {
		  alert("Error HTTP: " + response.status);
		}
	}
}

export default AuthAdminTemplate;
