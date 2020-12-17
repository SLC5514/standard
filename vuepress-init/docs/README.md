---
home: true
heroImage: /logo.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---

# Markdown 拓展

## 内部链接

[Home](/) <!-- 跳转到根部的 README.md -->
| [foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->
| [foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
| [bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐） -->
| [bar - four](../bar/four.html) <!-- 也可以用 .html -->

## GitHub 风格的表格

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## Emoji

:tada: :100:

## 目录

[[toc]]

## 自定义容器

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

你也可以自定义块中的标题：

::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码

```js
console.log('你好，VuePress！')
```

:::

## 代码块中的语法高亮

``` js
export default {
  name: 'MyComponent',
  // ...
}
```

``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

## 代码块中的行高亮

``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除了单行以外，你也可指定多行，行数区间，或是两者都指定。

- 行数区间: 例如 {5-8}, {3-10}, {10-17}
- 多个单行: 例如 {4,7,9}
- 行数区间与多个单行: 例如 {4,7-13,16,23-27,40}

``` js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

## 导入代码段

<<< @/docs/test.js#snippet{1}
