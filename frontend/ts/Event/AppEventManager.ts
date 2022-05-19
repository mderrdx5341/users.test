import AppEvent from './AppEvent';
import SubscriberInterface from './SubscriberInterface';

class AppEventManager
{
	public static _subscribers: {[k: string]: SubscriberInterface[]} = {}

	public static trigger(event: AppEvent)
	{
		if (typeof(this._subscribers[event.name()]) === 'undefined') {
			return;
		}

		this._subscribers[event.name()].forEach((subscriber: SubscriberInterface) => {
			subscriber.invoke(event.name(), event.data());
		});
	}

	public static subscribe(subscriber: SubscriberInterface, eventName: string)
	{
		if (typeof(this._subscribers[eventName]) === 'undefined') {
			this._subscribers[eventName] = [subscriber];
			return;
		}
		this._subscribers[eventName].push(subscriber)
	}
}

export default AppEventManager;
