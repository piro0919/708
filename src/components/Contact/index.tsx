import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import i18next from "i18next";
import { type JSX, ReactNode } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ja/zod.json";
import styles from "./style.module.scss";

// eslint-disable-next-line no-void
void i18next.init({
  lng: "ja",
  resources: {
    ja: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

const schema = z.object({
  budget: z.coerce.number().min(0),
  companyName: z.string(),
  deadline: z.coerce.date().min(dayjs().startOf("day").toDate()),
  email: z.string().email(),
  name: z.string().min(1),
  subject: z.string().min(1),
  text: z.string().min(1),
});

type FieldTypes = z.infer<typeof schema>;

export type ContactProps = {
  onSubmit: SubmitHandler<FieldTypes>;
};

export default function Contact({ onSubmit }: ContactProps): JSX.Element {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FieldTypes>({
    defaultValues: {
      budget: 0,
      companyName: "",
      deadline: dayjs().startOf("day").toDate(),
      email: "",
      name: "",
      subject: "",
      text: "",
    },
    resolver: zodResolver(schema),
  });

  return (
    <>
      <h2 className={styles.h2}>CONTACT</h2>
      <div className={styles.wrapper}>
        <motion.div
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          className={styles.contactWrapper}
          initial={{ clipPath: "inset(0% 100% 100% 0%)" }}
          transition={{
            duration: 0.75,
            ease: "circInOut",
          }}
        >
          <div className={`${styles.contactBlock} pattern-cross-dots-md`}>
            <div className={styles.contactInner}>
              <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={styles.formInner}>
                  <dl className={styles.list}>
                    <div className={styles.item}>
                      <dt>
                        <label htmlFor="companyName">貴社名</label>
                      </dt>
                      <dd>
                        <input
                          {...register("companyName")}
                          className={styles.input}
                          id="companyName"
                          placeholder="貴社名を入力"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="companyName"
                          render={({ message }): ReactNode => (
                            <p className={styles.errorMessage}>{message}</p>
                          )}
                        />
                      </dd>
                    </div>
                    <div className={styles.item}>
                      <dt>
                        <label htmlFor="name">
                          お名前<abbr>*</abbr>
                        </label>
                      </dt>
                      <dd>
                        <input
                          {...register("name")}
                          className={styles.input}
                          id="name"
                          placeholder="お名前を入力"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="name"
                          render={({ message }): ReactNode => (
                            <p className={styles.errorMessage}>{message}</p>
                          )}
                        />
                      </dd>
                    </div>
                    <div className={styles.item}>
                      <dt>
                        <label htmlFor="email">
                          メールアドレス<abbr>*</abbr>
                        </label>
                      </dt>
                      <dd>
                        <input
                          {...register("email")}
                          className={styles.input}
                          id="email"
                          placeholder="メールアドレスを入力"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="email"
                          render={({ message }): ReactNode => (
                            <p className={styles.errorMessage}>{message}</p>
                          )}
                        />
                      </dd>
                    </div>
                    <div className={styles.item}>
                      <dt>
                        <label htmlFor="subject">
                          件名<abbr>*</abbr>
                        </label>
                      </dt>
                      <dd>
                        <input
                          {...register("subject")}
                          className={styles.input}
                          id="subject"
                          placeholder="件名を入力"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="subject"
                          render={({ message }): ReactNode => (
                            <p className={styles.errorMessage}>{message}</p>
                          )}
                        />
                      </dd>
                    </div>
                    <div className={styles.item}>
                      <dt>
                        <label htmlFor="budget">
                          予算<abbr>*</abbr>
                        </label>
                      </dt>
                      <dd>
                        <div className={styles.budgetField}>
                          <input
                            {...register("budget")}
                            className={styles.input}
                            id="budget"
                            min={0}
                            placeholder="予算を入力"
                            type="number"
                          />
                          <span>円</span>
                        </div>
                        <ErrorMessage
                          errors={errors}
                          name="budget"
                          render={({ message }): ReactNode => (
                            <p className={styles.errorMessage}>{message}</p>
                          )}
                        />
                      </dd>
                    </div>
                    <div className={styles.item}>
                      <dt>
                        <label htmlFor="deadline">
                          納期<abbr>*</abbr>
                        </label>
                      </dt>
                      <dd>
                        <div className={styles.deadlineField}>
                          <Controller
                            control={control}
                            name="deadline"
                            render={({
                              field: { onBlur, onChange, ref, value },
                            }) => (
                              <input
                                className={styles.input}
                                id="deadline"
                                min={dayjs().format("YYYY-MM-DD")}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder="納期を入力"
                                ref={ref}
                                type="date"
                                value={dayjs(value).format("YYYY-MM-DD")}
                              />
                            )}
                          />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          name="deadline"
                          render={({ message }): ReactNode => (
                            <p className={styles.errorMessage}>{message}</p>
                          )}
                        />
                      </dd>
                    </div>
                    <div className={styles.item}>
                      <dt>
                        <label htmlFor="text">
                          お問い合わせ内容<abbr>*</abbr>
                        </label>
                      </dt>
                      <dd>
                        <TextareaAutosize
                          {...register("text")}
                          className={styles.textarea}
                          id="text"
                          minRows={4}
                          placeholder="お問い合わせ内容を入力"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="text"
                          render={({ message }): ReactNode => (
                            <p className={styles.errorMessage}>{message}</p>
                          )}
                        />
                      </dd>
                    </div>
                  </dl>
                  <div className={styles.formFooter}>
                    <button className={styles.button} type="submit">
                      送信する
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
