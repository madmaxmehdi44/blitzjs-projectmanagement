import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="flex flex-col w-full border-opacity-50 items-center justify-center " dir="rtl">
      <Form
        submitText="ورود"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "متاسفانه, مشخصات کاربری شما صحیح نیست" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="پست الکترونیک" placeholder="پست الترونیک" />
        <LabeledTextField name="password" label="رمز عبور" placeholder="رمز عبور" type="password" />
        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>رمز عبور را فراموش کرده اید؟</a>
          </Link>
        </div>
      </Form>
      <div className="divider">یا</div>

      <div className="btn glass bg-success hover:bg-warning w-1/2 grid card  rounded-box place-items-center">
        <Link href={Routes.SignupPage()}>
          <a>ثبت نام کنید</a>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
