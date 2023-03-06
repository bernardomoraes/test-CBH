# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here


Basically I just used a strategy called early return, which is a common pattern in functional programming. It's a way to reduce the amount of nesting in your code, and it's also a way to make your code more readable. It's also a way to make your code more testable.

I also adjusted the name of the main variable `candidate` to be more clear on what it is `candidatePK`, I could have also used `candidatePartitionKey` but I thought that shortened is better and create an auxiliary function to make the code more reusable following the DRY principle.

At the tests, I try to follow the initial code that I received guideline, to do that I first create the tests than start to refactor the code, in that way I garantee that the code functions as it was before.