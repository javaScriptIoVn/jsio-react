export type LoginFormValues = {
  username: string;
  password: string;
  remember: string;
};

export type LoginFormProps = {
  onSubmit: (values: any) => void;
}