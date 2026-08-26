"use client";
import axios from "axios";
import { type JSX, useCallback } from "react";
import { toast } from "react-toastify";
import Contact, { ContactProps } from "@/components/Contact";

export default function Client(): JSX.Element {
  const handleSubmit = useCallback<ContactProps["onSubmit"]>(async (values) => {
    await toast.promise(axios.post("/email", values), {
      error: "送信に失敗しました",
      pending: "送信しています…",
      success: "メッセージを送信しました",
    });
  }, []);

  return <Contact onSubmit={handleSubmit} />;
}
