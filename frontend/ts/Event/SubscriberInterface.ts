import GameEventData from './GameEventData';

interface SubscriberInterface
{
	invoke(param: string, eventData: GameEventData): void;
}

export default SubscriberInterface;
