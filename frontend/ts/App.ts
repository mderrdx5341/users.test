import UsersPanel from './Users/UsersPanel';
import SubscriberInterface from './Event/SubscriberInterface';
import AppEventManager from './Event/AppEventManager';
import AppEventData from './Event/AppEventData';

class App implements SubscriberInterface
{
	public static auth = false;
	private _appContainer: HTMLElement;
	private _usersPanel: UsersPanel;

	constructor(selector: string)
	{
		AppEventManager.subscribe(this, 'changePanel');
		this._appContainer = document.querySelector(selector);
		this._usersPanel = new UsersPanel();
	}

	public async run() : Promise<void>
	{
		await this._usersPanel.switchToListUsers();
		this._appContainer.appendChild(await this._usersPanel.buildHtmlElement())
	}

	public async invoke(eventName: string, eventData: AppEventData)
	{
		switch(eventData.data()) {
			case 'UserList':
				await this._usersPanel.switchToListUsers();
				break;
			case 'AddUser':
				await this._usersPanel.switchToAddUser();
				break;
			case 'EditUser':
				await this._usersPanel.switchToEditUser(eventData.id());
				break;
			case 'Auth':
				await this._usersPanel.switchToAuthAdmin();
				break;
		}
	}
}

export default App;
