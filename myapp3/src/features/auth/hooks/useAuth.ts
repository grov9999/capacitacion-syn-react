/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { AxiosError } from "axios";
import api from "../../../core/utils/api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogoutWithError,
  onLogoutWithoutError,
} from "../../../store/auth/authSlice";

interface login {
  email: string;
  password: string;
}
interface register extends login {
  name: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  // const { status, user, errorMessage } = useSelector(
  //   (root: RootState) => root.auth
  // );

  const { status, user, errorMessage } = useAppSelector((root) => root.auth);

  const startLogin = async (formLogin: login) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post("/auth/login", formLogin);
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.user.name, uid: data.user.id }));
    } catch (error) {
      const err = error as AxiosError;
      const errorResponse = err.response?.data as any;
      if (!errorResponse) {
        console.log("entre");
        dispatch(onLogoutWithError(err.message));
      } else {
        if (!!errorResponse?.msg) {
          dispatch(onLogoutWithError(errorResponse?.msg));
        } else if (!!errorResponse.errors) {
          const arrErrors = Object.values(errorResponse.errors).map(
            (e: any) => e.msg
          );
          dispatch(onLogoutWithError(arrErrors.join(",")));
        } else {
          dispatch(onLogoutWithError("Credenciales incorrectas"));
        }
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ email, password, name }: register) => {
    dispatch(onChecking());
    try {
      const { data } = await api.post("/auth/register", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.user.name, uid: data.user.id }));
    } catch (error) {
      const err = error as AxiosError;
      const errorResponse = err.response?.data as any;
      if (!!errorResponse?.msg) {
        dispatch(onLogoutWithError(errorResponse?.msg));
      } else if (!!errorResponse.errors) {
        const arrErrors = Object.values(errorResponse.errors).map(
          (e: any) => e.msg
        );
        dispatch(onLogoutWithError(arrErrors.join(",")));
      } else {
        dispatch(onLogoutWithError("Credenciales incorrectas"));
      }
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutWithoutError());
  };

  // cuando entro por primera ves, si hay un token que vuelva a generar un nuevo token
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogoutWithoutError());
    try {
      const { data } = await api.get("/auth/refresh-token");
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.user.name, uid: data.user.id }));
    } catch (err) {
      console.log(err);
      localStorage.clear();
      dispatch(onLogoutWithoutError());
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  };
};
