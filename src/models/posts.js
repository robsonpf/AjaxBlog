const uuid = require("uuid/v4")
const fs = require("fs")
const posts = "../../dbPost"
const path = require("path")
const postArray = JSON.parse(fs.readFileSync(path.join(__dirname, posts, "post.json"), "utf-8"))


getAllPosts = () => {
  console.log('postArray ==>', postArray);
  return postArray;
}

getPostById = (id) => {

  const post = postArray.find(post => post.id === id)

  if (!post) {
    return {
      status: 404,
      message: "Not  Found",
      errors: `Could not find id ${id}`
    }
  }
  return post
}

createPost = (body) => {
  const error = []
  const title = body.title
  const content = body.content

  if (!title) error.push("Title field is required")
  if (!content) error.push("Content field is required")
  console.log("im here");
  if (error.length > 0) {
    return {
      status: 400,
      message: "Fields are missing",
      errors: error
    }
  } else {
    const savePost = {
      id: uuid(),
      title: body.title,
      content: body.content
    }
    console.log("savepost => ", savePost);
    postArray.push(savePost)
    console.log("postArray =>", postArray);
    fs.writeFileSync(path.join(__dirname, posts, "post.json"), JSON.stringify(postArray))
    return savePost
  }
}

deletePost = (id) => {
  const post = postArray.find(post => post.id === id)

  if (!post) {
    return {
      status: 404,
      message: "Not  Found",
      errors: `Could not find id ${id}`
    }
  } else {

    const index = postArray.indexOf(post)
    console.log("index ===>", index);
    postArray.splice(index, 1)

    fs.writeFileSync(path.join(__dirname, posts, "post.json"), JSON.stringify(postArray))

    return 1;
  }
}

updatePost = (id, body) => {
  const error = []
  const title = body.title
  const content = body.content

    const post = postArray.find(post => post.id === id)

    if (!title) error.push("Title field is required")
    if (!content) error.push("Content field is required")

    if (error.length > 0) {
      return {
        status: 400,
        message: "Fields are missing",
        errors: error
      }
    } else {
      const index = postArray.indexOf(post)
      postArray[index].title = title
      postArray[index].content = content

      console.log("postArray[index].content = content ====>", postArray[index].content = content);

    fs.writeFileSync(path.join(__dirname, posts, "post.json"), JSON.stringify(postArray))

    return {
      id: "id",
      title: "title",
      content: "content"
    }
  }
}



module.exports = {
  getPostById,
  getAllPosts,
  createPost,
  deletePost,
  updatePost
}
