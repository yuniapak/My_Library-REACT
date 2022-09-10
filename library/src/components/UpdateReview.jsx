import {useState} from 'react'
import axios from 'axios'
const UpdateReview = ({review, bookId, edit})=>{
    const [updatedReview, setUpdatedReview] = useState({
        userId: review.User.id,
        bookId: review.Book.id,
        comment: review.comment,
        rating: review.rating
    })
    const editReview = async(newReview)=>{
    const result = await axios.put(`http://localhost:3001/api/review/${review.id}`, newReview)
}

const handleChange = (event)=>{
    setUpdatedReview({ ...updatedReview, [event.target.name]: event.target.value })
        console.log(updatedReview)
}
const handleSubmit =async(e)=>{
    e.preventDefault()
    await editReview(updatedReview)
    console.log(updatedReview)
    edit()
    console.log('review been updated')
}

    return <div>
        <h2>Update review form</h2>
        <div>
            <div className="book-card-user">
            <img src={review.User.image} />
            <h3>{review.User.username}</h3>
            </div>
            <form onSubmit={handleSubmit}>
            <input className="book-card-h2"
            name="comment"
            type="text"
            placeholder={review.comment}
            defaultValue={review.comment} 
            contentEditable="true"
            onChange={handleChange}
            required></input>
            <select 
            id="value"
            name="rating"
            defaultValue={review.rating}
            contentEditable="true"
            onChange={handleChange}
            required
            >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
            <button type="submit">Update</button>
            </form>
        </div>
    </div>
 }
export default UpdateReview