import React from "react";

function TypeQuestion() {
  return (
    <form>
      {/* Type Section 𐂂 */}
      <h1>What type of content would you like to publish?</h1> <br />
      {/* Radio Options 𐂂 */}
      <input type="radio" id="Audio" name="contentType" value="Audio" />
      <label for="Audio">Audio</label>
      <input type="radio" id="Article" name="contentType" value="Article" />
      <label for="Article">Article</label>
      <input type="radio" id="Video" name="contentType" value="Video" />
      <label for="Video">Video</label>
      <input type="radio" id="jpg" name="contentType" value="jpg" />
      <label for="jpg">jpg</label> <br />
      {/* Submit Button 𐂂 */}
      <input type="submit" />
    </form>
  );
}

export default TypeQuestion;
