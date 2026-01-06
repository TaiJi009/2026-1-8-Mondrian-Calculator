<template>
  <div class="calculator-container">
    <div class="canvas">
      <div class="top-strip">
        <div class="top-left"></div>
        <div class="top-center"></div>
        <div class="top-dot"></div>
      </div>

      <div class="middle">
        <div class="side-panel">
          <div class="side-top"></div>
          <div class="side-bottom"></div>
        </div>

        <div class="main-panel">
          <div class="display-wrapper">
            <div class="display-left-bar"></div>
            <div class="display">
              <div class="display-expression">{{ expression }}</div>
              <div class="display-value">{{ current }}</div>
            </div>
            <div class="display-footer-bar"></div>
          </div>

          <div class="buttons-wrapper">
            <!-- 科学函数行 -->
            <div class="func-row">
              <button
                v-for="func in funcButtons"
                :key="func.label"
                :class="['btn-func', func.class]"
                @click="handleFunc(func.action)"
              >
                {{ func.label }}
              </button>
            </div>

            <!-- 主键区 -->
            <div class="main-keys">
              <!-- 第1行 -->
              <button class="btn-ac" @click="clearAll">AC</button>
              <button class="btn-del" @click="delOne">DEL</button>
              <button class="btn-op-strong" @click="handleOp('^')">x^y</button>
              <button class="btn-op" @click="handleFunc('sqrt')">√</button>

              <!-- 第2行 -->
              <button @click="handleNumber('7')">7</button>
              <button @click="handleNumber('8')">8</button>
              <button @click="handleNumber('9')">9</button>
              <button class="btn-op" @click="handleOp('÷')">÷</button>

              <!-- 第3行 -->
              <button @click="handleNumber('4')">4</button>
              <button @click="handleNumber('5')">5</button>
              <button @click="handleNumber('6')">6</button>
              <button class="btn-op" @click="handleOp('×')">×</button>

              <!-- 第4行 -->
              <button @click="handleNumber('1')">1</button>
              <button @click="handleNumber('2')">2</button>
              <button @click="handleNumber('3')">3</button>
              <button class="btn-op" @click="handleOp('-')">－</button>

              <!-- 第5行 -->
              <button class="btn-zero" @click="handleNumber('0')">0</button>
              <button @click="handleNumber('.')">.</button>
              <button class="btn-op" @click="handleOp('+')">＋</button>

              <!-- 第6行：括号、e、= -->
              <button class="btn-op" @click="handleParenthesis('(')">(</button>
              <button class="btn-op" @click="handleParenthesis(')')">)</button>
              <button class="btn-const" @click="handleConst('e')">e</button>
              <button class="btn-eq" @click="equal">＝</button>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-strip">
        <div class="bottom-left"></div>
        <div class="bottom-right"></div>
      </div>
    </div>

    <!-- 键盘操作指引 -->
    <div class="keyboard-hint-wrapper">
      <div class="hint-toggle">?</div>
      <div class="keyboard-hint">
        <div class="hint-title">键盘操作指引</div>
        <div class="hint-content">
          <div><strong>数字：</strong> 0–9</div>
          <div><strong>小数点：</strong> .</div>
          <div><strong>加：</strong> +</div>
          <div><strong>减：</strong> -</div>
          <div><strong>乘：</strong> *</div>
          <div><strong>除：</strong> /</div>
          <div><strong>左括号：</strong> (</div>
          <div><strong>右括号：</strong> )</div>
          <div><strong>常数 e：</strong> e 或 E</div>
          <div><strong>常数 π：</strong> p 或 P</div>
          <div><strong>删除一位：</strong> Backspace</div>
          <div><strong>清空：</strong> Delete</div>
          <div><strong>等号：</strong> Enter 或 =</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import './Calculator.css'

const expression = ref('')
const current = ref('0')
const justEvaluated = ref(false)

const funcButtons = [
  { label: 'sin', action: 'sin', class: '' },
  { label: 'cos', action: 'cos', class: '' },
  { label: 'tan', action: 'tan', class: '' },
  { label: 'ln', action: 'ln', class: '' },
  { label: 'log', action: 'log', class: '' },
  { label: 'π', action: 'π', class: 'btn-const' }
]

function inputNumber(num) {
  const last = expression.value.slice(-1)
  const afterOp = '＋-－×÷^('.includes(last) || expression.value === ''

  if (justEvaluated.value && !afterOp) {
    current.value = '0'
    expression.value = ''
    justEvaluated.value = false
  }

  const startNewNumber = afterOp || current.value === '0' || current.value === '错误'

  if (startNewNumber) {
    if (num === '.') {
      current.value = '0.'
    } else {
      current.value = num
    }
  } else {
    if (num === '.') {
      if (!current.value.includes('.')) current.value += '.'
    } else {
      current.value += num
    }
  }

  expression.value += num
}

