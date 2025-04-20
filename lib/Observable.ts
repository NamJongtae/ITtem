type Callback = () => void;
class Observable {
  private observers: Observer[] = [];

  setObserver(callback: Callback) {
    const observer = new Observer(callback);
    this.observers.push(observer);

    return observer;
  }

  notifyAll() {
    this.observers.forEach((observer) => {
      observer.callback();
    });
  }

  removeAll() {
    this.observers = [];
  }
}

class Observer {
  callback: Callback;

  constructor(callback: Callback) {
    this.callback = callback;
  }
}

const tokenObservable = new Observable();
export default tokenObservable;
