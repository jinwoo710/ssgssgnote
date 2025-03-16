import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'

interface FormInputProps<T extends FieldValues> {
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  name: Path<T>
  label: string
  placeholder?: string
  registerOptions?: RegisterOptions<T, Path<T>>
  type?: string
}

export default function FormInput<T extends FieldValues>({
  register,
  errors,
  name,
  label,
  placeholder,
  registerOptions,
  type
}: FormInputProps<T>) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-10 shrink-0">{label}</span>
      <div className="flex flex-col w-full space-y-2">
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, registerOptions)}
          className="rounded-md border flex-1 px-2"
        />
        {errors[name] && (
          <span className="text-red-500">{errors[name].message as string}</span>
        )}
      </div>
    </div>
  )
}
