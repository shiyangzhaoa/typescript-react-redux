## 基于<code>create-react-app</code> + <code>Typescript</code>的项目结构
目前主要用于<code>redux-saga</code>的练习~，版本<code>1.0.0-beta.0</code>

### 新版本redux-saga改变的地方

1. 删除了<code>isCancelError</code>

```js
// 代替的
import { cancelled } from 'redux-saga/effects';
// 在请求finally后判断是否干掉了task，然后手动处理
try {
  // ...
} catch(error) {
  // ...
} finally {
  if (yield cancelled()) {
    // ... put special cancellation handling code here
  }
}
```