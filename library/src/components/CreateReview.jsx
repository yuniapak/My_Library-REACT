import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const CreateReview = ({bookId, initialState, user, getReviews, showReviewCard, setReviewCard})=>{
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
        setReviewCard(false)
        // navigate(`/search/book/${initialState.id}`,{
        //     state: { book: initialState }})
      }

    return <div>
        {/* <h2>Create Review</h2> */}
        <form onSubmit={handleSubmit}>
          <div className="review">
            <input maxLength="150"
            className='review-input'
            onChange={handleChange}
            name="comment"
            type="text"
            placeholder="review"
            value={review.comment}
            required></input>
            <select
            id="value"
            name="rating"
            onChange={handleChange}
            value={review.rating}
            className='review-select'
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
            <button type="submit" className='review-btn' onClick={showReviewCard}>Send</button>
            </div>
        </form>
    </div>
}
export default CreateReview