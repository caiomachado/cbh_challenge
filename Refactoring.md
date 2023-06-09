# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The first thing I refactored was the name of the variables, I changed it to camel case so that it keeps the pattern from the function name, also I removed the word Partition from either of the names because the same word is being used to define the function, leaving no reason to keep it in both variables' names. The second thing was to remove the candidate variable, since that variable is only being used to reassign values and return it in the end, I found it unnecessary to create it when I can just return the desired value directly.
The function itself checks if the event exists, if it doesn't, it will return the trivial value of "0". Now if the event exists, it checks if the partitionKey exists in this event, if it doesn't, then it stringifies the event and returns a new hash. If it exists, it returns the partitionKey as long as its length isn't higher than 256 which is the maximum key length, if it is higher, it will generate another hash and return it. Last but not least, I removed the checking of the partitionKey to see if it is a string, a hash is always a string so there is no reason to check that when the partitionKey already exists in the event.
