import AppEventData from './AppEventData';

class AppEvent
{
	private _name: string;
	private _eventData: AppEventData;

	constructor(name: string, eventData: AppEventData)
	{
		this._name = name;
		this._eventData = eventData;
	}

	public name() : string
	{
		return this._name;
	}

	public data() : AppEventData
	{
		return this._eventData;
	}
}

export default AppEvent;
