"use client";

import Link from "next/link";
import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";

const HeaderAuth = () => {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Avatar
            className="shadow-xl cursor-pointer"
            src={session.data.user.image || ""}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4 space-y-2">
            <p className="font-semibold">{session.data.user.name}</p>
            <form action={actions.signOut}>
              <Button color="primary" size="sm" type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return authContent;
};

export default HeaderAuth;
