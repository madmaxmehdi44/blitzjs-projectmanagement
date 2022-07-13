import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { any, z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import { useField, UseFieldConfig } from "react-final-form"
import React, { Suspense, useState, useRef } from "react"
// import TextAreaField from "app/core/components/TextAreaField"
// import { Editor } from "react-draft-wysiwyg"
import { dynamic } from "blitz"
// import { Editor, EditorState } from "draft-js"
import TextAreaField from "app/core/components/TextAreaField"

// const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
//   ssr: false,
// })

export function ServiceForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  // const sssas: any = null
  // const editor = useRef(sssas)

  // function focusEditor() {
  //   editor.current.focus()
  //   // alert(editorState.getCurrentContent().getPlainText())
  // }
  return (
    <>
      <Form<S> {...props}>
        <div className="hero h-screen" dir="rtl">
          <div className="hero-content flex flex-col w-full  ">
            <div className="card w-full mt-10 shadow-2xl ">
              <div className="text-center">
                <h1 className="text-3xl font-bold">مدیریت خدمات</h1>
                <p className="py-1">جهت ساخت خدمات جدید مراحل را انجام دهید</p>
              </div>
              <div className="card-body px-4 py-1 space-y-2">
                <div className="form-control">
                  <LabeledTextField name="name" label="عنوان" placeholder="عنوان" />
                </div>
                <div className="form-control">
                  <LabeledTextField name="slug" label="Slug" placeholder="Slug" />
                </div>

                <div className="form-control">
                  <LabeledTextField
                    name="short_description"
                    label="توضیحات مختصر"
                    placeholder="توضیحات مختصر"
                  />
                </div>
                <div className="form-control">
                  {/* <Suspense fallback="ویرایشگر...">
                    <div
                      style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
                      onClick={focusEditor}
                    >
                      <Editor
                        ref={editor}
                        editorState={editorState}
                        onChange={setEditorState}
                        placeholder="Write something!a"
                      />
                    </div>
                  </Suspense> */}

                  <TextAreaField
                    name="long_description"
                    label="توضیحات بیشتر"
                    placeholder="توضیحات بیشتر"
                  />
                </div>
                <div className="form-control">
                  <LabeledTextField
                    name="image_url"
                    label="تصویر"
                    placeholder="ImageUrl"
                    type="text"
                    alt="ImageUrl"
                  />
                </div>
                <div className="form-control">
                  <LabeledTextField
                    name="video_url"
                    label="ویدئو"
                    placeholder="VideoUrl"
                    type="text"
                    alt="VideoUrl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}
