import { Container } from "@chakra-ui/react";
import PostThumb from "../components/blog/postThumb";
import Layout from "../components/generic/layout";

const posts = [
  {
    title: "The first blog post",
    author: "KhanShaheb",
    date: "12 December, 2020",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem!",
    image: "https://picsum.photos/1000",
  },
  {
    title: "The second post without image",
    author: "Shakirul Hasan",
    date: "13 December, 2020",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem!",
  },
  {
    title: "The Third blog post",
    author: "Shakirul Hasan Khan",
    date: "14 December, 2020",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem!",
    image: "https://picsum.photos/900",
  },
];

const Blog = ({ userId }) => {
  return (
    <Layout>
      <Container p={3} maxW="4xl" centerContent minH="70vh">
        {posts.map((post) => (
          <PostThumb {...post} key={post.title} />
        ))}
      </Container>
    </Layout>
  );
};

export default Blog;
