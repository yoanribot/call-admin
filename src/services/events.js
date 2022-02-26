import Pusher from "pusher-js";
import { getUser } from './authentication';

Pusher.log = (msg) => {
  console.log(`EVENTS ${msg}`);
};
let eventsHandler;

function getEventsHandler () {
    const currentUser = getUser();

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_AUTH_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      authEndpoint: process.env.REACT_APP_PUSHER_APP_AUTH_ENDPOINT,
      auth: {
        headers: { "Authorization": `Bearer ${currentUser.access_token}` },
      },
    });

    pusher.connection.bind('error', function( err ) {
      if( err.error.data.code === 4004 ) {
        Pusher.log('Over limit!');
      }
    });

    eventsHandler = pusher;

    return eventsHandler;
  }

function subscribe (channel) {
  console.log('subscribe.......');
  if (eventsHandler) {
    const _channel = eventsHandler.subscribe(channel);

    return _channel;
  }
}

function unsubscribe (channel) {
  console.log('unsubscribe.......');
  if (!!eventsHandler) {
    eventsHandler.unsubscribe(channel);
  }
}

function bind (channel, event, cb) {
  const _channel = getChannel(channel);

  if (_channel) {
    _channel.bind(event, cb);
  }
}

function unbind (channel, event, cb) {
  const _channel = getChannel(channel);

  if (_channel) {
    _channel.unbind(event, cb);
  }
}

function getChannel (channel) {
  if (!!eventsHandler) {
    return eventsHandler.channel(channel);
  }
}

const appEvents = {
  getEventsHandler,
  subscribe,
  unsubscribe,
  bind,
  unbind,
  getChannel,
};

export default appEvents;