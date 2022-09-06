const BookSearch = ({searchQuery,setSearchQuery, findBooks})=>{

    const handleChange = (event) => {
        let input = event.target.value
        setSearchQuery(input)
      }

    return (
    <div>
    <input type='text' name='search' value ={searchQuery} placeholder = 'Book Title' onChange={handleChange}></input>
    <button type='submit' onClick={findBooks} className='search-btn'>Search</button>
    </div>
    )
}
export default BookSearch