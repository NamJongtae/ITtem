import dynamic from "next/dynamic";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  FieldValues,
  Control
} from "react-hook-form";
const DevTool = dynamic(
  () =>
    import("@hookform/devtools").then((module) => {
      return module.DevTool;
    }),
  { ssr: false }
);

interface GenericFormInterface<TFormData extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFormData>;
  formOptions?: UseFormProps<TFormData>;
  className?: string;
}

export default function MyForm<TFormData extends FieldValues>({
  children,
  onSubmit,
  formOptions,
  className
}: GenericFormInterface<TFormData>) {
  const methods = useForm<TFormData>(formOptions);
  return (
    <>
      <FormProvider {...methods}>
        <form
          className={className}
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
        >
          {children}
        </form>
        <DevTool control={methods.control as Control<FieldValues>} />
      </FormProvider>
    </>
  );
}
