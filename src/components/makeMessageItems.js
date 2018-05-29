let today = new Date(Date.now());
const messageConstructor = (messageItem) => {
    let gapTime = ''
    let sendTime = messageItem.get('sendTime')
    if (sendTime !== undefined) {
        sendTime = new Date(Date.parse(sendTime));
        gapTime = Math.ceil((today.getTime() - sendTime.getTime()) / (1000 * 3600 * 24))
    }
    return {
        message: messageItem.get('message'),
        sendTime: gapTime,
        id: messageItem.get('id')
    };
};

export default function makeMessageItems(messages) {
    return messages.filter(message => !message.get('translateTime')).map(messageItem => {
        return {
            ...messageConstructor(messageItem)
        };
    }).toJS();
}
