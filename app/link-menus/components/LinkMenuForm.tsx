import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function LinkMenuForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="description" label="Description" placeholder="Description" />
      <LabeledTextField name="urlLink" label="Link" placeholder="Link" />
      {/* <LabeledTextField name="active" label="Active" placeholder="Active" /> */}
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Active</span>
          <input
            name="active"
            placeholder="Active"
            type="checkbox"
            className="toggle toggle-primary"
            checked
          />
        </label>
      </div>
    </Form>
  )
}
