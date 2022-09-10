import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const CreateReview = ({currentUser, bookId, initialState, user, getReviews})=>{
    let navigate = useNavigate()
    const [review, setReview] = useState({
        userId: user.id,
        bookId: bookId,
        comment: '',
        rating: ''
      })
      console.log(bookId)
      const addReview = async(newReview)=>{
      const result = await axios.post(`http://localhost:3001/api/review/${bookId}/${user.id}`, newReview)
      console.log(newReview)
    }

      const handleChange = (event) => {
        setReview({ ...review, [event.target.name]: event.target.value })
        console.log(review)
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        await addReview(review)
        console.log(review)
        setReview({
          comment: '',
          rating: ''
        })
        console.log('Review created')
        getReviews(initialState.title)
        // navigate(`/search/book/${initialState.id}`,{
        //     state: { book: initialState }})
      }

    return <div>
        <h2>Create Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="create-review-form">
            <textarea maxLength="150"
            onChange={handleChange}
            name="comment"
            type="text"
            placeholder="review"
            value={review.comment}
            required></textarea>
            <select
            id="value"
            name="rating"
            onChange={handleChange}
            value={review.rating}
          >
            <option value="" disabled>
              Rating
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          </div>
          <div className="review-btn">
            <button type="submit">Send</button>
            </div>
        </form>
    </div>
}
export default CreateReview