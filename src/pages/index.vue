<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()



const sendMessageToMP = () => {
    // @ts-ignore
    WeixinJSBridge.invoke(
    'invokeMiniProgramAPI',
    {
      name: '张跑跑测试',
      arg: {
        time: new Date().getTime(),
        text: '测试发送消息给小程序',
      },
    },
    function (res) {
      alert('发送成功')
    },
  )
}

console.log(window.navigator.userAgent, 'paopao');
</script>

<template>
  <div>
    <h1>这里是张跑跑的测试 PC 网站</h1>

    <button
      m-3 text-sm btn
      @click="sendMessageToMP"
    >
      点击发送消息给小程序
    </button>

    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        m-3 text-sm btn
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
