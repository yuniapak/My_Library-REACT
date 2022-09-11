const BookSearch = ({searchQuery,setSearchQuery, findBooks, newBooks, searched})=>{

    const handleChange = (event) => {
        let input = event.target.value
        setSearchQuery(input)
      }

    return (
    <div >
    <div className="search">
    <input type='text' name='search' value ={searchQuery} placeholder = 'Book Title' onChange={handleChange} className='search-input'></input>
    <button type='submit' onClick={findBooks} className='search-btn'>Search</button>
    </div>
    </div>
    )
}
export default BookSearch