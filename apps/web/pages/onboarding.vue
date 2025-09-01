<!-- apps/web/pages/onboarding.vue -->
<template>
  <n-card title="Профиль" size="large">
    <n-form :model="form" :rules="rules" ref="formRef" label-placement="top">
      <n-form-item label="Имя" path="displayName">
        <n-input v-model:value="form.displayName" placeholder="Как тебя звать" />
      </n-form-item>
      <n-form-item label="Аватар (URL)" path="avatarUrl">
        <n-input v-model:value="form.avatarUrl" placeholder="https://..." />
      </n-form-item>
      <n-space>
        <n-button type="primary" @click="submit">Сохранить</n-button>
      </n-space>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { NButton, NCard, NForm, NFormItem, NInput, NSpace, type FormRules } from 'naive-ui'
const { getProfile, saveProfile } = useLocal()

const formRef = ref()
const form = ref({ displayName: '', avatarUrl: '' })
const rules: FormRules = {
  displayName: { required: true, message: 'Введите имя', trigger: 'blur' },
}

onMounted(() => {
  const p = getProfile()
  if (p) form.value = { displayName: p.displayName, avatarUrl: p.avatarUrl ?? '' }
})

const submit = async () => {
  await formRef.value?.validate()
  saveProfile({ displayName: form.value.displayName, avatarUrl: form.value.avatarUrl || undefined })
}
</script>
