import { QueryClient, dehydrate } from "@tanstack/react-query";
import { authSlice } from "@/store/authSlice";
import wrapper from "@/store/store";
import { AuthData } from "@/types/authTypes";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import customAxios from "./customAxios";
import { queryKeys } from "@/queryKeys";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./server";
import { IronSessionType } from "@/types/apiTypes";
import { verifyToken } from "./token";
import { REFRESH_TOKEN_KEY } from "@/constants/constant";
import { isAxiosError } from "axios";

type GetServerSidePropsFunc<P = { [key: string]: any }> = (
  context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<P>>;

export const withAuthServerSideProps = (
  getServerSidePropsFunc: GetServerSidePropsFunc
) => {
  return wrapper.getServerSideProps((store) => async (context) => {
    const queryClient = new QueryClient();
    const cookies = context.req.headers.cookie;
    const session = await getIronSession<IronSessionType>(
      context.req,
      context.res,
      sessionOptions
    );
    if (cookies && session) {
      const refreshToken = session.refreshToken;
      const decodeToken = await verifyToken(refreshToken, REFRESH_TOKEN_KEY);
      const uid = decodeToken?.data?.user.uid;

      await queryClient.prefetchQuery({
        queryKey: queryKeys.auth.info(uid).queryKey,
        queryFn: async () => {
          try {
            const response = await customAxios.get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`,
              {
                headers: {
                  Cookie: cookies,
                },
              }
            );
            return response.data;
          } catch (error) {
            console.log(error);
            if (
              isAxiosError<{ message: string }>(error) &&
              error.response?.data.message === "세션이 만료됬어요."
            ) {
              session.destroy();
              return { message: "세션이 만료됬어요." };
            }
          }
        },
      });

      const data = queryClient.getQueryData(
        queryKeys.auth.info(uid).queryKey
      ) as {
        user: AuthData;
        message: string;
      };

      if (data) {
        if (data.message === "세션이 만료됬어요.") {
          return {
            redirect: {
              destination: "/signin",
              permanent: false,
            },
          };
        }
        store.dispatch(authSlice.actions.saveAuth(data.user));
      }
    }

    let additionalProps = {};
    if (getServerSidePropsFunc) {
      const result = await getServerSidePropsFunc(context);
      if ("props" in result) {
        additionalProps = result.props;
      }
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        ...additionalProps,
      },
    };
  });
};
