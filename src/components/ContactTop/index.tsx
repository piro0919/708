import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";
import Article from "components/Article";
import Button from "components/Button";

type FieldValues = {
  budget: string;
  companyName: string;
  deadline: string;
  email: string;
  name: string;
  subject: string;
  text: string;
};

export type ContactTopProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

function ContactTop({ onSubmit }: ContactTopProps): JSX.Element {
  const {
    formState: { isSubmitted, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      budget: "",
      companyName: "",
      email: "",
      name: "",
      subject: "",
      text: "",
    },
  });

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    reset();
  }, [isSubmitted, reset]);

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
                  件名<abbr>*</abbr>
                </span>
                <input
                  {...register("subject", { required: true })}
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                <span className={styles.label2}>
                  予算<abbr>*</abbr>
                </span>
                <span className={styles.budgetWrapper}>
                  <input
                    {...register("budget", { min: 1, required: true })}
                    className={`${styles.input} ${styles.budgetInput}`}
                    type="number"
                  />
                  <span>円</span>
                </span>
              </label>
              <label className={styles.label}>
                <span className={styles.label2}>
                  納期<abbr>*</abbr>
                </span>
                <input
                  {...register("deadline", { required: true })}
                  className={styles.input}
                  type="date"
                />
              </label>
              <label className={styles.label}>
                <span className={styles.label2}>
                  お問い合わせ内容<abbr>*</abbr>
                </span>
                <textarea
                  {...register("text", { required: true })}
                  className={styles.textarea}
                />
              </label>
            </div>
            <div className={styles.buttonWrapper}>
              <Button disabled={isSubmitting} type="submit">
                送信する
              </Button>
            </div>
          </div>
        </form>
      </Article>
    </div>
  );
}

export default ContactTop;
