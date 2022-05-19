import User from './User';

import AppEventManager from '../Event/AppEventManager';
import AppEvent from '../Event/AppEvent';
import AppEventData from '../Event/AppEventData';

class UserListTemplate
{
	private _user: User;

	constructor(user: User)
	{
		this._user = user;
	}

	public buildHtmlElement(): HTMLElement
	{
		let html = document.createElement('div');
		html.innerHTML = 
			`
				${this._user.id()}
				${this._user.name()}
				${this._user.email()}
				${this._user.address()}
				<input type="checkbox" class="delete" name="userDelete" value="${this._user.id()}">
			`
		html.appendChild(this._buildLinkEdit());

		return html;
	}

	private _buildLinkEdit() : HTMLElement
	{
		let link = document.createElement('a');
		link.innerHTML = 'Edit';
		link.setAttribute('href', "/");
		link.addEventListener('click', event => {
			event.preventDefault();
			AppEventManager.trigger(
				new AppEvent('changePanel', new AppEventData('EditUser', this._user.id()))
			);
		});

		return link;
	}
}

export default UserListTemplate;
