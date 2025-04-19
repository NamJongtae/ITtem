class Observable {
  private observers: Observer[] = [];

  setObserver(callback: any) {
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
  callback: any;

  constructor(callback: any) {
    this.callback = callback;
  }
}

const tokenObservable = new Observable();
export default tokenObservable;
