## 优点：
- 漂亮的check效果，让人印象深刻
- 尝试使用如context等特性来简化状态管理
- useCallback与useMemo的使用说明重视性能
- 测试较全面，重点需求都照顾到了

## 可以改进的地方：
- 一个重要需求未正确实现：多列时，每一列顺序应该从上到下，而不是每一行从左右到
- MultiCheck传入的label未使用
- 组件属性比如selectAllCheckboxProps放在外面定义成变量，而不是写成组件形式，可读性不佳
- context在这个组件中使用有点重，且其中onChange的语义不明确
- useCallback与useMemo的使用不完全正确，依赖项有缺失
- 很多let可以使用const，更安全
- Checkbox中handleChange中的逻辑复杂难以理解
- 测试写法有问题，大量写了setTimeout的测试永远不会失败



TypeScript React Multi-Check Testing Program
============================================

## Notice:

This is a simplified component from real project.
When you do it, consider it as a real task, and show your best programming practices.
Your code will be reviewed and scored by the other developers of the team you will join.

Your code will have higher score if:

1. You split the task into smaller tasks, complete them one by one, and commit them in different git commits with proper commit messages 
1. The code is clean and easy to read and understand
2. The variable and function names are considered carefully
3. Small and meaningful functions for complex logic
4. No typo and has good code format
5. Meaningful, carefully organized test cases covered most of the important functionality
6. Provide proper/valuable comments, but only when it's necessary (in code and/or in github PR). Try improving the code to avoid un-necessary comments. 

## Task

Implement a react function component with typescript.

1. typescript + react
2. unit tests: use `jest`
3. provide proper comments in code (and only when it's necessary) 
4. show your best practise
5. use github pull request to submit your code

Find `TODO` in code to implement, you can also change any code in codebase to make it better.

## Component Requirement:


1. The component has a label
2. The special `Select All` option
   1. if checked, all other options are checked
   2. if unchecked, all other options are unchecked
   3. if all other options are checked, it should be checked
   4. if any other option are unchecked, it should be unchecked
3. The options support multiple-columns, and the direction is from top to bottom

### Performance requirement

You can add proper react hooks in the component to avoid unnecessary executions or renders.

## Dev

```
npm install
npm run dev
```

## Test

```
npm test
```

Notice:
1. Please use html native checkbox (`<input type="checkbox" />`) as the base,
   the style doesn't need to be exactly the same
2. No need to test `App.tsx`, only test MultiCheck and related components and code
4. Please follow the best Typescript style and best practices
