import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import ContactTop, { ContactTopProps } from "components/ContactTop";
import Seo from "components/Seo";
import { PostEmailBody, PostEmailData } from "pages/api/email";

function Contact(): JSX.Element {
  const handleSubmit = useCallback<ContactTopProps["onSubmit"]>(
    async ({ budget, companyName, deadline, email, name, subject, text }) => {
      await axios.post<
        PostEmailData,
        AxiosResponse<PostEmailData>,
        PostEmailBody
      >("/api/email", {
        subject,
        from: `"${name}${companyName ? ` - ${companyName}` : ""}" <${email}>`,
        replyTo: email,
        text: `${text}\n\n予算：${budget}円\n納期：${deadline}`,
      });

      toast.success("メールを送信しました！");
    },
    []
  );

  return (
    <>
      <Seo title="CONTACT" />
      <ContactTop onSubmit={handleSubmit} />
    </>
  );
}

export default Contact;
