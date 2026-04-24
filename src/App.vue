<template>
  <div class="calculator-wrapper">
    <h1 class="title">米佳玉的計算雞</h1>
    
    <div class="calculator">
      <!-- 顯示螢幕 -->
      <div class="calculator-display">{{ currentInput }}</div>
      
      <!-- 按鈕區 -->
      <div class="calculator-buttons">
        <button class="misc" @click="handleMisc('AC')">AC</button>
        <button class="misc" @click="handleMisc('+/-')">+/-</button>
        <button class="misc" @click="handleMisc('%')">%</button>
        <button class="operator" @click="handleOperator('÷')">÷</button>

        <button @click="handleNumber('7')">7</button>
        <button @click="handleNumber('8')">8</button>
        <button @click="handleNumber('9')">9</button>
        <button class="operator" @click="handleOperator('×')">×</button>

        <button @click="handleNumber('4')">4</button>
        <button @click="handleNumber('5')">5</button>
        <button @click="handleNumber('6')">6</button>
        <button class="operator" @click="handleOperator('-')">-</button>

        <button @click="handleNumber('1')">1</button>
        <button @click="handleNumber('2')">2</button>
        <button @click="handleNumber('3')">3</button>
        <button class="operator" @click="handleOperator('+')">+</button>

        <button class="span-two" @click="handleNumber('0')">0</button>
        <button @click="handleNumber('.')">.</button>
        <button class="operator" @click="handleOperator('=')">=</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 狀態變數
const currentInput = ref('0');
const previousInput = ref('');
const operator = ref(null);
const waitingForNewValue = ref(false);

// 基本運算邏輯
const calculate = (a, b, op) => {
  if (isNaN(a) || isNaN(b)) return 0;
  let result;
  switch (op) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '×': result = a * b; break;
    case '÷': return b === 0 ? 'Error' : a / b;
    default: return b;
  }
  return Math.round(result * 1000000000) / 1000000000;
};

// 處理特殊按鈕 (AC, +/-, %)
const handleMisc = (val) => {
  if (val === 'AC') {
    currentInput.value = '0';
    previousInput.value = '';
    operator.value = null;
    waitingForNewValue.value = false;
  } else if (val === '+/-') {
    if (currentInput.value !== 'Error') {
      currentInput.value = String(parseFloat(currentInput.value) * -1);
    }
  } else if (val === '%') {
    if (currentInput.value !== 'Error') {
      currentInput.value = String(parseFloat(currentInput.value) / 100);
    }
  }
};

// 處理運算子 (+, -, ×, ÷, =)
const handleOperator = (val) => {
  if (val === '=') {
    if (operator.value && previousInput.value !== '') {
      currentInput.value = String(calculate(parseFloat(previousInput.value), parseFloat(currentInput.value), operator.value));
      operator.value = null;
      previousInput.value = '';
      waitingForNewValue.value = true;
    }
  } else {
    if (operator.value && !waitingForNewValue.value) {
      currentInput.value = String(calculate(parseFloat(previousInput.value), parseFloat(currentInput.value), operator.value));
    }
    operator.value = val;
    previousInput.value = currentInput.value;
    waitingForNewValue.value = true;
  }
};

// 處理數字與小數點輸入
const handleNumber = (val) => {
  if (waitingForNewValue.value || currentInput.value === 'Error') {
    currentInput.value = val === '.' ? '0.' : val;
    waitingForNewValue.value = false;
  } else {
    if (val === '.') {
      if (!currentInput.value.includes('.')) {
        currentInput.value += '.';
      }
    } else {
      currentInput.value = currentInput.value === '0' ? val : currentInput.value + val;
    }
  }
};
</script>

<style>
/* 確保整個畫面背景乾淨 */
body {
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
}

/* 計算機外部的排版 */
.calculator-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: "Microsoft JhengHei", sans-serif;
}

.title {
  color: #333333;
  margin-bottom: 20px;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.calculator {
  width: 320px;
  background-color: #3a4655;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.calculator-display {
  background-color: #222;
  color: #fff;
  font-size: 2.5rem;
  text-align: right;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  word-wrap: break-word;
  word-break: break-all;
}

.calculator-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

button {
  padding: 20px;
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #505050;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #6c6c6c;
}

.operator {
  background-color: #ff9500;
}

.operator:hover {
  background-color: #ffb74d;
}

.misc {
  background-color: #d4d4d2;
  color: #1c1c1c;
}

.misc:hover {
  background-color: #e8e8e6;
}

.span-two {
  grid-column: span 2;
}
</style>
