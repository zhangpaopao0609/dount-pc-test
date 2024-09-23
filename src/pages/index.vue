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

const sendTimeToMP = () => {
  // @ts-ignore
  WeixinJSBridge.invoke(
    'invokeMiniProgramAPI',
    {

      name: '发送 时间',
      arg: {
        time: Date.now(),
        text: '测试发送 时间 给小程序',
      },
    },
    function (res) {
      alert('发送成功')
    },
  )
}

const sendUAToMP = () => {
  // @ts-ignore
  WeixinJSBridge.invoke(
    'invokeMiniProgramAPI',
    {
      name: '发送 UA',
      arg: {
        time: Date.now(),
        text: '测试发送 UA给小程序',
        userAgent: window.navigator.userAgent,
      },
    },
    function (res) {
      alert('发送成功')
    },
  )
}

const multiple = ref(1)

const content = computed(() => {
  const html = document.documentElement.innerHTML.repeat(multiple.value);
  const blob = new Blob([html], { type: 'text/html' });

  return {
    html,
    blob
  }
})

const sendStringToMP = () => {

  // @ts-ignore
  WeixinJSBridge.invoke(
    'invokeMiniProgramAPI',
    {
      name: '发送字符串',
      arg: {
        time: Date.now(),
        text: '测试发送字符串给小程序',
        userAgent: window.navigator.userAgent,
        document: content.value.html,
        sizeBytes: `${content.value.blob.size} 字节`,
        sizeMegabytes: `${content.value.blob.size / 1024 / 1024} M`,
      },
    },
    function (res) {
      alert('发送成功')
    },
  )
}

</script>

<template>
  <div>
    <h1>这里是张跑跑的测试 PC 网站</h1>

    <div>
      <button m-3 text-sm btn @click="sendUAToMP">
        点击发送 UA 给小程序
      </button>
    </div>

    <div>
      <button m-3 text-sm btn @click="sendTimeToMP">
        点击发送 时间 给小程序
      </button>
    </div>

    <div>
      <div>
        <button m-3 text-sm btn @click="multiple -= 1">
          -
        </button>
        {{ multiple }}
        <button m-3 text-sm btn @click="multiple += 1">
          +
        </button>
      </div>
      <div>
        输入框： <input type="text" :value="multiple" @input="(e) => multiple = Number(e.target.value)" placeholder="输入框">
      </div>
    </div>

    <button m-3 text-sm btn @click="sendStringToMP">
      点击发送 document 字符串给小程序
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

    <TheInput v-model="name" :placeholder="t('intro.whats-your-name')" autocomplete="false" @keydown.enter="go" />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button m-3 text-sm btn :disabled="!name" @click="go">
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
