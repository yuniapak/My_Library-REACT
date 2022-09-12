import {useState, useEffect} from 'react'
import axios from 'axios'

const Recomend = ({user, API_KEY, seeBook})=>{
    const [recentBook, setRecentBook] = useState({})
    const[recBooks, setRecBooks] = useState([])
    const [loading, setLoading]= useState(true)
    let length = 0
    const getLastBooks =async()=>{
        const result = await axios.get (`http://localhost:3001/api/book/allUserBooks/${user.id}`)

        let length = result.data.length-1
        console.log(result.data[length])
        console.log(result.data[length].Book.author)
        setRecentBook(result.data[length])
        if(recentBook!={}){
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${result.data[length].Book.author}+inauthor&printType=books&key=${API_KEY}`)
        console.log(res.data)
        setRecBooks(res.data.items)
        setLoading(false)
        }
    }

    useEffect(() => {
    getLastBooks()
      }, [])

    return <div>
        <div className='recommend-tag'>
        <h3 >You may also like...</h3>
        </div>
        {loading ? (<div><h3>Loading....Please wait</h3></div>):(<div className="search-elements">
        {recBooks.map((book)=>(
            <div key ={book.volumeInfo.authors}
            className="element"
            onClick={() => seeBook(book)}>
                <h2>{book.volumeInfo.title}</h2>
                <h2>{book.volumeInfo.authors}</h2>
                {book.volumeInfo.imageLinks == undefined ? null : (
                  <img src={book.volumeInfo.imageLinks.thumbnail} />
                )}
            </div>
        ))}
        </div>
        )}
    </div>
}
export default Recomend