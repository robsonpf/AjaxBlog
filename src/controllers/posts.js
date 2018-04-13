const model = require("../models/posts")

getAllPosts = (req, res, next) => {
  const result = model.getAllPosts()

  if (result.error) {
    return next ({
      status: result.status,
      message: result.message,
      errors: result.errors
    })
  } else {
    res.status(200).json({ result })
  }
}

getPostById = (req, res, next) => {
  const result = model.getPostById(req.params.id)

  if (result.error) {
    return next ({
      status: result.status,
      message: result.message,
      errors: result.errors
    })
  } else {
    res.status(200).json({ result })
  }
}

createPost = (req, res, next) => {
  const result = model.createPost(req.body)

  if (result.error) {
    return next ({
      status: result.status,
      message: result.message,
      errors: result.errors
    })
  } else {
    res.status(201).json({ result })
  }
}

deletePost = (req, res, next) => {
  const result = model.deletePost(req.params.id)

  if (result.errors) {
    return next ({
      status: result.status,
      message: result.message,
      errors: result.errors
    })
  } else {
    res.status(204).json({ result })
  }
}

updatePost = (req, res, next) => {
  const result = model.updatePost(req.params.id, req.body)

  if (result.error) {
    return next ({
      status: result.status,
      message: result.message,
      errors: result.errors
    })
  } else {
    res.status(200).json({ result })
  }
}



module.exports = {
  getPostById,
  getAllPosts,
  createPost,
  deletePost,
  updatePost
}
