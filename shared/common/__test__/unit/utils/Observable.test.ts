import tokenObservable from "@/shared/common/utils/Observable";

describe("Observable 클래스 테스트", () => {
  let callback1: jest.Mock;
  let callback2: jest.Mock;

  beforeEach(() => {
    callback1 = jest.fn();
    callback2 = jest.fn();
    tokenObservable.removeAll(); // 초기화
  });

  it("옵저버를 등록하고 notifyAll 시 콜백이 실행됩니다.", () => {
    tokenObservable.setObserver(callback1);
    tokenObservable.setObserver(callback2);

    tokenObservable.notifyAll();

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it("removeAll 호출 시 모든 옵저버가 제거됩니다.", () => {
    tokenObservable.setObserver(callback1);
    tokenObservable.setObserver(callback2);

    tokenObservable.removeAll();
    tokenObservable.notifyAll();

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });

  it("setObserver가 Observer 인스턴스를 반환됩니다.", () => {
    const observer = tokenObservable.setObserver(callback1);
    expect(observer).toBeDefined();
    expect(typeof observer.callback).toBe("function");
  });
});
