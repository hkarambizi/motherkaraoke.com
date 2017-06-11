const pubsub = (() => {
  const topics = {};

  const subscribe = (eventName, callback) => {
    topics[eventName] = topics[eventName] || [];
    topics[eventName].push(callback);
  };

  const unsubscribe = (eventName, callback) => {
    if (topics[eventName]) {
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
