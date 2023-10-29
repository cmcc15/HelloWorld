// import fetch from 'node-fetch';

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(posts => {
//     const wordFrequencyMap = posts
//       .map(post => post.body)
//       .join(' ')
//       .toLowerCase()
//       .split(/\W+/)
//       .filter(word => word.length > 0)
//       .reduce((freqMap, word) => {
//         freqMap[word] = (freqMap[word] || 0) + 1;
//         return freqMap;
//       }, {});

//     console.log(wordFrequencyMap);
//   })
//   .catch(error => console.error(error));

import fetch from 'node-fetch';

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    const wordFrequencyMap = posts
      .map(post => post.body)
      .join(' ')
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 0)
      .reduce((freqMap, word) => {
        freqMap[word] = (freqMap[word] || 0) + 1;
        return freqMap;
      }, {});

    console.log(wordFrequencyMap);
  })
  .catch(error => console.error(error));
