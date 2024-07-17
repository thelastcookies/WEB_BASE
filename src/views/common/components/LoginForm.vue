<script setup lang="ts">
import type { LoginParams } from "@/api/admin/home/types";
import type { Rule } from "ant-design-vue/es/form";
import { message } from "ant-design-vue";

const submittingDisabled = ref(false);

const loginForm = reactive<LoginParams>({
  userName: 'Admin',
  password: '123456',
  remember: false,
});

const loginFormRules: Record<string, Rule[]> = {
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const loginFormRef = ref(null) as Ref<Element | null>;
const usernameRef = ref(null) as Ref<Element | null>;
const handleSubmitLogin = async (formData: LoginParams) => {
  submittingDisabled.value = true;
  message.loading({
    content: '正在登录中，请稍候',
    key: SYS_LOADING_KEY,
    duration: 0,
  });
  login(formData).then(res => {
    if (res.Success) {
      const tokenRes = res.Data;
      const { setToken } = useTokenStore();
      setToken(tokenRes);
      router.push("/");
    } else {
      message.error({
        content: res.Msg,
        key: SYS_LOADING_KEY,
      });
      submittingDisabled.value = false;
    }
  }).catch(() => {
    message.error({
      content: '登录失败',
      key: SYS_LOADING_KEY,
    });
    submittingDisabled.value = false;
  });
};

// 用于保存 input label 的状态颜色值
let uActiveColor = 'primary' as 'primary' | 'warning';
let pActiveColor = 'primary' as 'primary' | 'warning';

// 用于决定 label 的呈现颜色
const userNameColorClass = ref<'' | 'primary' | 'warning'>('');
const passwordColorClass = ref<'' | 'primary' | 'warning'>('');

// 用于标记 input active 状态
const userNameIsActive = ref(Boolean(loginForm.userName));
const passwordIsActive = ref(Boolean(loginForm.password));

/**
 * 表单校验时，根据校验结果改变各字段高亮色
 * @param name
 * @param status
 */
const handleValidate = (name: string | number | string[] | number[], status: boolean) => {
  if (name === 'userName') {
    uActiveColor = status ? 'primary' : 'warning';
  } else if (name === 'password') {
    pActiveColor = status ? 'primary' : 'warning';
  }
};

/**
 * mouseenter 与 mouseleave 旨在为 label 同步 Antdv 的输入框 hover 效果
 */

/**
 * mouseenter 时改变 label 的颜色为高亮色
 * 如果输入框内无内容，则 label 不响应颜色变化
 * @param e
 */
const handleInputMEnter = (e: Event) => {
  if (submittingDisabled.value) return;
  const domId = (e.target as Element).id;
  if (domId === 'userName' && loginForm.userName !== '') {
    userNameColorClass.value = uActiveColor;
  } else if (domId === 'password-cont' && loginForm.password !== '') {
    passwordColorClass.value = pActiveColor;
  }
};

/**
 * mouseleave 时重置 label 的颜色
 * 如果输入框处于 focus 状态，则不重置 label 颜色
 * @param e
 */
const handleInputMLeave = (e: Event) => {
  const domId = (e.target as Element).id;
  if (document.activeElement!.id === domId
    || (document.activeElement!.id === 'password' && domId === 'password-cont')) return;
  if (domId === 'userName') {
    userNameColorClass.value = '';
  } else if (domId === 'password-cont') {
    passwordColorClass.value = '';
  }
};

/**
 * focus 时 label 从 placeholder 变为悬浮样式
 * @param e
 */
const handleInputFocus = (e: Event) => {
  const domId = (e.target as Element).id;
  if (domId === 'userName') {
    userNameColorClass.value = uActiveColor;
    userNameIsActive.value = true;
  } else if (domId === 'password') {
    passwordColorClass.value = pActiveColor;
    passwordIsActive.value = true;
  }
};

/**
 * blur 时 label 从悬浮样式变为 placeholder
 * 如果输入框内有内容，则 label 保持悬浮样式不变
 * @param e
 */
const handleInputBlur = (e: Event) => {
  const domId = (e.target as Element).id;
  if (domId === 'userName') {
    userNameColorClass.value = '';
    if (loginForm.userName === '') {
      userNameIsActive.value = false;
    }
  } else if (domId === 'password') {
    passwordColorClass.value = '';
    if (loginForm.password === '') {
      passwordIsActive.value = false;
    }
  }
};

</script>

<template>
  <div class="form-container w-400px m-center">
    <div class="text-10 line-height-12 font-700 tracking-wide lt-md:hidden">登录</div>
    <div class="text-4.5 c-ant.text-tertiary mt-3">请登录以使用本系统</div>
    <a-form
      mt-8
      name="login"
      ref="loginFormRef"
      :model="loginForm"
      autocomplete="off"
      :rules="loginFormRules"
      :disabled="submittingDisabled"
      @validate="handleValidate"
      @finish="handleSubmitLogin"
    >
      <a-form-item relative name="userName">
        <a-input
          id="userName"
          ref="usernameRef"
          class="login-input transparent z-1"
          autofocus
          v-model:value="loginForm.userName"
          @mouseenter="handleInputMEnter"
          @mouseleave="handleInputMLeave"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
        />
        <div class="form-label bg-ant.bg-container absolute left-12.5px px-1"
             :class="[userNameColorClass, {'active': userNameIsActive}]">账号
        </div>
      </a-form-item>
      <a-form-item name="password"
                   id="password-cont"
                   @mouseenter="handleInputMEnter"
                   @mouseleave="handleInputMLeave">
        <a-input-password
          id="password"
          class="login-input transparent z-1"
          v-model:value="loginForm.password"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
        />
        <div class="form-label bg-ant.bg-container absolute left-12.5px px-1"
             :class="[passwordColorClass, {'active': passwordIsActive}]">密码
        </div>
      </a-form-item>
      <a-form-item class="mb-5">
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="loginForm.remember">记住密码</a-checkbox>
        </a-form-item>
      </a-form-item>
      <a-form-item class="m-0">
        <a-button login-btn type="primary" html-type="submit">登录</a-button>
      </a-form-item>
      <a-divider>或</a-divider>
      <a-form-item class="m-0">
        <a-button login-btn>注册账号</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="less">
.form-container {
  .ant-input-password {
    padding: 0 1rem 0;

    :deep(.ant-input) {
      padding: 1rem 0 1rem;
      background-color: transparent;
    }
  }

  .ant-input[disabled] {
    background-color: rgba(0, 0, 0, 0);
  }


  .ant-form-item {
    :deep(.ant-form-item-explain-error) {
      text-align: right;
    }
  }

  .form-label {
    transition-duration: var(--motionDurationMid);
    color: var(--colorTextQuaternary);
    top: 16.5px;
    font-size: 18px;
    z-index: 0;
  }

  .form-label.active {
    top: -10.5px;
    font-size: 14px;
    z-index: 1;
  }

  .form-label.primary {
    color: var(--colorPrimaryHover);
  }

  .form-label.warning {
    color: var(--colorErrorText);
  }

  .ant-checkbox-wrapper {
    :deep(.ant-checkbox-inner) {
      border: 2px solid var(--colorBgSpotlight);
    }
  }

  .ant-divider {
    border-top-color: var(--colorBorder);
  }
}
</style>
