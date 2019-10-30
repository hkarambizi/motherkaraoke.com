const pubsub = (() => {
  const topics = {};

  const subscribe = (eventName, callback) => {
    console.log("IN SUBSCRIBE:  ", topics);
    topics[eventName] = topics[eventName] || [];
    topics[eventName].push(callback);
  };

  const unsubscribe = (eventName, callback) => {
    if (topics[eventName]) {
      console.log("IN UNSUBSCRIBE:  ", topics);
      for (let i = 0, len = topics[eventName].length; i < len; i++) {
        if (topics[eventName][i] === callback) {
          topics[eventName].splice(i, 1);
          break;
        }
      }
    }
  };

  const publish = (eventName, data) => {
    if (topics[eventName]) {
      console.log("IN PUBLISH:  ", topics);
      topics[eventName].forEach((callback) => {
        callback(data);
      });
    }
  };

  return {
    subscribe,
    unsubscribe,
    publish,
  };
})();

export default pubsub;