function handleNumber(num) {
  inputNumber(num)
}

function inputOperator(op) {
  if (expression.value === '' && (op === '+' || op === '－' || op === '-')) {
    expression.value = op === '－' ? '-' : op
    current.value = ''
  } else {
    const last = expression.value.slice(-1)
    if ('＋-－×÷^'.includes(last)) {
      expression.value = expression.value.slice(0, -1) + op
    } else {
      expression.value += op
    }
  }
  justEvaluated.value = false
}

function handleOp(op) {
  const opMap = {
    '+': '＋',
    '-': '－',
    '×': '×',
    '÷': '÷',
    '^': '^'
  }
  inputOperator(opMap[op] || op)
}

function handleParenthesis(p) {
  if (justEvaluated.value) {
    expression.value = ''
    current.value = '0'
    justEvaluated.value = false
  }
  expression.value += p
}

function handleConst(c) {
  if (justEvaluated.value) {
    expression.value = ''
    current.value = '0'
    justEvaluated.value = false
  }
  expression.value += c
  current.value = c
}

function handleFunc(func) {
  if (func === 'sqrt') {
    expression.value += '√('
  } else if (func === 'π') {
    handleConst('π')
    return
  } else {
    expression.value += func + '('
  }
  current.value = ''
  justEvaluated.value = false
}

function clearAll() {
  expression.value = ''
  current.value = '0'
  justEvaluated.value = false
}

function delOne() {
  if (expression.value === '') return
  expression.value = expression.value.slice(0, -1)
  if (current.value.length > 1) {
    current.value = current.value.slice(0, -1)
  } else {
    current.value = '0'
  }
}

function sin_deg(x) {
  return Math.sin(x * Math.PI / 180)
}

function cos_deg(x) {
  return Math.cos(x * Math.PI / 180)
}

function tan_deg(x) {
  return Math.tan(x * Math.PI / 180)
}

function log10(x) {
  return Math.log10 ? Math.log10(x) : Math.log(x) / Math.LN10
}

function sqrt(x) {
  return Math.sqrt(x)
}

function buildJsExpression(displayExpr) {
  let js = displayExpr
  js = js.replace(/π/g, 'Math.PI')
  js = js.replace(/\be\b/g, 'Math.E')
  js = js.replace(/sin\(/g, 'sin_deg(')
  js = js.replace(/cos\(/g, 'cos_deg(')
  js = js.replace(/tan\(/g, 'tan_deg(')
  js = js.replace(/ln\(/g, 'Math.log(')
  js = js.replace(/log\(/g, 'log10(')
  js = js.replace(/√\(/g, 'sqrt(')
  js = js.replace(/＋/g, '+')
  js = js.replace(/－/g, '-')
  js = js.replace(/×/g, '*')
  js = js.replace(/÷/g, '/')
  js = js.replace(/\^/g, '**')
  return js
}

function equal() {
  if (!expression.value) return
  const jsExpr = buildJsExpression(expression.value)
  try {
    const result = Function('"use strict"; return (' + jsExpr + ')')()
    current.value = String(result)
    expression.value = current.value
    justEvaluated.value = true
  } catch (e) {
    current.value = '错误'
  }
}

function handleKeydown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return

  const key = e.key

  if (key >= '0' && key <= '9') {
    inputNumber(key)
    return
  }
  if (key === '.') {
    inputNumber('.')
    return
  }

  if (key === '+') {
    handleOp('+')
    e.preventDefault()
    return
  }
  if (key === '-') {
    handleOp('-')
    e.preventDefault()
    return
  }
  if (key === '*') {
    handleOp('×')
    e.preventDefault()
    return
  }
  if (key === '/') {
    handleOp('÷')
    e.preventDefault()
    return
  }

  if (key === '(' || key === ')') {
    handleParenthesis(key)
    e.preventDefault()
    return
  }

  if (key === 'e' || key === 'E') {
    handleConst('e')
    e.preventDefault()
    return
  }
  if (key === 'p' || key === 'P') {
    handleConst('π')
    e.preventDefault()
    return
  }

  if (key === 'Backspace') {
    delOne()
    e.preventDefault()
    return
  }
  if (key === 'Delete') {
    clearAll()
    e.preventDefault()
    return
  }
  if (key === 'Enter' || key === '=') {
    equal()
    e.preventDefault()
    return
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

