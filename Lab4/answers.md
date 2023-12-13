Q1
In React, props and state are two fundamental concepts used to manage and pass data in a React application

example props:
//Parent
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const message = 'Hello from ParentComponent';

  return (
    <div>
      <ChildComponent message={message} />
    </div>
  );
};

// Child
import React from 'react';

const ChildComponent = (props) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
};

export default ChildComponent;

example state:
// Counter
import React, { useState } from 'react';

const CounterComponent = () => {
  // useState is a hook that initializes state
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default CounterComponent;


Q2
In functional programming, a functor is an object or data structure that implements a map function.

example:
// Functor: Array
const nums = [1, 2, 3, 4, 5];

// Mapping function
const map = (x) => x * x;

const combine = nums.map(map);

console.log(combine); 
/////////////////////////////////////////
// Output: [1, 4, 9, 16, 25]

Q3
Callbacks advantage: they are simple and widely supported
Callbacks disadvantage : can lead to it becoming harder to read or maintain

Promises advantage: Promises leade to cleaner and more readable asynchronous code through chaining
Promises disadvntage: No Cancellation

Streams advantage: Efficient for Large Datasets
Streams disadvantage: Can be very complex

Q4
The CSS Box Model is a fundamental concept that describes how elements are rendered on a web page.

example:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Box Model</title>
  
  <style>
    .container {
      width: 300px;
      border: 1px solid #333;
      margin-bottom: 20px;
    }
	
    .content {
      padding: 20px; 
      border: 1px solid #666;
    }
  </style>
</head>
<body>
  <!-- First container -->
  <div class="container">
    <div class="content">
      <p>This is the first container.</p>
    </div>
  </div>

  <!-- Second container -->
  <div class="container">
    <div class="content">
      <p>This is the second container.</p>
    </div>
  </div>
</body>
</html>

Q5

Loading and bootstrapping a rich web application involves several steps, and the process may vary depending on the architecture of the
application and the technologies used. 
The steps would be as follows below:
- URL Entry and DNS Resolution
- HTTP Request
- Server Processing and Response
- HTML Parsing and Rendering
- JavaScript Execution
- DOMContentLoaded Event
- Asynchronous Resource Loading
- JavaScript Framework/Library Initialization
- Application-specific Data Fetching
- Complete Rendering
