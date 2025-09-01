<template>
  <n-card class="auth-card" title="Войти или зарегистрироваться" size="large" bordered>
    <n-tabs type="line" animated>
      <n-tab-pane name="login" tab="Войти">
        <n-form :model="login" :rules="rulesLogin" ref="loginRef" label-placement="top">
          <n-form-item label="Email" path="email"
            ><n-input v-model:value="login.email"
          /></n-form-item>
          <n-form-item label="Пароль" path="password"
            ><n-input type="password" v-model:value="login.password"
          /></n-form-item>
          <n-button type="primary" block @click="doLogin">Войти</n-button>
        </n-form>
      </n-tab-pane>

      <n-tab-pane name="register" tab="Регистрация">
        <n-form :model="reg" :rules="rulesReg" ref="regRef" label-placement="top">
          <n-form-item label="Имя" path="name"><n-input v-model:value="reg.name" /></n-form-item>
          <n-form-item label="Email" path="email"
            ><n-input v-model:value="reg.email"
          /></n-form-item>
          <n-form-item label="Пароль" path="password"
            ><n-input type="password" v-model:value="reg.password"
          /></n-form-item>
          <n-button type="primary" block @click="doRegister">Зарегистрироваться</n-button>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' }) // ← используем наш layout

import { NButton, NCard, NForm, NFormItem, NInput, NTabPane, NTabs, type FormRules } from 'naive-ui'

const auth = useAuthStore()
const profile = useProfileStore()

const loginRef = ref()
const regRef = ref()
const login = ref({ email: '', password: '' })
const reg = ref({ name: '', email: '', password: '' })

const rulesLogin: FormRules = {
  email: { required: true, message: 'Введите email', trigger: 'blur' },
  password: { required: true, message: 'Введите пароль', trigger: 'blur' },
}
const rulesReg: FormRules = {
  name: { required: true, message: 'Введите имя', trigger: 'blur' },
  email: { required: true, message: 'Введите email', trigger: 'blur' },
  password: { required: true, message: 'Введите пароль', trigger: 'blur' },
}

async function doLogin() {
  await loginRef.value?.validate()
  await auth.login(login.value.email, login.value.password)
  await profile.init()
  navigateTo('/')
}
async function doRegister() {
  await regRef.value?.validate()
  await auth.register(reg.value.name, reg.value.email, reg.value.password)
  await profile.init()
  navigateTo('/')
}
</script>
