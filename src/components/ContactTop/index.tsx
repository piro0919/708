import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";
import Article from "components/Article";
import Button from "components/Button";

type FieldValues = {
  companyName: string;
  content: string;
  email: string;
  name: string;
};

export type ContactTopProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

function ContactTop({ onSubmit }: ContactTopProps): JSX.Element {
  const { handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      companyName: "",
      content: "",
      email: "",
      name: "",
    },
  });

  return (
    <div className={styles.wrapper}>
      <Article heading="CONTACT">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formInner}>
            <div className={styles.labelsWrapper}>
              <label className={styles.label}>
                <span className={styles.label2}>貴社名</span>
                <input {...register("companyName")} className={styles.input} />
              </label>
              <label className={styles.label}>
                <span className={styles.label2}>
                  お名前<abbr>*</abbr>
                </span>
                <input
                  {...register("name", { required: true })}
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                <span className={styles.label2}>
                  メールアドレス<abbr>*</abbr>
                </span>
                <input
                  {...register("email", { required: true })}
                  className={styles.input}
                  type="email"
                />
              </label>
              <label className={styles.label}>
                <span className={styles.label2}>
                  お問い合わせ内容<abbr>*</abbr>
                </span>
                <textarea
                  {...register("content", { required: true })}
                  className={styles.textarea}
                />
              </label>
            </div>
            <div className={styles.buttonWrapper}>
              <Button type="submit">送信する</Button>
            </div>
          </div>
        </form>
      </Article>
    </div>
  );
}

export default ContactTop;
