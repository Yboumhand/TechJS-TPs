const posts = [
  {
    id: 1,
    title: "Post One",
  },
  {
    id: 2,
    title: "Post Two",
  },
];

const getPosts = () => {
  posts.forEach((post) => {
    console.log(post);
  });
};

export const getPostsLength = () => {
  console.log(`Total number of posts: ${posts.length}`);
};

export default getPosts;
