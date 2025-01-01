---
title: 使用HTML和JS实现一个计数器
createTime: 2024/12/14 13:09:23
permalink: /notes/web/dzdrqc6v/
---
代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>计数器</title>
    <style>
      div {
        display: flex;
        align-items: center;
      }

      button {
        padding: 5px 10px;
        font-size: 16px;
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        margin: 0 5px;
      }

      button:hover {
        background-color: #0056b3;
      }

      input {
        width: 80px;
        padding: 5px;
        font-size: 16px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div>
      <button id="decrement">-</button>
      <input type="number" id="counterInput" value="0" />
      <button id="increment">+</button>
    </div>

    <script>
      let decrementBtn = document.getElementById("decrement");
      let incrementBtn = document.getElementById("increment");
      let counterInput = document.getElementById("counterInput");

      // 禁用按钮
      function updateButtonState() {
        let currentValue = parseInt(counterInput.value);
        decrementBtn.disabled = currentValue <= 0;
        incrementBtn.disabled = currentValue >= 100;
      }

      // 增加按钮点击事件
      decrementBtn.onclick = function () {
        let currentValue = parseInt(counterInput.value);
        if (currentValue > 0) {
          counterInput.value = currentValue - 1;
          updateButtonState();
        }
      };

      // 减少按钮点击事件
      incrementBtn.onclick = function () {
        let currentValue = parseInt(counterInput.value);
        if (currentValue < 100) {
          counterInput.value = currentValue + 1;
          updateButtonState();
        }
      };

      // 输入框改变事件
      counterInput.onchange = function () {
        let currentValue = parseInt(counterInput.value);
        if (currentValue < 0) {
          counterInput.value = 0;
        } else if (currentValue > 100) {
          counterInput.value = 100;
          updateButtonState();
        }
      };
    </script>
  </body>
</html>
```

效果：

![](_/20241214131152.png)
