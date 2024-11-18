import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import CreateAccount from "../components/CreateAccount";

export const Route = createFileRoute("/create-account")({
  component: CreateAccount,
});
