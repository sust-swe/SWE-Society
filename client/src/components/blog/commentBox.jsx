import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

const CommentBox = ({ postId, comments, setComments }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { unauthorizedHandler } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/api/comments/", {
        content: comment,
        blog_id: postId,
      })
      .then((res) => {
        setComments([...comments, res.data]);
        setComment("");
        setLoading(false);
      })
      .catch(unauthorizedHandler);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex mt={2}>
        <Input
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          m={1}
        />
        <Button type="submit" disabled={loading} colorScheme="green" m={1}>
          {loading && <Spinner mr={2} />} Comment
        </Button>
      </Flex>
    </form>
  );
};

export default CommentBox;
