<template>
  <div class="calculator">

    <!-- 顯示幕 -->
    <div class="display">
      <p class="expression">{{ expression || '0' }}</p>
      <p class="result">= {{ result }}</p>
    </div>

    <!-- 按鍵區 -->
    <div class="keypad">
      <!-- 第一行 -->
      <button @click="clear"               class="btn gray wide">AC</button>
      <button @click="pressButton('%')"    class="btn gray">%</button>
      <button @click="pressButton('÷')"   class="btn orange">÷</button>

      <!-- 第二行 -->
      <button @click="pressButton('7')"   class="btn">7</button>
      <button @click="pressButton('8')"   class="btn">8</button>
      <button @click="pressButton('9')"   class="btn">9</button>
      <button @click="pressButton('×')"  class="btn orange">×</button>

      <!-- 第三行 -->
      <button @click="pressButton('4')"   class="btn">4</button>
      <button @click="pressButton('5')"   class="btn">5</button>
      <button @click="pressButton('6')"   class="btn">6</button>
      <button @click="pressButton('-')"   class="btn orange">－</button>

      <!-- 第四行 -->
      <button @click="pressButton('1')"   class="btn">1</button>
      <button @click="pressButton('2')"   class="btn">2</button>
      <button @click="pressButton('3')"   class="btn">3</button>
      <button @click="pressButton('+')"   class="btn orange">＋</button>

      <!-- 第五行 -->
      <button @click="pressButton('0')"   class="btn wide-left">0</button>
      <button @click="pressButton('.')"   class="btn">.</button>
      <button @click="calculate"           class="btn orange">=</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const expression = ref('')

const result = computed(() => {
  if (!expression.value) return '0'
  try {
    const jsExpr = expression.value
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
    const value = Function('"use strict"; return (' + jsExpr + ')')()
    return Math.round(value * 1e10) / 1e10
  } catch {
    return '...'
  }
})

function pressButton(value) {
  expression.value = expression.value + value
}

function clear() {
  expression.value = ''
}

function calculate() {
  if (result.value !== '...') {
    expression.value = String(result.value)
  }
}
</script>

<style>
/* 全域：讓頁面背景也是深色 */
body {
  background: #000;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>

<style scoped>
/* 計算機外殼 */
.calculator {
  width: 320px;
  background: #1c1c1e;
  border-radius: 40px;
  padding: 24px 20px 32px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
}

/* 顯示幕 */
.display {
  padding: 12px 8px 20px;
  text-align: right;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.expression {
  color: white;
  font-size: 48px;
  font-weight: 200;
  margin: 0;
  line-height: 1.1;
  word-break: break-all;
}
.result {
  color: #636366;
  font-size: 22px;
  margin: 6px 0 0;
}

/* 按鍵區 */
.keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

/* 基本按鍵 */
.btn {
  height: 72px;
  border: none;
  border-radius: 50%;
  font-size: 28px;
  font-weight: 300;
  color: white;
  background: #3a3a3c;
  cursor: pointer;
  transition: opacity 0.1s;
}
.btn:active { opacity: 0.6; }

/* 橘色運算子 */
.btn.orange { background: #ff9500; }

/* 灰色（AC、%） */
.btn.gray { background: #636366; }

/* 寬版按鍵：AC 和 0 */
.btn.wide {
  grid-column: span 2;
  border-radius: 36px;
  text-align: left;
  padding-left: 28px;
}
.btn.wide-left {
  grid-column: span 2;
  border-radius: 36px;
  text-align: left;
  padding-left: 28px;
}
</style>
