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
    {/* <div>
        {searched ? (
          <div>
            {newBooks.map((book) => (
              <div key={book.volumeInfo.authors}>
                <h2>{book.volumeInfo.title}</h2>
                <h2>{book.volumeInfo.authors}</h2>
                <img src={book.volumeInfo.imageLinks.thumbnail} />
                <p>{book.volumeInfo.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div> */}
    </div>
    )
}
export default BookSearch