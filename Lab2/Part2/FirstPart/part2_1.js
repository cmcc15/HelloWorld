import fetch from 'node-fetch';

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((posts) => {
    // 1. Filter posts with more than six words in the title
    const postsWithLongTitles = posts.filter((post) => post.title.split(' ').length > 6);

    // 2. Extract the titles of filtered posts
    const longTitles = postsWithLongTitles.map((post) => post.title);

    // 3. Log the titles with more than six words
    console.log('Post titles with more than six words:');
    longTitles.forEach((title) => console.log(title));
  })
  .catch((error) => console.error(error));

  // fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(posts => {
//     // Print the fetched data to the console
//     console.log(posts);
//   })
//   .catch(error => console.error(error));

  
