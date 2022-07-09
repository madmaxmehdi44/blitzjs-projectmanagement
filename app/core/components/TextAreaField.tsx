import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef, useState } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface TextAreaFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number" | "file"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? (Number as any) : (v) => (v === "" ? null : v),

      ...fieldProps,
    })
    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    return (
      <div {...outerProps} className="flex flex-col">
        <label {...labelProps}>{label}</label>
        <textarea
          className="textarea textarea-bordered textarea-success w-full max-w-full text-right"
          {...input}
          disabled={submitting}
          {...props}
          ref={ref}
        ></textarea>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default TextAreaField
