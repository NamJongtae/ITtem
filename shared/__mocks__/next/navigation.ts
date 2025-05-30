// __mocks__/next/navigation.ts
export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  refresh: jest.fn()
}));

export const usePathname = jest.fn(() => "/mock-path");
export const useSearchParams = jest.fn(() => new URLSearchParams("foo=bar"));
export const useParams = jest.fn(() => ({ id: "123" }));
