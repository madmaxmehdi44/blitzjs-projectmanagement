export default function ThemeCheck(props): void {
  const toggleEl = document.querySelector("[data-toggle-theme]")

  //   const theme = localStorage.getItem("theme")
  //   console.log(theme)
  //   if (theme === "light") {
  //document.documentElement.setAttribute("data-theme", "dark")
  props.ContactForm.setAttribute("data-theme", "dark")
  //   }
}
