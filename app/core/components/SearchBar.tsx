export default function SearchBar(props: { setSearchTerm: any; searchTerm: any }): JSX.Element {
  const { setSearchTerm, searchTerm } = props
  return (
    <>
      <input
        type={"text"}
        placeholder="جستوجو..."
        className="input input-bordered w-full max-w-xs"
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
        value={searchTerm}
      />
    </>
  )
}
