"use server";
import { signIn as _signIn, signOut as _signOut } from "../auth";

export const signIn = async () => {
  return await _signIn();
};

export const signOut = async () => {
  return await _signOut();
};
