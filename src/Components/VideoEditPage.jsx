import "../index.css";
import { useParams } from "react-router-dom";

function VideoEditPage(){
    const params = useParams();
    const id = params.id;
    return(
        <div id="videoEditPage">
            <form>
                <div>
                    <label htmlFor="">Title : </label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Description : </label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Thumbnail Url : </label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="vcategory">Category : </label>
                    <select id="vcategory" >
                        <option value="">---Choose a Category---</option>
                        <option value="Programming">Programming</option>
                        <option value="Education">Education</option>
                        <option value="Sports">Sports</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </div>
            </form>
            <button>Submit</button>
        </div>
    )
}


export default VideoEditPage;