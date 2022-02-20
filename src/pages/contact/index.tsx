import { useCallback } from "react";
import ContactTop, { ContactTopProps } from "components/ContactTop";
import Seo from "components/Seo";

function Contact(): JSX.Element {
  const handleSubmit = useCallback<ContactTopProps["onSubmit"]>((data) => {
    console.log(data);
  }, []);

  return (
    <>
      <Seo title="CONTACT" />
      <ContactTop onSubmit={handleSubmit} />
    </>
  );
}

export default Contact;
