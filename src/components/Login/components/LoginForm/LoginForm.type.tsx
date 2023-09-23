export type LoginFormValues = {
  username: string;
  password: string;
  remember: boolean;
};

export type LoginFormProps = {
  onSubmit: (values: any) => void;
  initialValues?: Partial<LoginFormValues>;
}