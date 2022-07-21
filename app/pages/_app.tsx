import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import React, { Suspense } from "react"
import "app/core/styles/index.css"
import ScaleLoader from "react-spinners/ScaleLoader"
import LoginForm from "app/auth/components/LoginForm"

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Suspense fallback={<div className="text-violet-700 items-center absolute top-1/2 left-1/2 justify-center  inset-0"><ScaleLoader /></div>}>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().clearReset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </Suspense>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="با عرض سلام. جهت ادامه از طریق ثبت نام آسان اقدام نمایید"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
